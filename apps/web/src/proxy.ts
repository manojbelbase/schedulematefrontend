import { NextResponse, type NextRequest } from "next/server";

import { COOKIE_KEYS } from "@/config/constants";

const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/callback",
  "/auth/logout",
  "/auth",
  "/auth/forgot-password",
  "/auth/change-password",
];

export function proxy(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const token = req.cookies.get(COOKIE_KEYS.AUTH_COOKIE_KEY)?.value;

  const LOGIN_URL = new URL("/auth/login", req.url);

  if (PUBLIC_PATHS.includes(currentPath)) {
    if (token && (currentPath === "/auth/login" || currentPath === "/auth")) {
      const homePage = new URL("/", req.url);
      return NextResponse.redirect(homePage);
    }
    return NextResponse.next();
  }

  if (!token) {
    if (currentPath !== "/" && currentPath !== "/login") {
      LOGIN_URL.searchParams.set("redirect", currentPath);
    }
    return NextResponse.redirect(LOGIN_URL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default proxy;
