import { apiClient } from '@/lib/api-client';
import type { CreateProductInput, ProductFilterInput, UpdateProductInput } from '../schemas/product.schema';
import type { Product, ProductListResponse } from '../types/product.types';

export const productsApi = {
    getProducts: (params: ProductFilterInput, token?: string) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) searchParams.append(key, String(value));
        });
        return apiClient.get<ProductListResponse>(`/products?${searchParams}`, { token });
    },

    getProduct: (id: number, token?: string) =>
        apiClient.get<Product>(`/products/${id}`, { token }),

    createProduct: (data: CreateProductInput, token: string) =>
        apiClient.post<Product>('/admin/products', data, { token }),

    updateProduct: (id: number, data: UpdateProductInput, token: string) =>
        apiClient.put<Product>(`/admin/products/${id}`, data, { token }),

    deleteProduct: (id: number, token: string) =>
        apiClient.delete<void>(`/admin/products/${id}`, { token }),
};
