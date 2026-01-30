import { ServerResponse } from "./global";

export enum PrescriptionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum PrescriptionType {
    DOCTOR = "DOCTOR",
    PATIENT = "PATIENT",
}

export interface Prescription {
    id: string;
    userId?: string;
    fileUrl: string;
    status: PrescriptionStatus;
    notes?: string;

    // Patient Info
    patientName?: string;
    patientLocation?: string;
    patientEmail?: string;
    patientPhone?: string;
    additionalNote?: string;

    // Doctor Info
    prescriberName?: string;
    prescriberEmail?: string;
    prescriberPhone?: string;
    prescriberHospital?: string;
    prescriberLocation?: string;
    hospitalName?: string;
    drugName?: string;
    dosage?: string;

    prescriberType?: PrescriptionType;

    createdAt: string;
    updatedAt: string;
}

export interface CreatePrescriptionRequest {
    file: File;
    orderId?: string;
    prescriberType: PrescriptionType;

    // Patient Info
    patientName?: string;
    patientLocation?: string;
    patientEmail?: string;
    patientPhone?: string;
    additionalNote?: string;

    // Doctor Info
    prescriberName?: string;
    prescriberEmail?: string;
    prescriberPhone?: string;
    prescriberHospital?: string;
    prescriberLocation?: string;
    hospitalName?: string;
    drugName?: string;
    dosage?: string;
}

export type PrescriptionResponse = ServerResponse<Prescription>;
export type PrescriptionsResponse = ServerResponse<Prescription[]>;
