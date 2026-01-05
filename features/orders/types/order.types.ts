import type { OrderStatus, PaymentStatus, PrescriptionStatus } from '../schemas/order.schema';

export type DeliveryAddress = {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode?: string;
    phone: string;
};

export type OrderItem = {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
};

export type Order = {
    id: number;
    userId: number;
    pharmacyId: number;
    totalAmount: number;
    currency: string;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    deliveryInfo: DeliveryAddress;
    prescriptionStatus: PrescriptionStatus;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
};

export type CartItem = {
    id: string;
    productId: number;
    quantity: number;
    product?: {
        id: number;
        name: string;
        price: number;
        images: string[];
    };
};

export type Cart = {
    id: string;
    userId: number;
    items: CartItem[];
    totalAmount: number;
};

export type CheckoutResponse = {
    orderId: number;
    paymentUrl?: string;
};
