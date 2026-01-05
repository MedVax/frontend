import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi, ordersApi } from '../api/orders.api';
import type { CartItemInput, CheckoutInput, UpdateCartItemInput } from '../schemas/order.schema';

export const orderKeys = {
    all: ['orders'] as const,
    lists: () => [...orderKeys.all, 'list'] as const,
    list: () => [...orderKeys.lists()] as const,
    details: () => [...orderKeys.all, 'detail'] as const,
    detail: (id: number) => [...orderKeys.details(), id] as const,
};

export const cartKeys = {
    all: ['cart'] as const,
    detail: () => [...cartKeys.all, 'detail'] as const,
};

export function useOrders(token: string) {
    return useQuery({
        queryKey: orderKeys.list(),
        queryFn: () => ordersApi.getOrders(token),
        enabled: !!token,
    });
}

export function useOrder(id: number, token: string) {
    return useQuery({
        queryKey: orderKeys.detail(id),
        queryFn: () => ordersApi.getOrder(id, token),
        enabled: !!id && !!token,
    });
}

export function useCart(token: string) {
    return useQuery({
        queryKey: cartKeys.detail(),
        queryFn: () => cartApi.getCart(token),
        enabled: !!token,
    });
}

export function useAddToCart(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CartItemInput) => cartApi.addItem(data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
        },
    });
}

export function useUpdateCartItem(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemInput }) =>
            cartApi.updateItem(itemId, data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
        },
    });
}

export function useRemoveFromCart(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) => cartApi.removeItem(itemId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
        },
    });
}

export function useCheckout(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CheckoutInput) => cartApi.checkout(data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        },
    });
}

export function useCancelOrder(token: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => ordersApi.cancelOrder(id, token),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        },
    });
}
