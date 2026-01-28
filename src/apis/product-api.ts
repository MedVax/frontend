import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
  ProductResponse,
  ProductsResponse,
  PaginatedProductsResponse,
  GetProductsQuery,
  CreateProductRequest,
  UpdateProductRequest,
} from "types/product";
import * as RtkqTag from "constants/data-tag";

const TAG = "/products";

const productApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedProductsResponse,
      QueryRequest<void, GetProductsQuery, void>
    >({
      query: (config) => ({
        url: TAG,
        ...config,
      }),
      providesTags: [RtkqTag.PRODUCT],
    }),

    getProductById: builder.query<
      ProductResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.PRODUCT, id: path?.id }];
      },
    }),

    getProductBySku: builder.query<
      ProductResponse,
      QueryRequest<void, void, { sku: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/sku/${path?.sku}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.PRODUCT, id: path?.sku }];
      },
    }),

    getBestSellingProducts: builder.query<
      ProductsResponse,
      QueryRequest<void, { limit?: number }, void>
    >({
      query: (config) => ({
        url: `${TAG}/best-selling`,
        ...config,
      }),
      providesTags: (result, error) => {
        return [RtkqTag.PRODUCT];
      },
    }),

    searchProducts: builder.query<
      ProductsResponse,
      QueryRequest<void, { q: string } & GetProductsQuery, void>
    >({
      query: (config) => ({
        url: `${TAG}/search`,
        ...config,
      }),
      providesTags: [RtkqTag.PRODUCT],
    }),

    createProduct: builder.mutation<
      ProductResponse,
      QueryRequest<CreateProductRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.PRODUCT],
    }),

    updateProduct: builder.mutation<
      ProductResponse,
      QueryRequest<UpdateProductRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/${config?.data?.id}`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: [RtkqTag.PRODUCT],
    }),

    deleteProduct: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: [RtkqTag.PRODUCT],
    }),

    getRelatedProducts: builder.query<
      ProductsResponse,
      QueryRequest<void, { limit?: number }, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/related`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.PRODUCT, id: `related-${path?.id}` }];
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySkuQuery,
  useGetBestSellingProductsQuery,
  useSearchProductsQuery,
  useGetRelatedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
