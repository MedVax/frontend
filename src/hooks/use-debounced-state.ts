import { useEffect, useMemo, useState } from "react";
import { debounce } from "utils/function";

function useDebouncedState<S>(
  initialState: S,
  options = {} as { wait: number; enableReInitialize: boolean }
) {
  const { wait = 0, enableReInitialize = false } = options;
  const [state, setState] = useState(initialState);

  const debouncedSetState = useMemo(() => debounce(setState, wait), [wait]);

  useEffect(() => {
    if (enableReInitialize) {
      debouncedSetState(initialState);
    }
  }, [debouncedSetState, enableReInitialize, initialState]);

  return [state, debouncedSetState] as const;
}

export default useDebouncedState;
