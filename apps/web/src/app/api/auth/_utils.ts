import { cookies } from "next/headers";

import {
  AUTH_COOKIE_DAYS,
  COOKIE_KEYS,
  REFRESH_COOKIE_DAYS,
} from "@/config/constants";

const isSecureCookies = process.env.NODE_ENV === "production";

export async function setAuthCookies(
  accessToken: string,
  refreshToken?: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_KEYS.AUTH_COOKIE_KEY, accessToken, {
    httpOnly: true,
    secure: isSecureCookies,
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_DAYS * 24 * 60 * 60,
  });

  if (typeof refreshToken === "string" && refreshToken.length > 0) {
    cookieStore.set(COOKIE_KEYS.REFRESH_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      secure: isSecureCookies,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_COOKIE_DAYS * 24 * 60 * 60,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.AUTH_COOKIE_KEY);
  cookieStore.delete(COOKIE_KEYS.REFRESH_COOKIE_KEY);
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message?: unknown }).message);
  }
  return "Something went wrong. Please try again.";
}
