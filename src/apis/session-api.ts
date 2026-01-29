import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
    CreateSessionRequest,
    ScheduleSessionResponse,
    Session,
    SessionsResponse,
    SessionResponse,
    SessionStatus,
    AvailabilitySlot,
} from "types/session";
import * as RtkqTag from "constants/data-tag";

const TAG = "/sessions";

const sessionApi = medvaxApi.injectEndpoints({
    endpoints: (builder) => ({
        scheduleSession: builder.mutation<
            ScheduleSessionResponse,
            QueryRequest<CreateSessionRequest, void, void>
        >({
            query: ({ ...config }) => ({
                url: `${TAG}/schedule`,
                method: "POST",
                ...config,
            }),
            invalidatesTags: [RtkqTag.SESSION],
        }),

        getSessions: builder.query<
            SessionsResponse,
            QueryRequest<void, { page?: number; limit?: number }, void>
        >({
            query: (config) => ({
                url: TAG,
                ...config,
            }),
            providesTags: [RtkqTag.SESSION],
        }),

        getConsultantAvailability: builder.query<
            ServerResponse<AvailabilitySlot[]>,
            QueryRequest<void, void, { id: string }>
        >({
            query: ({ path, ...config }) => ({
                url: `${TAG}/consultants/${path?.id}/availability`,
                ...config,
            }),
        }),

        rescheduleSession: builder.mutation<
            SessionResponse,
            QueryRequest<{ sessionId: string; newStartTime: string }, void, void>
        >({
            query: ({ ...config }) => ({
                url: `${TAG}/reschedule`,
                method: "POST",
                ...config,
            }),
            invalidatesTags: [RtkqTag.SESSION],
        }),

        cancelSession: builder.mutation<
            SessionResponse,
            QueryRequest<{ reason?: string }, void, { id: string }>
        >({
            query: ({ path, ...config }) => ({
                url: `${TAG}/${path?.id}/cancel`,
                method: "POST",
                ...config,
            }),
            invalidatesTags: [RtkqTag.SESSION],
        }),

        updateSessionStatus: builder.mutation<
            SessionResponse,
            QueryRequest<{ status: SessionStatus }, void, { id: string }>
        >({
            query: ({ path, ...config }) => ({
                url: `${TAG}/${path?.id}/status`,
                method: "PATCH",
                ...config,
            }),
            invalidatesTags: [RtkqTag.SESSION],
        }),
    }),
});

export const {
    useScheduleSessionMutation,
    useGetSessionsQuery,
    useGetConsultantAvailabilityQuery,
    useRescheduleSessionMutation,
    useCancelSessionMutation,
    useUpdateSessionStatusMutation,
} = sessionApi;

export default sessionApi;
