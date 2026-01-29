import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse, PaginationServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/consultants";

export interface Consultant {
  id: string;
  jobTitle?: string | null;
  bio?: string | null;
  rate?: number | null;
  areaOfExpertise?: string[] | null;
  yearsOfExperience?: number | null;
  faith?: string | null;
  availabilityPeriod?: string | null;
  offerFaithTherapy?: boolean | null;
  hasSetAvailability: boolean;
  rating?: number | null;
  timezone?: string | null;
  userProfile?: {
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar?: string | null;
    };
  };
}

export interface AssignConsultantRequest {
  clientId: string;
  consultantId?: string | null;
}

export type ConsultantResponse = ServerResponse<Consultant>;
export type ConsultantsResponse = PaginationServerResponse<Consultant[]>;

export interface UpdateConsultantRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  jobTitle?: string;
  rate?: number;
  areaOfExpertise?: string[];
  yearsOfExperience?: number;
  faith?: string;
  introVideo?: string;
}

export const consultantApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsultants: builder.query<
      ConsultantsResponse,
      QueryRequest<void, { skip?: number; take?: number; search?: string }, void>
    >({
      query: ({ params, ...config }) => ({
        url: TAG,
        params: {
          skip: params?.skip || 0,
          take: params?.take || 20,
          ...(params?.search && { _search: params.search }),
        },
        ...config,
      }),
      providesTags: [RtkqTag.USER],
    }),

    getConsultantById: builder.query<
      ConsultantResponse,
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

    getConsultantProfile: builder.query<
      ConsultantResponse,
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

    updateConsultantProfile: builder.mutation<
      ConsultantResponse,
      QueryRequest<UpdateConsultantRequest, void, void>
    >({
      query: ({ data, ...config }) => ({
        url: TAG,
        method: "PUT",
        body: data,
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    assignConsultant: builder.mutation<
      ServerResponse<any>,
      QueryRequest<AssignConsultantRequest, void, void>
    >({
      query: ({ data, ...config }) => ({
        url: "/clients/assign-consultant",
        method: "PATCH",
        body: data,
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),
  }),
});

export const {
  useGetConsultantsQuery,
  useGetConsultantByIdQuery,
  useGetConsultantProfileQuery,
  useUpdateConsultantProfileMutation,
  useAssignConsultantMutation,
} = consultantApi;

