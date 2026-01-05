import { z } from 'zod';

export const paymentStatus = z.enum(['pending', 'paid', 'failed', 'refunded']);
export const orderStatus = z.enum([
    'pending',
    'accepted',
    'processing',
    'ready_for_dispatch',
    'in_transit',
    'delivered',
    'completed',
    'canceled',
    'failed_payment',
]);
export const prescriptionStatus = z.enum(['pending', 'approved', 'rejected', 'not_required']);

export const deliveryAddressSchema = z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().optional(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

export const checkoutSchema = z.object({
    cartId: z.string().uuid(),
    deliveryAddress: deliveryAddressSchema,
    pharmacyId: z.number().positive().optional(),
    paymentMethod: z.enum(['paystack', 'flutterwave']),
    prescriptionUploads: z.array(z.string().url()).optional(),
    notes: z.string().optional(),
});

export const cartItemSchema = z.object({
    productId: z.number().positive(),
    quantity: z.number().positive(),
});

export const updateCartItemSchema = z.object({
    quantity: z.number().positive(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type PaymentStatus = z.infer<typeof paymentStatus>;
export type OrderStatus = z.infer<typeof orderStatus>;
export type PrescriptionStatus = z.infer<typeof prescriptionStatus>;
