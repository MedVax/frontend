import axios, { InternalAxiosRequestConfig } from "axios";
import type { Store } from "@reduxjs/toolkit";
import { BASE_URL } from "constants/env";

export const MedvaxHttp = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const setupInterceptors = (_store: Store) => {
  // Request interceptor - add auth token to requests
  MedvaxHttp?.interceptors?.request?.use(
    async (config: InternalAxiosRequestConfig) => {
      const state = _store.getState();
      const accessToken = state?.global?.authUser?.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle 401 errors and token refresh
  MedvaxHttp?.interceptors?.response?.use(
    (response) => response,
    async function (error) {
      if (error?.response?.status === 401) {
        // Clear all tokens and cache
        if (typeof document !== "undefined") {
          document.cookie = `accessToken=; path=/; max-age=0; SameSite=Lax`;
          document.cookie = `refreshToken=; path=/; max-age=0; SameSite=Lax`;
        }
        window?.postMessage?.({ type: "LOGOUT" }, window.location.origin);
      } else {
        // Deliberately left out
      }

      return Promise.reject(error);
    }
  );
};

export default MedvaxHttp;
