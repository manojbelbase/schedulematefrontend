"use client";

import {
  AUTH_COOKIE_DAYS,
  COOKIE_KEYS,
  REFRESH_COOKIE_DAYS,
} from "@/config/constants";

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  return readCookieValue(COOKIE_KEYS.AUTH_COOKIE_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof document === "undefined") return null;
  return readCookieValue(COOKIE_KEYS.REFRESH_COOKIE_KEY);
}

export function setAuthCookies(token: string, refreshToken?: string): void {
  setCookie(COOKIE_KEYS.AUTH_COOKIE_KEY, token, AUTH_COOKIE_DAYS);
  if (refreshToken) {
    setCookie(
      COOKIE_KEYS.REFRESH_COOKIE_KEY,
      refreshToken,
      REFRESH_COOKIE_DAYS,
    );
  }
}

export function clearAuthCookies(): void {
  clearCookie(COOKIE_KEYS.AUTH_COOKIE_KEY);
  clearCookie(COOKIE_KEYS.REFRESH_COOKIE_KEY);
}

function readCookieValue(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const entry of cookies) {
    const separatorIndex = entry.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = decodeURIComponent(entry.slice(0, separatorIndex));
    if (key !== name) continue;
    return decodeURIComponent(entry.slice(separatorIndex + 1));
  }
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function clearCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}
