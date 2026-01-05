import type { ConsultationStatus, ConsultationType } from '../schemas/consultation.schema';

export type Consultation = {
    id: number;
    userId: number;
    clinicianId: number | null;
    type: ConsultationType;
    status: ConsultationStatus;
    notes: string | null;
    attachments: string[];
    symptomsDescription: string;
    createdAt: string;
    scheduledAt: string | null;
    updatedAt: string;
};
