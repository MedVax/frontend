import { apiClient } from '@/lib/api-client';
import type { CartItemInput, CheckoutInput, UpdateCartItemInput } from '../schemas/order.schema';
import type { Cart, CheckoutResponse, Order } from '../types/order.types';

export const ordersApi = {
    getOrders: (token: string) =>
        apiClient.get<Order[]>('/orders', { token }),

    getOrder: (id: number, token: string) =>
        apiClient.get<Order>(`/orders/${id}`, { token }),

    cancelOrder: (id: number, token: string) =>
        apiClient.post<Order>(`/orders/${id}/cancel`, undefined, { token }),

    resendInvoice: (id: number, token: string) =>
        apiClient.post<void>(`/orders/${id}/resend-invoice`, undefined, { token }),
};

export const cartApi = {
    getCart: (token: string) =>
        apiClient.get<Cart>('/cart', { token }),

    addItem: (data: CartItemInput, token: string) =>
        apiClient.post<Cart>('/cart/items', data, { token }),

    updateItem: (itemId: string, data: UpdateCartItemInput, token: string) =>
        apiClient.put<Cart>(`/cart/items/${itemId}`, data, { token }),

    removeItem: (itemId: string, token: string) =>
        apiClient.delete<Cart>(`/cart/items/${itemId}`, { token }),

    checkout: (data: CheckoutInput, token: string) =>
        apiClient.post<CheckoutResponse>('/checkout', data, { token }),
};
