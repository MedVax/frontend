import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/signin",
  "/signup",
  "/forgot-password",
  "/forgot-password/success",
  "/password-reset",
  "/about",
  "/features",
  "/terms-and-condition",
  "/api",
];

// Routes that require authentication
const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/profile",
  "/orders",
  "/cart/checkout",
  "/prescriptions",
  "/account",
  "/settings",
];

// Admin-only routes
const ADMIN_ROUTE_PREFIXES = ["/admin", "/dashboard/admin"];

// Cookie name for auth state
const AUTH_COOKIE_NAME = "medvax_auth";

function isPublicRoute(pathname: string): boolean {
  // Check exact matches
  if (PUBLIC_ROUTES.includes(pathname)) return true;

  // Check if it starts with any public route
  return PUBLIC_ROUTES.some(
    (route) => route !== "/" && pathname.startsWith(route)
  );
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isStaticAsset(pathname: string): boolean {
  return (
    // Files with extensions (images, etc.)
    (pathname.startsWith("/_next") ||
    pathname.startsWith("/static") || pathname.includes("."))
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Get auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  let authData: { accessToken?: string; user?: { type?: string } } | null =
    null;

  if (authCookie?.value) {
    try {
      authData = JSON.parse(authCookie.value);
    } catch {
      // Invalid cookie, treat as unauthenticated
      authData = null;
    }
  }

  const isAuthenticated = !!authData?.accessToken;
  const userType = authData?.user?.type;

  // Handle protected routes
  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      // Redirect to signin with return URL
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // Handle admin routes
  if (isAdminRoute(pathname)) {
    if (!isAuthenticated) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Check if user is admin
    const isAdmin = userType === "ADMIN" || userType === "SUPER_ADMIN";
    if (!isAdmin) {
      // Redirect to dashboard or home if not admin
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (pathname === "/signin" || pathname === "/signup")) {
    const returnUrl = request.nextUrl.searchParams.get("returnUrl");
    return NextResponse.redirect(new URL(returnUrl || "/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
