import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
  FavoriteResponse,
  PaginatedFavoritesResponse,
  AddFavoriteRequest,
  CheckFavoriteResponse,
} from "types/favorite";
import * as RtkqTag from "constants/data-tag";

const TAG = "/favorites";

export const favoriteApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<
      PaginatedFavoritesResponse,
      QueryRequest<void, { skip?: number; take?: number; orderBy?: string }, void>
    >({
      query: (config) => ({
        url: TAG,
        ...config,
      }),
      providesTags: [RtkqTag.FAVORITE],
    }),

    checkFavorite: builder.query<
      CheckFavoriteResponse,
      QueryRequest<void, void, { productId: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/check/${path?.productId}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.FAVORITE, id: path?.productId }];
      },
    }),

    getFavoriteProductIds: builder.query<
      ServerResponse<string[]>,
      void
    >({
      query: () => ({
        url: `${TAG}/product-ids`,
      }),
      providesTags: [RtkqTag.FAVORITE],
    }),

    addFavorite: builder.mutation<
      FavoriteResponse,
      QueryRequest<AddFavoriteRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        ...config,
      }),
      invalidatesTags: (result, error, { data }) => {
        return [
          RtkqTag.FAVORITE,
          { type: RtkqTag.FAVORITE, id: data?.productId },
          { type: RtkqTag.PRODUCT, id: data?.productId },
        ];
      },
    }),

    removeFavorite: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { productId: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.productId}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: (result, error, { path }) => {
        return [
          RtkqTag.FAVORITE,
          { type: RtkqTag.FAVORITE, id: path?.productId },
          { type: RtkqTag.PRODUCT, id: path?.productId },
        ];
      },
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useCheckFavoriteQuery,
  useGetFavoriteProductIdsQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;

export default favoriteApi;

