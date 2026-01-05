export type { UserRole, User } from '@/features/auth';
export type { Product, ProductListResponse } from '@/features/products';
export type { Order, Cart, CartItem } from '@/features/orders';
export type { Consultation } from '@/features/consultations';
export type { Prescription } from '@/features/prescriptions';

export type APIError = {
    status: number;
    code: string;
    message: string;
    details?: unknown;
};

export type PaginatedResponse<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};
