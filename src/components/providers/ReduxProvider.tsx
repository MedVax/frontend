"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import store from "configs/store";
import { setupInterceptors } from "configs/http-config";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const interceptorsSetupRef = useRef(false);

  useEffect(() => {
    // Set up interceptors only once
    if (!interceptorsSetupRef.current) {
      setupInterceptors(store);
      interceptorsSetupRef.current = true;
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
