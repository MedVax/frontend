import { createApi } from "@reduxjs/toolkit/query/react";
import * as dataTags from "constants/data-tag";
import axiosBaseQuery from "utils/axios-base-request";
import MedvaxHttp from "./http-config";

// Custom paramsSerializer function for query parameter serialization
const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}`, item);
      });
    } else {
      if (!!value && value !== 0) {
        searchParams.append(key, value);
      }
    }
  }

  return searchParams.toString();
};
export const medvaxApi = createApi({
  reducerPath: "medvax",
  baseQuery: axiosBaseQuery({ paramsSerializer }, MedvaxHttp),
  endpoints: () => ({}),
}).enhanceEndpoints({ addTagTypes: Object.values(dataTags) });
