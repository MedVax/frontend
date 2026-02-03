import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse, PaginationServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/sessions";

export enum SessionStatus {
  COMPLETED = "COMPLETED",
  UPCOMING = "UPCOMING",
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DECLINED = "DECLINED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
}

export enum SessionType {
  INDIVIDUAL = "INDIVIDUAL",
  COUPLE = "COUPLE",
  CONSULTATION = "CONSULTATION",
}

export interface Session {
  id: string;
  clientId: string;
  consultantId: string;
  status: SessionStatus;
  sessionType: SessionType;
  scheduledDate: string;
  scheduledDateString: string;
  meetingId?: string | null;
  meetingUrl?: string | null;
  clientTimezone?: string | null;
  note?: string | null;
  prescriptionNote?: string | null;
  sessionNote?: string | null;
  rescheduled: boolean;
  client?: {
    id: string;
    userProfile?: {
      user?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        avatar?: string | null;
      };
    };
  };
  consultant?: {
    id: string;
    userProfile?: {
      user?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        avatar?: string | null;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface ConsultantStats {
  totalSessions: number;
  upcomingSessions: number;
  completedSessions: number;
  pendingSessions: number;
  averageRating?: number;
}

export type SessionsResponse = PaginationServerResponse<Session[]>;
export type ConsultantStatsResponse = ServerResponse<ConsultantStats>;

export const sessionApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantSessions: builder.query<
      SessionsResponse,
      QueryRequest<void, { page?: number; limit?: number; state?: string; clientId?: string }, void>
    >({
      query: ({ params, ...config }) => ({
        url: `${TAG}/consultant`,
        params,
        ...config,
      }),
      providesTags: ["SESSION"],
    }),

    getClientSessions: builder.query<
      SessionsResponse,
      QueryRequest<void, { skip?: number; take?: number; state?: string; ids?: string[] }, void>
    >({
      query: ({ params, ...config }) => ({
        url: TAG,
        params,
        ...config,
      }),
      providesTags: ["SESSION"],
    }),

    getConsultantStats: builder.query<
      ConsultantStatsResponse,
      QueryRequest<void, void, { consultantId: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/consultant/${path?.consultantId}/stats`,
        ...config,
      }),
      providesTags: ["SESSION"],
    }),

    updateSessionStatus: builder.mutation<
      ServerResponse<Session>,
      QueryRequest<{ status: SessionStatus }, void, { id: string }>
    >({
      query: ({ path, data, ...config }) => ({
        url: `${TAG}/${path?.id}/status`,
        method: "PATCH",
        body: { status: data?.status },
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    rescheduleSession: builder.mutation<
      ServerResponse<any>,
      QueryRequest<{
        sessionId: string;
        date: string;
        consultantId: string;
        reason?: string;
      }, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/reschedule`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    cancelSession: builder.mutation<
      ServerResponse<any>,
      QueryRequest<{
        sessionId: string;
        date: string;
        consultantId: string;
        note?: string;
      }, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/cancel`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    scheduleSessions: builder.mutation<
      ServerResponse<{
        sessions: Session[] | null;
        paymentLink: string | null;
      }>,
      QueryRequest<{
        consultantId: string;
        clientId: string;
        dates: string[];
        sessionType: SessionType;
        clientTimezone: string;
        redirectUrl?: string;
        applyGift?: boolean;
        paidBy: string;
        hmoId?: string;
        hmoNumber?: string;
        couponId?: string;
        subscriptionId?: string;
        note?: string;
        currencyId?: number;
      }, void, void>
    >({
      query: ({ ...config }) => ({
        url: `${TAG}/schedule`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    updateSessionNote: builder.mutation<
      ServerResponse<Session>,
      QueryRequest<{ note: string }, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/note`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    getSessionById: builder.query<
      ServerResponse<Session>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: ["SESSION"],
    }),

    getSessionMeetingToken: builder.query<
      ServerResponse<{ token: string }>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/meeting-token`,
        ...config,
      }),
      providesTags: ["SESSION"],
    }),

    updatePrescriptionNote: builder.mutation<
      ServerResponse<Session>,
      QueryRequest<{ prescriptionNote: string }, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/prescription-note`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    updateSessionNoteReport: builder.mutation<
      ServerResponse<Session>,
      QueryRequest<{ sessionNote: string }, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}/session-note`,
        method: "PATCH",
        ...config,
      }),
      invalidatesTags: ["SESSION"],
    }),

    verifySessionPayment: builder.mutation<
      ServerResponse<any>,
      QueryRequest<void, void, { reference: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/verify-payment/${path?.reference}`,
        method: "POST",
        ...config,
      }),
    }),
  }),
});

export const {
  useGetConsultantSessionsQuery,
  useGetClientSessionsQuery,
  useGetConsultantStatsQuery,
  useUpdateSessionStatusMutation,
  useRescheduleSessionMutation,
  useCancelSessionMutation,
  useScheduleSessionsMutation,
  useUpdateSessionNoteMutation,
  useGetSessionByIdQuery,
  useGetSessionMeetingTokenQuery,
  useUpdatePrescriptionNoteMutation,
  useUpdateSessionNoteReportMutation,
} = sessionApi;

