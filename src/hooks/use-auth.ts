"use client";

import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configs/store";

import { AuthUser, User, UserProfileType } from "types/user";

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;

  // Permission helpers
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;

  // User type helpers
  isConsultant: boolean;
  isClient: boolean;
}

export function useAuth(): UseAuthReturn {
  // Get auth state from Redux
  const authUser = useSelector((state: RootState) => state.global.authUser);

  // Computed values
  const user = authUser?.user ?? null;

  const isAuthenticated = !!authUser?.isAuthenticated;

  // User type helpers
  const isConsultant = user?.activeProfile?.type === UserProfileType.CONSULTANT;
  const isClient = user?.activeProfile?.type === UserProfileType.CLIENT;

  // Get user permissions from roles
  const userPermissions = useMemo(() => {
    if (!user) return new Set<string>();

    const permissions = new Set<string>();
    // Add user type as a permission
    if (user.type) {
      permissions.add(user.type);
    }
    return permissions;
  }, [user]);

  // Permission check helpers
  const hasPermission = useCallback(
    (permission: string) => userPermissions.has(permission),
    [userPermissions]
  );

  const hasRole = useCallback(
    (role: string) => {
      if (!user) return false;
      return user.activeProfile?.type === role;
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions: string[]) => permissions.some((p) => userPermissions.has(p)),
    [userPermissions]
  );

  const hasAllPermissions = useCallback(
    (permissions: string[]) => permissions.every((p) => userPermissions.has(p)),
    [userPermissions]
  );

  return {
    user: authUser?.user ?? null,
    isAuthenticated,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,

    isConsultant,
    isClient,
  };
}

// Legacy hook for backwards compatibility
export default function useAuthUser(): AuthUser {
  const authUser = useSelector((state: RootState) => state?.global?.authUser);
  return authUser ? authUser : null;
}
