import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse, PaginationServerResponse } from "types/global";
import { OrderResponse, OrdersResponse, OrderRecurringFrequency } from "types/order";
import * as RtkqTag from "constants/data-tag";

const TAG = "/orders";

export interface GuestInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
}

export interface CreateOrderRequest {
  deliveryAddressId?: string;
  guestInfo?: GuestInfo;
  paymentMethod?: string;
  prescriptionUploads?: string[];
  notes?: string;
  isRecurring?: boolean;
  recurringFrequency?: OrderRecurringFrequency;
}

export interface CreateOrderResponse {
  order: any;
  paymentLink?: string;
  recurringOrder?: any;
}

export type PaginatedOrdersResponse = PaginationServerResponse<OrdersResponse["data"]>;

export const orderApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query<
      OrderResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.ORDER, id: path?.id }];
      },
    }),

    getOrders: builder.query<
      PaginatedOrdersResponse,
      QueryRequest<void, { 
        page?: number; 
        limit?: number; 
        status?: string; 
        paymentStatus?: string;
        skip?: number;
        take?: number;
      }, void>
    >({
      query: ({ params, ...config }) => {
        const queryParams: any = {};
        if (params?.page && params?.limit) {
          queryParams.skip = (params.page - 1) * params.limit;
          queryParams.take = params.limit;
        } else if (params?.skip !== undefined && params?.take !== undefined) {
          queryParams.skip = params.skip;
          queryParams.take = params.take;
        }
        if (params?.status) queryParams.status = params.status;
        if (params?.paymentStatus) queryParams.paymentStatus = params.paymentStatus;
        
        return {
          url: TAG,
          params: queryParams,
          ...config,
        };
      },
      providesTags: [RtkqTag.ORDER],
    }),

    createOrder: builder.mutation<
      ServerResponse<CreateOrderResponse>,
      QueryRequest<CreateOrderRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.ORDER, RtkqTag.CART],
    }),

    verifyPayment: builder.mutation<
      OrderResponse,
      QueryRequest<void, void, { reference: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/verify-payment/${path?.reference}`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.ORDER],
    }),

    cancelRecurringOrder: builder.mutation<
      OrderResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/cancel-recurring`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.ORDER, id: path?.id }, RtkqTag.ORDER];
      },
    }),

    setOrderRecurring: builder.mutation<
      OrderResponse,
      QueryRequest<{ isRecurring: boolean; recurringFrequency?: OrderRecurringFrequency }, void, { id: string }>
    >({
      query: ({ path, data, ...config }) => ({
        url: `${TAG}/${path?.id}/recurring`,
        method: "PATCH",
        body: data,
        ...config,
      }),
      invalidatesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.ORDER, id: path?.id }, RtkqTag.ORDER];
      },
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useCancelRecurringOrderMutation,
  useSetOrderRecurringMutation,
} = orderApi;

