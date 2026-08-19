import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_DAYS,
  COOKIE_KEYS,
  REFRESH_COOKIE_DAYS,
} from "@/config/constants";

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

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_KEYS.AUTH_COOKIE_KEY, token, {
    path: "/",
    sameSite: "lax",
    maxAge: AUTH_COOKIE_DAYS * 24 * 60 * 60,
  });

  if (typeof refresh === "string" && refresh.length > 0) {
    cookieStore.set(COOKIE_KEYS.REFRESH_COOKIE_KEY, refresh, {
      path: "/",
      sameSite: "lax",
      maxAge: REFRESH_COOKIE_DAYS * 24 * 60 * 60,
    });
  }

  return NextResponse.redirect(new URL(redirect, request.url));
}
