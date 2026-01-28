import { store } from "configs/store";
import { logoutAction } from "configs/store-actions";
import { clearAuthCookie } from "./auth-cookies";
import { medvaxApi } from "configs/store-query";

/**
 * Clear all authentication tokens and cache
 * This function clears:
 * - Redux store auth state
 * - RTK Query cache
 * - Auth cookies
 * - LocalStorage auth data
 */
export function clearTokens(): void {
  // Clear Redux store auth state
  store.dispatch(logoutAction());

  // Clear RTK Query cache
  store.dispatch(medvaxApi.util.resetApiState());

  // Clear auth cookie
  clearAuthCookie();

  // Clear localStorage auth-related data
  if (typeof window !== "undefined") {
    // Clear the persisted state
    localStorage.removeItem("@state");

    // Clear any other auth-related localStorage items
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes("auth") || key.includes("token"))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Clear sessionStorage as well
    sessionStorage.clear();
  }
}

/**
 * Clear only tokens without clearing the entire cache
 * Useful for token refresh scenarios
 */
export function clearTokensOnly(): void {
  // Clear auth cookie
  clearAuthCookie();

  // Clear localStorage auth-related data only
  if (typeof window !== "undefined") {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes("auth") || key.includes("token"))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }
}
