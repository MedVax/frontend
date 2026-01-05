import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { consultationsApi } from '../api/consultations.api';
import type { CompleteConsultationInput, RequestConsultationInput } from '../schemas/consultation.schema';

export const consultationKeys = {
    all: ['consultations'] as const,
    lists: () => [...consultationKeys.all, 'list'] as const,
    list: () => [...consultationKeys.lists()] as const,
    details: () => [...consultationKeys.all, 'detail'] as const,
    detail: (id: number) => [...consultationKeys.details(), id] as const,
};

export function useConsultations(token: string) {
    return useQuery({
        queryKey: consultationKeys.list(),
        queryFn: () => consultationsApi.getConsultations(token),
        enabled: !!token,
    });
}

export function useConsultation(id: number, token: string) {
    return useQuery({
        queryKey: consultationKeys.detail(id),
        queryFn: () => consultationsApi.getConsultation(id, token),
        enabled: !!id && !!token,
    });
}

export function useRequestConsultation(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RequestConsultationInput) =>
            consultationsApi.requestConsultation(data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
        },
    });
}

export function useAcceptConsultation(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => consultationsApi.acceptConsultation(id, token),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: consultationKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
        },
    });
}

export function useCompleteConsultation(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CompleteConsultationInput }) =>
            consultationsApi.completeConsultation(id, data, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: consultationKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
        },
    });
}
