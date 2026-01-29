import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/sessions";

export interface TimeInterval {
  start: number; // Hour (0-23)
  end: number; // Hour (0-23)
}

export interface WeeklyAvailability {
  monday?: TimeInterval[];
  tuesday?: TimeInterval[];
  wednesday?: TimeInterval[];
  thursday?: TimeInterval[];
  friday?: TimeInterval[];
  saturday?: TimeInterval[];
  sunday?: TimeInterval[];
}

export interface CustomAvailabilityItem {
  id?: string;
  date: string; // ISO date string
  intervals: TimeInterval[];
}

export interface UpdateAvailabilityRequest {
  timezone: string;
  weekly?: WeeklyAvailability;
  custom?: CustomAvailabilityItem[];
}

export interface AvailabilityResponse {
  timezone: string;
  weekly: Record<string, TimeInterval[]>;
  custom: Array<{
    id: string;
    date: string;
    intervals: TimeInterval[];
  }>;
}

export type AvailabilityResponseData = ServerResponse<AvailabilityResponse>;

export const availabilityApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailability: builder.query<
      AvailabilityResponseData,
      QueryRequest<void, { consultantId?: string; date?: string }, void>
    >({
      query: ({ params, ...config }) => {
        const consultantId = params?.consultantId;
        const url = consultantId
          ? `${TAG}/consultants/${consultantId}/availability`
          : `${TAG}/consultants/availability`;
        return {
          url,
          params: params?.date ? { date: params.date } : undefined,
          ...config,
        };
      },
      providesTags: ["AVAILABILITY"],
    }),

    updateAvailability: builder.mutation<
      ServerResponse<{ success: boolean }>,
      QueryRequest<UpdateAvailabilityRequest, { consultantId?: string }, void>
    >({
      query: ({ params, data, ...config }) => {
        const consultantId = params?.consultantId;
        const url = consultantId
          ? `${TAG}/consultants/${consultantId}/availability`
          : `${TAG}/consultants/availability`;
        return {
          url,
          method: "PATCH",
          body: data,
          ...config,
        };
      },
      invalidatesTags: ["AVAILABILITY"],
    }),
  }),
});

export const {
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
} = availabilityApi;

