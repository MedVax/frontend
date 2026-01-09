import {
  configureStore,
  combineReducers,
  Store,
  Middleware,
  UnknownAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { medvaxApi } from "./store-query";
import { throttle } from "utils/function";
import { deepMerge, isObjectEmpty } from "utils/object";
import globalSlice, {
  getGlobalSliceStorageState,
  globalInitialState,
} from "./store-slice";
import { AES_ENCRYPTION_KEY, DEVELOPMENT } from "constants/env";
import CryptoJS from "crypto-js";
import { logoutAction } from "./store-actions";

const rootReducer = combineReducers({
  [medvaxApi.reducerPath]: medvaxApi.reducer,
  [globalSlice.name]: globalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Store<RootState>["dispatch"];

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

function saveState(state: Partial<RootState>): void {
  if (!isBrowser) return;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(
      "@state",
      DEVELOPMENT
        ? serializedState
        : CryptoJS.AES.encrypt(
            serializedState,
            AES_ENCRYPTION_KEY || ""
          ).toString()
    );
  } catch (error) {
    console.error("Error saving state:", error);
  }
}

function loadState(
  initialState: Partial<RootState> = {}
): Partial<RootState> | undefined {
  if (!isBrowser) return initialState;
  try {
    const newState = { ...initialState };
    const storageState = getLocalStorageState();
    if (storageState && !isObjectEmpty(storageState)) {
      return deepMerge(newState, storageState) as Partial<RootState>;
    }
    return newState;
  } catch (error) {
    console.error("Error loading state:", error);
  }
  return initialState;
}

function getLocalStorageState(): Partial<RootState> | null {
  if (!isBrowser) return null;
  try {
    const serializedState = localStorage.getItem("@state");
    if (serializedState) {
      return JSON.parse(
        DEVELOPMENT
          ? serializedState
          : CryptoJS.AES.decrypt(
              serializedState,
              AES_ENCRYPTION_KEY || ""
            ).toString(CryptoJS.enc.Utf8)
      );
    }
  } catch (error) {
    console.error("Error parsing stored state:", error);
    // Clear corrupted state
    if (isBrowser) {
      localStorage.removeItem("@state");
    }
  }
  return null;
}

export function rtkqOnResetMiddleware(
  ...apis: (typeof medvaxApi)[]
): Middleware {
  return (storeApi) => (next) => (action: unknown) => {
    const result = next(action);
    if (logoutAction.match(action as UnknownAction)) {
      for (const api of apis) {
        storeApi.dispatch(api.util.resetApiState());
      }
      if (isBrowser) {
        localStorage.clear();
        window?.postMessage?.({ type: "LOGOUT" }, window.location.origin);
      }
    }
    return result;
  };
}

export function makeStore(): Store<RootState> {
  const newStore = configureStore({
    reducer: rootReducer,
    preloadedState: loadState({
      [globalSlice.name]: globalInitialState,
    }) as RootState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for serializable check
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(medvaxApi.middleware, rtkqOnResetMiddleware(medvaxApi)),
    devTools: !!DEVELOPMENT,
  });

  setupListeners(newStore.dispatch);

  // Subscribe to state changes and save to localStorage (throttled)
  if (isBrowser) {
    newStore.subscribe(
      throttle(() => {
        const state = newStore.getState();
        saveState({
          [globalSlice.name]: getGlobalSliceStorageState(
            state[globalSlice.name]
          ),
        } as Partial<RootState>);
      }, 1000)
    );
  }

  return newStore;
}

// Create a singleton store for client-side usage
// This will be created when the module loads, but after all imports are resolved
const store: Store<RootState> = makeStore();

export default store;
