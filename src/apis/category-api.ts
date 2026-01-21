import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
  Category,
  CategoryResponse,
  CategoriesResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  BulkCreateCategoryRequest,
} from "types/category";
import * as RtkqTag from "constants/data-tag";
import { objectToFormData } from "utils/object";

const TAG = "/categories";

const categoryApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<
      CategoriesResponse,
      QueryRequest<
        void,
        {
          includeSubcategories?: boolean;
          hierarchy?: boolean;
        },
        void
      >
    >({
      query: (config) => ({
        url: TAG,
        ...config,
      }),
      providesTags: [RtkqTag.CATEGORY],
    }),

    getCategoryById: builder.query<
      CategoryResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: [RtkqTag.CATEGORY],
    }),

    getCategoryBySlug: builder.query<
      CategoryResponse,
      QueryRequest<void, void, { slug: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/slug/${path?.slug}`,
        ...config,
      }),
      providesTags: [RtkqTag.CATEGORY],
    }),

    getSubcategoriesByParent: builder.query<
      CategoriesResponse,
      QueryRequest<void, void, { parentId: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/parent/${path?.parentId}`,
        ...config,
      }),
      providesTags: [RtkqTag.CATEGORY],
    }),

    createCategory: builder.mutation<
      CategoryResponse,
      QueryRequest<CreateCategoryRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.CATEGORY],
    }),

    createCategoryWithImage: builder.mutation<
      CategoryResponse,
      QueryRequest<{ file: File; data: CreateCategoryRequest }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: objectToFormData({
          ...config?.data?.data,
          image: config?.data?.file,
        }),
      }),
      invalidatesTags: [RtkqTag.CATEGORY],
    }),

    bulkCreateCategories: builder.mutation<
      ServerResponse<Category[]>,
      QueryRequest<BulkCreateCategoryRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/bulk`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.CATEGORY],
    }),

    updateCategory: builder.mutation<
      CategoryResponse,
      QueryRequest<UpdateCategoryRequest, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: [RtkqTag.CATEGORY],
    }),

    updateCategoryWithImage: builder.mutation<
      CategoryResponse,
      QueryRequest<
        { file: File; data: UpdateCategoryRequest },
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
          image: config?.data?.file,
        }),
      }),
      invalidatesTags: [RtkqTag.CATEGORY],
    }),

    deleteCategory: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: [RtkqTag.CATEGORY],
    }),
  }),
});

export default categoryApi;
