import { NextResponse, type NextRequest } from "next/server";

import { COOKIE_KEYS } from "@/config/constants";

const AUTH_PAGES = ["/login"];

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  const pagePaths = pages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|");
  const regexString = `^(${pagePaths})/?$`;
  const regex = new RegExp(regexString, "i");
  return regex.test(pathName);
};

export const proxy = (req: NextRequest) => {
  const token = req.cookies.get(COOKIE_KEYS.AUTH_COOKIE_KEY)?.value;
  const hasToken = !!token;

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
