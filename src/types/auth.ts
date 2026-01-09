import { User } from "./user";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

// Permission types
export type Permission = string;

export interface Role {
  id: number;
  name: string;
  permissions: { permission: { value: string } }[];
}

export interface UserRole {
  role: Role;
}

// Route protection types
export interface ProtectedRouteConfig {
  path: string;
  requiredPermissions?: Permission[];
  requiredRoles?: string[];
  redirectTo?: string;
}

export const PUBLIC_ROUTES = [
  "/",
  "/signin",
  "/signup",
  "/forgot-password",
  "/forgot-password/success",
  "/password-reset",
  "/about",
  "/features",
  "/terms-and-condition",
] as const;

export const PROTECTED_ROUTES_PREFIX = [
  "/dashboard",
  "/profile",
  "/orders",
  "/cart",
  "/checkout",
  "/prescriptions",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
