import { env } from '@/config/env';

type RequestConfig = RequestInit & {
    token?: string;
};

class APIError extends Error {
    constructor(
        public status: number,
        public code: string,
        message: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'APIError';
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred',
        }));

        throw new APIError(
            response.status,
            error.code || 'UNKNOWN_ERROR',
            error.message || response.statusText,
            error.details
        );
    }

    return response.json();
}

export const apiClient = {
    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.token && { Authorization: `Bearer ${config.token}` }),
                ...config?.headers,
            },
            ...config,
        });

        return handleResponse<T>(response);
    },

    async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.token && { Authorization: `Bearer ${config.token}` }),
                ...config?.headers,
            },
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });

        return handleResponse<T>(response);
    },

    async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.token && { Authorization: `Bearer ${config.token}` }),
                ...config?.headers,
            },
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });

        return handleResponse<T>(response);
    },

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.token && { Authorization: `Bearer ${config.token}` }),
                ...config?.headers,
            },
            ...config,
        });

        return handleResponse<T>(response);
    },

    async upload<T>(endpoint: string, formData: FormData, config?: RequestConfig): Promise<T> {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(config?.token && { Authorization: `Bearer ${config.token}` }),
                ...config?.headers,
            },
            body: formData,
            ...config,
        });

        return handleResponse<T>(response);
    },
};

export { APIError };
