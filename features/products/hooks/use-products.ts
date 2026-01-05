import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/products.api';
import type { CreateProductInput, ProductFilterInput, UpdateProductInput } from '../schemas/product.schema';

export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: ProductFilterInput) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number) => [...productKeys.details(), id] as const,
};

export function useProducts(filters: ProductFilterInput, token?: string) {
    return useQuery({
        queryKey: productKeys.list(filters),
        queryFn: () => productsApi.getProducts(filters, token),
    });
}

export function useProduct(id: number, token?: string) {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => productsApi.getProduct(id, token),
        enabled: !!id,
    });
}

export function useCreateProduct(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProductInput) => productsApi.createProduct(data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
}

export function useUpdateProduct(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateProductInput }) =>
            productsApi.updateProduct(id, data, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
}

export function useDeleteProduct(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => productsApi.deleteProduct(id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
}
