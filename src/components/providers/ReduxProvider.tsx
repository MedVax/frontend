"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, getStore } from "configs/store";
import { setupInterceptors } from "configs/http-config";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "configs/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const interceptorsSetupRef = useRef(false);

  const storeRef = useRef<Store<RootState>>(undefined);
  // eslint-disable-next-line react-hooks/refs
  if (!storeRef?.current) {
    // Create the store instance the first time this renders (client-side only)
    // Use getStore() to ensure singleton pattern and avoid SSR issues
    if (typeof window !== "undefined") {
      storeRef.current = getStore();
    } else {
      // Fallback for SSR - create a temporary store (will be replaced on client)
      storeRef.current = makeStore();
    }
  }

  useEffect(() => {
    // Set up interceptors only once
    if (!interceptorsSetupRef.current) {
      setupInterceptors(storeRef.current as Store<RootState>);
      interceptorsSetupRef.current = true;
    }
  }, []);


  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
