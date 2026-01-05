import type { PrescriptionStatusEnum } from '../schemas/prescription.schema';

export type Prescription = {
    id: number;
    orderId: number | null;
    userId: number;
    uploadedBy: number;
    fileUrl: string;
    status: PrescriptionStatusEnum;
    reviewedBy: number | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
};
