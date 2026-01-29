import { ServerResponse } from "./global";

export enum PrescriptionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface Prescription {
    id: string;
    userId: number;
    fileUrl: string;
    status: PrescriptionStatus;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePrescriptionDto {
    fileUrl?: string;
    file?: File;
    notes?: string;
}

export type PrescriptionResponse = ServerResponse<Prescription>;
export type PrescriptionsResponse = ServerResponse<Prescription[]>;
