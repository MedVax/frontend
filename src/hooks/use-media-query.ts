import { useMemo, useRef, useSyncExternalStore } from "react";

/**
 *
 * @param {string} query
 * @param {(online: boolean, event: Event) => void} callback
 * @returns {boolean}
 */
export function useMediaQuery(
  query: string,
  callback: (online: boolean, event: Event) => void
): boolean {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const { subscribe, getSnapshot } = useMemo(
    () => ({
      getSnapshot() {
        return getMatches(query);
      },
      subscribe(listener: any) {
        function handleChange(event: any) {
          callbackRef.current?.(getMatches(query), event);
          listener();
        }

        const mediaQueryList = window.matchMedia(query);

        // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
        if (mediaQueryList.addListener) {
          mediaQueryList.addListener(handleChange);
        } else {
          mediaQueryList.addEventListener("change", handleChange);
        }

        return () => {
          if (mediaQueryList.removeListener) {
            mediaQueryList.removeListener(handleChange);
          } else {
            mediaQueryList.removeEventListener("change", handleChange);
          }
        };
      },
    }),
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

function getMatches(query: string): boolean {
  // Prevents SSR issues
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  return false;
}
