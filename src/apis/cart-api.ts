import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
  CartResponse,
  CartItemResponse,
  AddCartItemRequest,
  UpdateCartItemRequest,
} from "types/cart";
import * as RtkqTag from "constants/data-tag";

const TAG = "/cart";

export const cartApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: TAG,
        method: "GET",
      }),
      providesTags: [RtkqTag.CART],
    }),

    addCartItem: builder.mutation<
      CartItemResponse,
      QueryRequest<AddCartItemRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/items`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: (result, error, { data }) => {
        return [RtkqTag.CART, { type: RtkqTag.PRODUCT, id: data?.productId }];
      },
    }),

    updateCartItem: builder.mutation<
      CartItemResponse,
      QueryRequest<UpdateCartItemRequest, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/items/${path?.id}`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: [RtkqTag.CART],
    }),

    removeCartItem: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/items/${path?.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: [RtkqTag.CART],
    }),

    clearCart: builder.mutation<ServerResponse<null>, void>({
      query: () => ({
        url: TAG,
        method: "DELETE",
      }),
      invalidatesTags: [RtkqTag.CART],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
