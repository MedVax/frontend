import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/calendar-integration";

export interface CalendarIntegration {
  id: string;
  provider: "google" | "outlook" | "apple";
  isConnected: boolean;
  providerEmail?: string | null;
  calendarId?: string | null;
  lastSyncedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectCalendarRequest {
  provider: "google" | "outlook" | "apple";
  code: string;
}

export interface CalendarAuthUrlResponse {
  authUrl: string;
}

export const calendarIntegrationApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUrl: builder.query<
      ServerResponse<CalendarAuthUrlResponse>,
      QueryRequest<void, { provider?: "google" | "outlook" | "apple"; redirectUri: string }, void>
    >({
      query: ({ params, ...config }) => ({
        url: `${TAG}/auth-url`,
        params: {
          provider: params?.provider || "google",
          redirectUri: params?.redirectUri,
        },
        ...config,
      }),
    }),

    connectCalendar: builder.mutation<
      ServerResponse<CalendarIntegration>,
      QueryRequest<ConnectCalendarRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/connect`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    getIntegrations: builder.query<
      ServerResponse<CalendarIntegration[]>,
      QueryRequest<void, { provider?: "google" | "outlook" | "apple" }, void>
    >({
      query: ({ params, ...config }) => ({
        url: TAG,
        params: params?.provider ? { provider: params.provider } : undefined,
        ...config,
      }),
      providesTags: [RtkqTag.USER],
    }),

    disconnectCalendar: builder.mutation<
      ServerResponse<CalendarIntegration>,
      QueryRequest<void, void, { provider: "google" | "outlook" | "apple" }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/disconnect/${path?.provider}`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    deleteIntegration: builder.mutation<
      ServerResponse<void>,
      QueryRequest<void, void, { provider: "google" | "outlook" | "apple" }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.provider}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),
  }),
});

export const {
  useConnectCalendarMutation,
  useGetIntegrationsQuery,
  useDisconnectCalendarMutation,
  useDeleteIntegrationMutation,
} = calendarIntegrationApi;

