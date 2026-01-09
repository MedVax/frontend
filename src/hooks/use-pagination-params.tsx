// @ts-nocheck
import { PaginationDefault } from "constants/global";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/url";

function usePaginationParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => getParams(searchParams), [searchParams]);

  const setState = useCallback(
    (args) => {
      setSearchParams((searchParams) => {
        const {
          offset = PaginationDefault.offset,
          limit = PaginationDefault.limit,
        } =
          (typeof args === "function" ? args(getParams(searchParams)) : args) ||
          {};
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("offset", offset);
        newSearchParams.set("limit", limit);
        return newSearchParams;
      });
    },
    [setSearchParams]
  );

  return /** @type {[typeof state, typeof setState]} */ [state, setState];
}

export default usePaginationParams;

function getParams(searchParams) {
  const { offset, limit } = urlSearchParamsExtractor(
    searchParams,
    PaginationDefault
  );
  return {
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
}
