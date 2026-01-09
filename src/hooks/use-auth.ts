"use client";

import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "configs/store";
import { logoutAction } from "configs/store-actions";
import {
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  SigninRequest,
  SignupRequest,
} from "apis/auth-api";
import { setAuthCookie, clearAuthCookie } from "utils/auth-cookies";
import { AuthUser, User, UserType } from "types/user";

interface UseAuthReturn {
  // State
  user: User | null;
  authUser: AuthUser;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  signin: (
    credentials: SigninRequest
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    credentials: SignupRequest
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<boolean>;

  // Permission helpers
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;

  // User type helpers
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export function useAuth(): UseAuthReturn {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get auth state from Redux
  const authUser = useSelector((state: RootState) => state.global.authUser);

  // RTK Query mutations
  const [signinMutation, { isLoading: isSigningIn }] = useSigninMutation();
  const [signupMutation, { isLoading: isSigningUp }] = useSignupMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [refreshMutation, { isLoading: isRefreshing }] =
    useRefreshTokenMutation();

  // Computed values
  const user = authUser?.user ?? null;
  const accessToken = authUser?.accessToken ?? null;
  const refreshTokenValue = authUser?.refreshToken ?? null;
  const isAuthenticated = !!accessToken && !!user;
  const isLoading = isSigningIn || isSigningUp || isLoggingOut || isRefreshing;

  // User type helpers
  const isAdmin = user?.type === UserType.ADMIN;
  const isSuperAdmin = user?.type === UserType.SUPER_ADMIN;

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
      return user.type === role;
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

  // Signin action
  const signin = useCallback(
    async (
      credentials: SigninRequest
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const result = await signinMutation({ data: credentials }).unwrap();
        const data = result?.data;

        if (data?.accessToken && data?.user) {
          // Set auth cookie for middleware
          setAuthCookie({
            accessToken: data.accessToken,
            user: data.user,
          });

          // Get return URL and redirect
          const returnUrl = searchParams.get("returnUrl") || "/";
          router.push(returnUrl);

          return { success: true };
        }

        return { success: false, error: "Invalid response from server" };
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        return {
          success: false,
          error: err?.data?.message || "Failed to sign in",
        };
      }
    },
    [signinMutation, router, searchParams]
  );

  // Signup action
  const signup = useCallback(
    async (
      credentials: SignupRequest
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const result = await signupMutation({ data: credentials }).unwrap();
        const data = result?.data;

        if (data?.accessToken && data?.user) {
          // Set auth cookie for middleware
          setAuthCookie({
            accessToken: data.accessToken,
            user: data.user,
          });

          // Redirect to home or onboarding
          router.push("/");

          return { success: true };
        }

        return { success: false, error: "Invalid response from server" };
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        return {
          success: false,
          error: err?.data?.message || "Failed to sign up",
        };
      }
    },
    [signupMutation, router]
  );

  // Logout action
  const logout = useCallback(async (): Promise<void> => {
    try {
      // Call logout API (optional, for server-side token invalidation)
      await logoutMutation().unwrap();
    } catch {
      // Continue with client-side logout even if API fails
      console.error("Logout API failed, continuing with client-side logout");
    } finally {
      // Clear auth cookie
      clearAuthCookie();
      // Dispatch logout action to clear Redux state
      dispatch(logoutAction());
      // Redirect to signin
      router.push("/signin");
    }
  }, [logoutMutation, dispatch, router]);

  // Refresh tokens action
  const refreshTokens = useCallback(async (): Promise<boolean> => {
    if (!refreshTokenValue) return false;

    try {
      const result = await refreshMutation({
        data: { refreshToken: refreshTokenValue },
      }).unwrap();
      const data = result?.data;

      if (data?.accessToken && user) {
        // Update auth cookie
        setAuthCookie({
          accessToken: data.accessToken,
          user,
        });
        return true;
      }
      return false;
    } catch {
      // Token refresh failed
      clearAuthCookie();
      dispatch(logoutAction());
      return false;
    }
  }, [refreshMutation, refreshTokenValue, user, dispatch]);

  return {
    // State
    user,
    authUser,
    accessToken,
    refreshToken: refreshTokenValue,
    isAuthenticated,
    isLoading,

    // Actions
    signin,
    signup,
    logout,
    refreshTokens,

    // Permission helpers
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,

    // User type helpers
    isAdmin,
    isSuperAdmin,
  };
}

// Legacy hook for backwards compatibility
export default function useAuthUser(): AuthUser {
  const authUser = useSelector((state: RootState) => state?.global?.authUser);
  return authUser ? authUser : null;
}
