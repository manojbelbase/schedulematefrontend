import { NextResponse } from "next/server";

import { setAuthCookies } from "../_utils";

function safeRedirectPath(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/";
  }
  return value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const refresh = searchParams.get("refresh");
  const redirect = safeRedirectPath(searchParams.get("redirect"));

  if (typeof token !== "string" || token.length === 0) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("error", "google_authentication_failed");
    return NextResponse.redirect(url);
  }

  await setAuthCookies(
    token,
    typeof refresh === "string" ? refresh : undefined,
  );

  return NextResponse.redirect(new URL(redirect, request.url));
}
