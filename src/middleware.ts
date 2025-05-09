import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths
const PROTECTED_PATHS = [
  "/verify-email",
  "/dashboard",
  "/documentation",
  "/people",
  "/settings",
  "/tasks",
  // Add other protected routes here
];

const GUEST_ONLY_PATHS = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  console.log("pathname", pathname);

  // Check for refresh token cookie
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isAuthenticated = !!refreshToken;

  // Check path types
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isGuestOnly = GUEST_ONLY_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  const url = request.nextUrl.clone();

  // Handle protected pages
  if (isProtected && !isAuthenticated) {
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Handle guest-only pages
  if (isGuestOnly && isAuthenticated) {
    // Check for redirect query parameter
    const redirect = searchParams.get("redirect");
    url.pathname = redirect || "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/documentation/:path*",
    "/people/:path*",
    "/settings/:path*",
    "/tasks/:path*",
    "/login",
    "/register",
    "/verify-email",
  ],
};
