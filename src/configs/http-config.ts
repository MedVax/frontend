import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { Store } from "@reduxjs/toolkit";
import { BASE_URL } from "constants/env";
import { GlobalInitialStateType } from "types/global";
import { logoutAction } from "./store-actions";

export const MedvaxHttp = axios.create({
  baseURL: BASE_URL,
});

// Track if we're currently refreshing the token
let isRefreshing = false;
// Queue of requests that failed due to 401 and are waiting for token refresh
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (store: Store) => {
  // Request interceptor - add auth token to requests
  MedvaxHttp?.interceptors?.request?.use(
    async (config: InternalAxiosRequestConfig) => {
      const { authUser } =
        (store.getState()?.global as GlobalInitialStateType) ?? {};
      const token = authUser?.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle 401 errors and token refresh
  MedvaxHttp?.interceptors?.response?.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // If not a 401 or already retried, reject
      if (error?.response?.status !== 401 || originalRequest._retry) {
        // If it's still a 401 after retry, logout
        if (error?.response?.status === 401 && originalRequest._retry) {
          store.dispatch(logoutAction());
        }
        return Promise.reject(error);
      }

      // Check if we have a refresh token
      const { authUser } =
        (store.getState()?.global as GlobalInitialStateType) ?? {};
      const refreshToken = authUser?.refreshToken;

      if (!refreshToken) {
        store.dispatch(logoutAction());
        return Promise.reject(error);
      }

      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return MedvaxHttp(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const response = await MedvaxHttp.post("/auth/refresh-token", {
          refreshToken,
        });

        const newTokens = response.data?.data;

        if (newTokens?.accessToken) {
          // Update tokens in store (using action type string to avoid circular dependency)
          store.dispatch({
            type: "global/updateTokens",
            payload: {
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
              expiresIn: newTokens.expiresIn,
            },
          });

          // Update auth cookie for middleware
          if (typeof document !== "undefined") {
            const cookieData = {
              accessToken: newTokens.accessToken,
              user: authUser?.user,
            };
            document.cookie = `medvax_auth=${JSON.stringify(
              cookieData
            )}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          }

          // Process queued requests with new token
          processQueue(null, newTokens.accessToken);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }
          return MedvaxHttp(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        // Token refresh failed, logout user
        processQueue(refreshError as Error, null);
        store.dispatch(logoutAction());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};

export default MedvaxHttp;
