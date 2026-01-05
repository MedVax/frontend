import { apiClient } from '@/lib/api-client';
import type { VerifyPrescriptionInput } from '../schemas/prescription.schema';
import type { Prescription } from '../types/prescription.types';

export const prescriptionsApi = {
    uploadPrescription: (orderId: number, formData: FormData, token: string) =>
        apiClient.upload<Prescription>(`/orders/${orderId}/prescriptions`, formData, { token }),

    verifyPrescription: (id: number, data: VerifyPrescriptionInput, token: string) =>
        apiClient.put<Prescription>(`/prescriptions/${id}/verify`, data, { token }),

    getPrescription: (id: number, token: string) =>
        apiClient.get<Prescription>(`/prescriptions/${id}`, { token }),
};
