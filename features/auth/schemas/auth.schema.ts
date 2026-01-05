import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)'),
});

export const requestOTPSchema = z.object({
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)'),
});

export const verifyOTPSchema = z.object({
    requestId: z.string().uuid(),
    otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type RequestOTPInput = z.infer<typeof requestOTPSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
