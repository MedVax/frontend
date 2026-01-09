import { createApi } from "@reduxjs/toolkit/query/react";
import * as dataTags from "constants/data-tag";
import axiosBaseQuery from "utils/axios-base-request";
import MedvaxHttp from "./http-config";

export const medvaxApi = createApi({
  reducerPath: "medvax",
  baseQuery: axiosBaseQuery({}, MedvaxHttp),
  endpoints: () => ({}),
}).enhanceEndpoints({ addTagTypes: Object.values(dataTags) });
