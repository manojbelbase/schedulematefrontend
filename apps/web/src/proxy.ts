import { NextResponse, type NextRequest } from "next/server";

import { COOKIE_KEYS } from "@/config/constants";

/**
 * Routes that must stay reachable without a session cookie.
 *
 * `/privacy` and `/terms` are legally public, and `/auth/logout` has to be
 * reachable precisely when the access cookie is missing or expired - gating it
 * traps a signed-in user with a stale cookie in a redirect loop.
 */
const PUBLIC_PATHS = ["/auth/login", "/auth/logout", "/privacy", "/terms"];

export function proxy(req: NextRequest) {
  const currentPath = req.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const token = req.cookies.get(COOKIE_KEYS.AUTH_COOKIE_KEY)?.value;

  if (PUBLIC_PATHS.includes(currentPath)) {
    // Only a live session has anything to do on the login screen.
    if (currentPath === "/auth/login" && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", currentPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default proxy;
