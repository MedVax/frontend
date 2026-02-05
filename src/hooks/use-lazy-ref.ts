import { useRef } from "react";

/**
 * @template A,R
 * @param {(...args: A[]) => R} func
 * @param  {...A} args
 * @returns {React.MutableRefObject<R>}
 */
export function useLazyRef<A, R>(
  func: (...args: A[]) => R,
  ...args: A[]
): React.MutableRefObject<R> {
  const ref = useRef<R>(null);
  if (!ref.current && func) {
    ref.current = func(...args);
  }
  // @ts-expect-error - RefObject<R | null> is not assignable to MutableRefObject<R>, but this is safe in practice
  return ref;
}

export default useLazyRef;
