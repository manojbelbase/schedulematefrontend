import { NextResponse, type NextRequest } from "next/server";

import { COOKIE_KEYS } from "@/config/constants";

const PUBLIC_PATHS = ["/auth/login", "/auth/forgot-password"];

export function proxy(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const token = req.cookies.get(COOKIE_KEYS.AUTH_COOKIE_KEY)?.value;

  if (currentPath === "/auth/login" && !!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!PUBLIC_PATHS.includes(currentPath) && !token) {
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
