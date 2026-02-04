"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import store, { makeStore } from "configs/store";
import { setupInterceptors } from "configs/http-config";
import { logoutAction } from "configs/store-actions";
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
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Set up interceptors only once
    if (!interceptorsSetupRef.current) {
      setupInterceptors(storeRef.current as Store<RootState>);
      interceptorsSetupRef.current = true;
    }
  }, []);

  useEffect(() => {
    const handleLogout = (event: MessageEvent) => {
      if (event.data?.type === "LOGOUT") {
        storeRef.current?.dispatch(logoutAction());
      }
    };

    window.addEventListener("message", handleLogout);
    return () => window.removeEventListener("message", handleLogout);
  }, []);

  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
