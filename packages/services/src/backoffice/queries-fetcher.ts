import type { QueriesContext } from "./queries-context";

const baseUrl = process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL;
const AUTH_COOKIE_KEY = "scheduledmate_backoffice_token";

let dynamicHeaderProvider:
  (() => Record<string, string> | Promise<Record<string, string>>) | null =
  null;

export const setDynamicHeaderProvider = (
  provider: () => Record<string, string> | Promise<Record<string, string>>,
) => {
  // only set on client side
  if (typeof window === "undefined") return;
  dynamicHeaderProvider = provider;
};

export type ErrorWrapper<TError> =
  TError | { status: "unknown"; payload: string };

export type QueriesFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> =
  {
    url: string;
    method: string;
    body?: TBody;
    headers?: THeaders;
    queryParams?: TQueryParams;
    pathParams?: TPathParams;
    signal?: AbortSignal;
  } & QueriesContext["fetcherOptions"];

export async function queriesFetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {},
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: QueriesFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  let error: ErrorWrapper<TError>;
  const isServer = typeof window === "undefined";
  let cookies = "";
  let dynamicHeaders = {};

  try {
    if (isServer) {
      const { cookies: getter } = await import("next/headers");
      const allCookies = await getter();
      cookies = allCookies.toString();
      const authToken = allCookies.get(AUTH_COOKIE_KEY)?.value;
      if (authToken) {
        dynamicHeaders = { Authorization: `Bearer ${authToken}` };
      }
    } else {
      if (dynamicHeaderProvider) {
        dynamicHeaders = await dynamicHeaderProvider();
      }
    }
    const requestHeaders: HeadersInit = {
      ...(body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(isServer && {
        Cookie: cookies,
      }),
      ...dynamicHeaders,
      ...headers,
    };

    /**
     * As the fetch API is being used, when multipart/form-data is specified
     * the Content-Type header must be deleted so that the browser can set
     * the correct boundary.
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sending_files_using_a_formdata_object
     */
    if (
      requestHeaders["Content-Type"]
        ?.toLowerCase()
        .includes("multipart/form-data")
    ) {
      delete requestHeaders["Content-Type"];
    }

    const response = await fetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        signal,
        credentials: "include",
        method: method.toUpperCase(),
        body: body
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
        headers: requestHeaders,
      },
    );
    if (response.status === 401) {
      if (isServer) {
        const { redirect } = await import("next/navigation");
        redirect("/login");
      } else if (typeof window !== "undefined") {
        document.cookie =
          "scheduledmate_backoffice_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
        document.cookie =
          "scheduledmate_backoffice_refresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
        window.location.assign("/login");
        return new Promise<never>(() => {
          /**
           * keep promise pending until navigation completes
           */
        });
      }
    }
    if (!response.ok) {
      try {
        error = await response.json();
      } catch (e) {
        error = {
          status: "unknown" as const,
          payload:
            e instanceof Error
              ? `Unexpected error (${e.message})`
              : "Unexpected error",
        };
      }
    } else if (response.headers.get("content-type")?.includes("json")) {
      const res = await response.json();

      return res;
    } else {
      // if it is not a json response, assume it is a blob and cast it to TData
      return (await response.blob()) as unknown as TData;
    }
  } catch (e) {
    if (isServer && isNextRedirectError(e)) {
      throw e;
    }

    if (e instanceof Error) {
      throw e;
    }

    throw new Error("Network error");
  }
  throw error;
}

const isNextRedirectError = (
  error: unknown,
): error is Error & {
  digest?: string;
} => {
  if (typeof error !== "object" || error === null) return false;
  const digest = (error as { digest?: unknown }).digest;
  if (typeof digest !== "string") return false;
  return digest === "NEXT_REDIRECT";
};

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {},
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return (
    url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)] ?? "") + query
  );
};
