import { NextResponse, type NextRequest } from "next/server";

import { COOKIE_KEYS } from "@/config/constants";

const AUTH_PAGES = ["/login"];

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  const pagePaths = pages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|");
  const regexString = `^(${pagePaths})/?$`;
  const regex = new RegExp(regexString, "i");
  return regex.test(pathName);
};

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = parts[1] ?? "";
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const data = JSON.parse(atob(padded)) as { exp?: number };
    if (typeof data.exp !== "number") return false;
    return Date.now() < data.exp * 1000;
  } catch {
    return false;
  }
}

export const proxy = (req: NextRequest) => {
  const token = req.cookies.get(COOKIE_KEYS.AUTH_COOKIE_KEY)?.value;
  const hasToken = !!token && isTokenValid(token);

  const isAuthPage = testPathnameRegex(AUTH_PAGES, req.nextUrl.pathname);

  if (hasToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (!hasToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default proxy;
