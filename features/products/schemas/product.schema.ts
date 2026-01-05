import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    sku: z.string().min(1, 'SKU is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be positive'),
    currency: z.string().default('NGN'),
    requiresPrescription: z.boolean().default(false),
    category: z.string().min(1, 'Category is required'),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
});

export const productStockSchema = z.object({
    pharmacyId: z.number().positive(),
    quantity: z.number().nonnegative(),
});

export const createProductSchema = productSchema.extend({
    stock: z.array(productStockSchema).optional(),
});

export const updateProductSchema = productSchema.partial();

export const productFilterSchema = z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    page: z.number().positive().default(1),
    limit: z.number().positive().max(100).default(20),
    requiresPrescription: z.boolean().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductFilterInput = z.infer<typeof productFilterSchema>;
