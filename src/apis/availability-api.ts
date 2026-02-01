import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";
import {
  TimeInterval,
  WeeklyAvailability,
  CustomAvailabilityItem,
  UpdateAvailabilityRequest,
  AvailabilityResponse,
  AvailabilityResponseData,
  DayAvailability,
  DayAvailabilityResponse,
} from "types/availability";

const TAG = "/sessions";

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
      providesTags: [RtkqTag.AVAILABILITY],
    }),

    getConsultantAvailabilitySlots: builder.query<
      DayAvailabilityResponse,
      QueryRequest<void, { consultantId: string; date?: string; buffer?: number }, void>
    >({
      query: ({ params, ...config }) => ({
        url: `${TAG}/consultants/${params?.consultantId}/availability`,
        params: {
          ...(params?.date && { date: params.date }),
          ...(params?.buffer && { buffer: params.buffer }),
        },
        ...config,
      }),
      providesTags: [RtkqTag.AVAILABILITY],
    }),

    updateAvailability: builder.mutation<
      ServerResponse<{ success: boolean }>,
      QueryRequest<UpdateAvailabilityRequest, { consultantId?: string }, void>
    >({
      query: ({ params, ...config }) => {
        const consultantId = params?.consultantId;
        const url = consultantId
          ? `${TAG}/consultants/${consultantId}/availability`
          : `${TAG}/consultants/availability`;
        return {
          url,
          method: "PATCH",
          ...config,
        };
      },
      invalidatesTags: [RtkqTag.AVAILABILITY],
    }),
  }),
});

export const {
  useGetAvailabilityQuery,
  useGetConsultantAvailabilitySlotsQuery,
  useUpdateAvailabilityMutation,
} = availabilityApi;

// Re-export types for convenience
export type {
  TimeInterval,
  WeeklyAvailability,
  CustomAvailabilityItem,
  UpdateAvailabilityRequest,
  AvailabilityResponse,
  DayAvailability,
};
