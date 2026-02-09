import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserProfileType } from "./types/user";

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
  "/consultants", // Public consultant profiles and OG images
];

// Routes that require authentication
const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/orders",
  "/account",
  "/settings",
  "/consultation",
  "/meeting",
  "/bookings",
  "/addresses",
  "/watchlist",
  "/security",
  "/profile",
  "/calendar",
  "/sessions",
  "/booking"
];

const CONSULTANT_ROUTE_PREFIXES = ["provider", "/availability",];
const CLIENT_ROUTE_PREFIXES = ["/client"];

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

function isConsultantRoute(pathname: string): boolean {
  return CONSULTANT_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
}

function isClientRoute(pathname: string): boolean {
  return CLIENT_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isStaticAsset(pathname: string): boolean {
  return (
    // Files with extensions (images, etc.)
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  );
}

function isOpengraphImageRoute(pathname: string): boolean {
  // Next.js opengraph-image routes should be handled by Next.js, not proxied
  return pathname.includes("/opengraph-image");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Skip middleware for opengraph-image routes - let Next.js handle them
  if (isOpengraphImageRoute(pathname)) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const userProfileType = request.cookies.get("activeProfileType")?.value;
  const isAuthenticated = !!request.cookies.get("accessToken");

  // Handle protected routes
  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      // Redirect to signin with return URL
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // Handle consultant routes
  if (isConsultantRoute(pathname)) {
    if (!isAuthenticated) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Check if user is consultant
    const isConsultant = userProfileType === UserProfileType.CONSULTANT;

    if (!isConsultant) {
      // Redirect to dashboard or home if not admin
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle client routes
  if (isClientRoute(pathname)) {
    if (!isAuthenticated) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Check if user is consultant
    const isClient = userProfileType === UserProfileType.CLIENT;

    if (!isClient) {
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
