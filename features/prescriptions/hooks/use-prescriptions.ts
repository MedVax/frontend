import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prescriptionsApi } from '../api/prescriptions.api';
import type { VerifyPrescriptionInput } from '../schemas/prescription.schema';

export const prescriptionKeys = {
    all: ['prescriptions'] as const,
    details: () => [...prescriptionKeys.all, 'detail'] as const,
    detail: (id: number) => [...prescriptionKeys.details(), id] as const,
};

export function usePrescription(id: number, token: string) {
    return useQuery({
        queryKey: prescriptionKeys.detail(id),
        queryFn: () => prescriptionsApi.getPrescription(id, token),
        enabled: !!id && !!token,
    });
}

export function useUploadPrescription(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, formData }: { orderId: number; formData: FormData }) =>
            prescriptionsApi.uploadPrescription(orderId, formData, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useVerifyPrescription(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: VerifyPrescriptionInput }) =>
            prescriptionsApi.verifyPrescription(id, data, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: prescriptionKeys.detail(variables.id) });
        },
    });
}
