import { toast } from 'sonner';
import { APIError } from './api-client';

export function handleApiError(error: unknown) {
    if (error instanceof APIError) {
        toast.error(error.message, {
            description: error.details ? JSON.stringify(error.details) : undefined,
        });
    } else if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error('An unexpected error occurred');
    }
}

export function showSuccessToast(message: string, description?: string) {
    toast.success(message, { description });
}

export function showErrorToast(message: string, description?: string) {
    toast.error(message, { description });
}

export function showInfoToast(message: string, description?: string) {
    toast.info(message, { description });
}

export function showLoadingToast(message: string) {
    return toast.loading(message);
}
