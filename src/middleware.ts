import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const token = request.cookies.get("accessToken")?.value;

  const isAuthenticated = !!token;

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/sign-in"],
};
