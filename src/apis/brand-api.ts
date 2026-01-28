import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
  Brand,
  BrandResponse,
  BrandsResponse,
  CreateBrandRequest,
  UpdateBrandRequest,
} from "types/brand";
import * as RtkqTag from "constants/data-tag";
import { objectToFormData } from "utils/object";

const TAG = "/brands";

const brandApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<
      BrandsResponse,
      QueryRequest<
        void,
        {
          includeInactive?: boolean;
        },
        void
      >
    >({
      query: (config) => ({
        url: TAG,
        ...config,
      }),
      providesTags: [RtkqTag.BRAND],
    }),

    getBrandById: builder.query<
      BrandResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: [RtkqTag.BRAND],
    }),

    createBrand: builder.mutation<
      BrandResponse,
      QueryRequest<CreateBrandRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.BRAND],
    }),

    createBrandWithLogo: builder.mutation<
      BrandResponse,
      QueryRequest<{ file: File; data: CreateBrandRequest }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: objectToFormData({
          ...config?.data?.data,
          logo: config?.data?.file,
        }),
      }),
      invalidatesTags: [RtkqTag.BRAND],
    }),

    updateBrand: builder.mutation<
      BrandResponse,
      QueryRequest<UpdateBrandRequest, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: [RtkqTag.BRAND],
    }),

    updateBrandWithLogo: builder.mutation<
      BrandResponse,
      QueryRequest<
        { file: File; data: UpdateBrandRequest },
        void,
        { id: string }
      >
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "PATCH",
        headers: { "Content-Type": "multipart/form-data" },
        data: objectToFormData({
          ...config?.data?.data,
          logo: config?.data?.file,
        }),
      }),
      invalidatesTags: [RtkqTag.BRAND],
    }),

    deleteBrand: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: [RtkqTag.BRAND],
    }),
  }),
});

export default brandApi;

