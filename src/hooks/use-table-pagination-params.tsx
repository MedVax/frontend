// @ts-nocheck
import { useCallback, useMemo } from "react";
import usePaginationParams from "./use-pagination-params";

function useTablePaginationParams(): [
  state,
  setState,
  paginationParams: { offset: number; limit: number },
  setPaginationParams
] {
  const [paginationParams, setPaginationParams] = usePaginationParams();

  const state = useMemo(() => getState(paginationParams), [paginationParams]);

  const setState = useCallback(
    (args) => {
      setPaginationParams((previousParam) => {
        const { pageIndex, pageSize } =
          typeof args === "function"
            ? args(getState(previousParam))
            : args || {};
        return { offset: pageIndex * pageSize, limit: pageSize };
      });
    },
    [setPaginationParams]
  );

  return /** @type {[typeof state, typeof setState, typeof paginationParams, typeof setPaginationParams]} */ [
    state,
    setState,
    paginationParams,
    setPaginationParams,
  ];
}

export default useTablePaginationParams;

/**
 * @param {{limit: number; size: number}} params
 */
function getState({ limit, offset }) {
  return { pageSize: limit, pageIndex: offset / limit };
}
