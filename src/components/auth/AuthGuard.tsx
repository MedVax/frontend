"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { UserProfileType } from "@/types/user";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * AuthGuard component for protecting client-side routes
 * Use this for pages that require authentication
 */
export function AuthGuard({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  redirectTo = "/signin",
  fallback,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, hasPermission, hasRole } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to signin with return URL
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // Check permissions if required
    if (requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every((permission) =>
        hasPermission(permission)
      );
      if (!hasAllPermissions) {
        router.replace("/");
        return;
      }
    }

    // Check roles if required
    if (requiredRoles.length > 0) {
      const hasAnyRole = requiredRoles.some((role) => hasRole(role));
      if (!hasAnyRole) {
        router.replace("/");
        return;
      }
    }

    setIsAuthorized(true);
  }, [
    isAuthenticated,
    user,
    pathname,
    router,
    redirectTo,
    requiredPermissions,
    requiredRoles,
    hasPermission,
    hasRole,
  ]);

  // Show loading state
  if (!isAuthorized) {
    if (fallback) return <>{fallback}</>;

    return (
      <Box
        className="flex items-center justify-center min-h-screen"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Box className="text-center">
          <CircularProgress size={40} sx={{ color: "#e91d74" }} />
          <Typography className="mt-4 text-gray-600">Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
}

interface ConsultantGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ConsultantGuard component for consultant-only routes
 */
export function ConsultantGuard({ children, fallback }: ConsultantGuardProps) {
  return (
    <AuthGuard
      requiredRoles={[UserProfileType.CONSULTANT]}
      redirectTo="/signin"
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

interface ClientGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientGuard component for client-only routes
 */
export function ClientGuard({ children, fallback }: ClientGuardProps) {
  return (
    <AuthGuard
      requiredRoles={[UserProfileType.CLIENT]}
      redirectTo="/signin"
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

interface GuestGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * GuestGuard component for pages that should only be accessible to guests
 * (e.g., login, signup pages)
 */
export function GuestGuard({ children, redirectTo = "/" }: GuestGuardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
      return;
    }
    setIsGuest(true);
  }, [isAuthenticated, router, redirectTo]);

  if (!isGuest) {
    return (
      <Box
        className="flex items-center justify-center min-h-screen"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <CircularProgress size={40} sx={{ color: "#e91d74" }} />
      </Box>
    );
  }

  return <>{children}</>;
}
