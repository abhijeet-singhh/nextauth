import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/register", "/login"];
const PROTECTED_ROUTES = ["/dashboard"];

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!token;

  // protect private routes
  if (
    PROTECTED_ROUTES.some(
      (route) => pathname.startsWith(route) && !isAuthenticated,
    )
  ) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // prevent logged-in users from visiting auth pages
  if (
    AUTH_ROUTES.some((route) => pathname.startsWith(route)) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
