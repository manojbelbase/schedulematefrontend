import { NextResponse, type NextRequest } from "next/server";

/**
 * Same-origin reverse proxy to the web API backend.
 *
 * The frontend (`*.vercel.app`) and the API (`*.onrender.com`) are on different
 * registrable domains, so a cookie set by the backend (scoped to its own host)
 * is never sent back to the frontend's origin. Browsing unauthorised the
 * fetch would mean cross-origin requests carrying a session cookie the
 * frontend origin never received — leaving `proxy.ts` and every server
 * component unauthenticated, bouncing the user back to login forever.
 *
 * Routing the browser's traffic through here fixes that and three other things
 * at once:
 *   - `Set-Cookie` from the backend is rewritten to a host-only cookie on the
 *     frontend origin, so the app and its API share one session;
 *   - CORS stops applying, because the browser only ever talks to its origin
 *     and the Next.js server relays server-to-server;
 *   - the token stays httpOnly: the browser never reads it, it only echoes it
 *     back to this route alongside every request.
 *
 * The cookie's *name and value* are untouched, and the generated fetcher
 * already forwards the same-origin cookie jar upstream server-side — so the
 * backend needs no change beyond reading it by name.
 */

export const dynamic = "force-dynamic";

/** Per-hop headers that must not be forwarded, plus ones fetch recomputes. */
const STRIPPED_REQUEST_HEADERS = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "te",
  "trailer",
  "proxy-authorization",
  "proxy-authenticate",
  "host",
  "content-length",
  // Let undici negotiate and transparently decode compression.
  "accept-encoding",
  "origin",
  "referer",
]);

const STRIPPED_RESPONSE_HEADERS = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  // undici has already decoded the body; passing these through would make the
  // browser try to decode it a second time.
  "content-encoding",
  "content-length",
]);

const METHODS_WITHOUT_BODY = new Set(["GET", "HEAD"]);

const UPSTREAM_TIMEOUT_MS = 60_000;

/**
 * Re-scopes an upstream cookie onto the frontend origin.
 *
 * - `Domain` is dropped, so the browser files the cookie host-only against the
 *   Next.js server; the upstream's `onrender.com` domain would never match.
 * - `Secure` is dropped because this same route serves the local dev build
 *   over plain HTTP, where a `Secure` cookie cannot be stored at all.
 * - `SameSite=Lax` replaces `None`, which browsers reject without `Secure`.
 * - `Path` is forced to `/`. With no explicit path the browser derives the
 *   default from the *request* URI — `/api/upstream/api/...`, not `/` — and
 *   the session cookie would never reach any page outside that prefix.
 */
function localizeSetCookie(cookie: string): string {
  const [nameValue, ...attributes] = cookie.split(";");

  const kept = attributes
    .map((attribute) => attribute.trim())
    .filter((attribute) => {
      const key = attribute.split("=")[0]?.trim().toLowerCase();
      return (
        key !== "domain" &&
        key !== "secure" &&
        key !== "samesite" &&
        key !== "partitioned" &&
        key !== "path"
      );
    });

  return [nameValue, ...kept, "Path=/", "SameSite=Lax"].join("; ");
}

/**
 * Only same-origin clients may use the proxy.
 *
 * Browsers always stamp this header and a page cannot forge it, so rejecting a
 * cross-site request blocks every case where the browser would attach the
 * same-origin session cookie on an attacker's behalf. A missing header means a
 * non-browser client (curl, health checks), which has no cookie jar to borrow
 * from and so is left alone. `none` is a user-initiated top-level navigation.
 */
function isSameOriginRequest(request: NextRequest): boolean {
  const site = request.headers.get("sec-fetch-site");
  return !site || site === "same-origin" || site === "none";
}

function buildUpstreamRequestHeaders(request: NextRequest): Headers {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (STRIPPED_REQUEST_HEADERS.has(key.toLowerCase())) return;
    headers.set(key, value);
  });

  return headers;
}

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  if (!isSameOriginRequest(request)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const base = (process.env.NEXT_PUBLIC_WEB_API_BASE_URL ?? "").replace(
    /\/+$/,
    "",
  );

  if (!base || base.startsWith("/")) {
    return NextResponse.json(
      {
        statusCode: 502,
        message: "No upstream API endpoint is configured.",
      },
      { status: 502, headers: { "X-ScheduleMate-Upstream-Error": "config" } },
    );
  }

  const { path } = await context.params;
  const upstreamUrl = new URL(base);
  const target = new URL(`${base}/${path.join("/")}`);
  target.search = request.nextUrl.search;

  const hasBody = !METHODS_WITHOUT_BODY.has(request.method.toUpperCase());

  let upstream: Response;

  try {
    upstream = await fetch(target, {
      method: request.method,
      headers: buildUpstreamRequestHeaders(request),
      body: hasBody ? request.body : undefined,
      redirect: "manual", // manual redirects so we can rewrite `Location` headers to the frontend origin
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      // Required by undici when streaming a request body.
      ...({ duplex: "half" } as RequestInit),
    });
  } catch (error) {
    // undici throws `TypeError: fetch failed` and hangs the real cause
    // (ECONNREFUSED, EAI_AGAIN, TLS failures) off `.cause`. Without unwrapping
    // it every distinct failure reads identically in the support log.
    const cause = error instanceof Error ? error.cause : undefined;

    const isTimeout =
      (error instanceof Error && error.name === "TimeoutError") ||
      (cause instanceof Error && cause.name === "TimeoutError");

    const reason =
      cause instanceof Error
        ? cause.message
        : error instanceof Error
          ? error.message
          : String(error);

    // `fetch` only rejects on transport failure, so no HTTP response existed at
    // all — distinct from the backend answering with an error, which passes
    // through with its own status. 502/504 rather than 503: 503 describes the
    // responding server, and a real backend emits it for maintenance.
    const status = isTimeout ? 504 : 502;

    return NextResponse.json(
      {
        statusCode: status,
        message: isTimeout
          ? `The API server at ${base} did not respond within ${
              UPSTREAM_TIMEOUT_MS / 1000
            }s.`
          : `Could not reach the API server at ${base}.`,
        error: reason,
      },
      {
        status,
        headers: {
          "X-ScheduleMate-Upstream-Error": isTimeout ? "timeout" : "transport",
        },
      },
    );
  }

  const headers = new Headers();

  upstream.headers.forEach((value, key) => {
    const name = key.toLowerCase();
    if (STRIPPED_RESPONSE_HEADERS.has(name) || name === "set-cookie") return;
    headers.set(key, value);
  });

  // A 3xx pointing at the upstream origin would navigate the browser away from
  // the frontend origin — out of the proxy, and away from the cookie jar the
  // session lives in. Map it back onto this route so redirects stay same-origin.
  const location = upstream.headers.get("location");

  if (location) {
    const resolved = new URL(location, target);
    const basePath = upstreamUrl.pathname.replace(/\/+$/, "");

    if (
      resolved.origin === upstreamUrl.origin &&
      resolved.pathname.startsWith(basePath)
    ) {
      const rest = resolved.pathname.slice(basePath.length) || "/";

      headers.set(
        "location",
        `/api/upstream${rest}${resolved.search}${resolved.hash}`,
      );
    }
  }

  // getSetCookie() returns an array of cookies, so we need to append each one individually
  for (const cookie of upstream.headers.getSetCookie()) {
    headers.append("set-cookie", localizeSetCookie(cookie));
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
