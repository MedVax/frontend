import { ServerResponse } from "./global";
import { User } from "./user";

export enum SessionStatus {
    PENDING = "PENDING",
    UPCOMING = "UPCOMING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    DECLINED = "DECLINED",
    PENDING_APPROVAL = "PENDING_APPROVAL",
}

export enum SessionType {
    INDIVIDUAL = "INDIVIDUAL",
    COUPLE = "COUPLE",
    CONSULTATION = "CONSULTATION",
}

export interface Session {
    id: string;
    consultantId: number;
    consultant?: User;
    clientId: number;
    client?: User;
    startTime: string;
    endTime: string;
    status: SessionStatus;
    type: SessionType;
    meetingLink?: string; // Dyte link
    meetingId?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSessionRequest {
    consultantId: number;
    startTime: string; // ISO-8601
    type: SessionType;
    couponCode?: string;
    participants?: string[]; // email addresses for COUPLE
}

export interface ScheduleSessionResponse {
    paymentLink?: string;
    sessions?: Session[];
    session?: Session;
    requiresPayment: boolean;
}

export type SessionResponse = ServerResponse<Session>;
export type SessionsResponse = ServerResponse<Session[]>;

export interface AvailabilitySlot {
    date: string;
    slots: string[];
}
