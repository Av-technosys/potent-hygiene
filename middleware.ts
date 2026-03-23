import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  const isAuth = !!accessToken;

  const pathname = req.nextUrl.pathname;

  // 🔓 public/auth pages
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/email-verification") ||
    pathname.startsWith("/reset-password-email") ||
    pathname.startsWith("/reset-password-otp") ||
    pathname.startsWith("/reset-password-confirm");

  // 🔒 protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/checkout");

  // 🚫 if logged in → block auth pages
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔐 if not logged in → block protected pages
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};