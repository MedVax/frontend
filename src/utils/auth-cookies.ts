import { User } from "types/user";

const AUTH_COOKIE_NAME = "medvax_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface AuthCookieData {
  accessToken: string;
  user: User;
}

/**
 * Set authentication cookie (client-side only)
 */
export function setAuthCookie(data: AuthCookieData): void {
  if (typeof document === "undefined") return;

  const cookieData = JSON.stringify({
    accessToken: data.accessToken,
    user: {
      id: data.user.id,
      email: data.user.email,
      type: data.user.type,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
    },
  });

  document.cookie = `${AUTH_COOKIE_NAME}=${cookieData}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Clear authentication cookie (client-side only)
 */
export function clearAuthCookie(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

/**
 * Get authentication cookie data (client-side only)
 */
export function getAuthCookie(): AuthCookieData | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`)
  );

  if (!authCookie) return null;

  try {
    const cookieValue = authCookie.split("=")[1];
    return JSON.parse(cookieValue);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated (client-side only)
 */
export function isAuthenticatedFromCookie(): boolean {
  const authData = getAuthCookie();
  return !!authData?.accessToken;
}
