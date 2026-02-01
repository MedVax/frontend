import { medvaxApi } from "configs/store-query";
import { QueryRequest, PaginationServerResponse } from "types/global";
import { OrderResponse, OrdersResponse, OrderRecurringFrequency, CreateOrderResponse, OrderStatus, PaymentStatus, PrescriptionStatus } from "types/order";
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
        isRecurring?: boolean;
        orderStatus?: OrderStatus[];
        paymentStatus?: PaymentStatus[];
        isRecurringActive?: boolean;
        prescriptionStatus?: PrescriptionStatus[];
        skip?: number;
        take?: number;
      }, void>
    >({
      query: ({ ...config }) => {
        return {
          url: TAG,
          ...config,
        };
      },
      providesTags: [RtkqTag.ORDER],
    }),

    createOrder: builder.mutation<
      CreateOrderResponse,
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
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/recurring`,
        method: "PATCH",
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

