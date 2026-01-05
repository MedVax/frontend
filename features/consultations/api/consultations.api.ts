import { apiClient } from '@/lib/api-client';
import type { CompleteConsultationInput, RequestConsultationInput } from '../schemas/consultation.schema';
import type { Consultation } from '../types/consultation.types';

export const consultationsApi = {
    getConsultations: (token: string) =>
        apiClient.get<Consultation[]>('/consultations', { token }),

    getConsultation: (id: number, token: string) =>
        apiClient.get<Consultation>(`/consultations/${id}`, { token }),

    requestConsultation: (data: RequestConsultationInput, token: string) =>
        apiClient.post<Consultation>('/consultations', data, { token }),

    acceptConsultation: (id: number, token: string) =>
        apiClient.put<Consultation>(`/consultations/${id}/accept`, undefined, { token }),

    completeConsultation: (id: number, data: CompleteConsultationInput, token: string) =>
        apiClient.put<Consultation>(`/consultations/${id}/complete`, data, { token }),
};
