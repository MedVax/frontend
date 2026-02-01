import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/clients";

export interface ClientProfile {
  id: string;
  coverName?: string | null;
  referral?: string | null;
  channel?: string | null;
  useCoverName?: boolean | null;
  symptoms?: string[];
  hasBookedSession?: boolean | null;
  userProfile?: {
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar?: string | null;
    };
  };
  userProfileConsultant?: {
    id: string;
    jobTitle?: string | null;
    bio?: string | null;
    rate?: number | null;
    areaOfExpertise?: string[] | null;
    yearsOfExperience?: number | null;
    userProfile?: {
      user?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatar?: string | null;
      };
    };
  } | null;
}

export interface UpdateClientRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  coverName?: string;
  referral?: string;
  useCoverName?: boolean;
}

export type ClientProfileResponse = ServerResponse<ClientProfile>;

export const clientApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientProfile: builder.query<
      ClientProfileResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: [RtkqTag.USER],
    }),

    getClientProfileByUser: builder.query<ClientProfileResponse, QueryRequest<void, void, { clientProfileId: string }>>({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.clientProfileId}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.USER, id: path?.clientProfileId }];
      },
    }),

    updateClientProfile: builder.mutation<
      ClientProfileResponse,
      QueryRequest<UpdateClientRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG,
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),
  }),
});

export const {
  useGetClientProfileQuery,
  useGetClientProfileByUserQuery,
  useUpdateClientProfileMutation,
} = clientApi;

