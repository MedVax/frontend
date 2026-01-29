import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/addresses";

export interface Address {
  id: string;
  userId: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postalCode?: string | null;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  phone: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  isDefault?: boolean;
}

export type AddressResponse = ServerResponse<Address>;
export type AddressesResponse = ServerResponse<Address[]>;

export const addressApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<AddressesResponse, void>({
      query: () => ({
        url: TAG,
        method: "GET",
      }),
      providesTags: [RtkqTag.USER],
    }),

    getAddressById: builder.query<
      AddressResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.USER, id: path?.id }];
      },
    }),

    createAddress: builder.mutation<
      AddressResponse,
      QueryRequest<CreateAddressRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    updateAddress: builder.mutation<
      AddressResponse,
      QueryRequest<UpdateAddressRequest, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    deleteAddress: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    setDefaultAddress: builder.mutation<
      AddressResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/default`,
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;

