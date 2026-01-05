import { apiClient } from '@/lib/api-client';
import type { LoginInput, RequestOTPInput, SignupInput, VerifyOTPInput } from '../schemas/auth.schema';
import type { AuthResponse, OTPRequest } from '../types/auth.types';

export const authApi = {
    requestOTP: (data: RequestOTPInput) =>
        apiClient.post<OTPRequest>('/auth/request-otp', data),

    verifyOTP: (data: VerifyOTPInput) =>
        apiClient.post<AuthResponse>('/auth/verify-otp', data),

    login: (data: LoginInput) =>
        apiClient.post<AuthResponse>('/auth/login', data),

    signup: (data: SignupInput) =>
        apiClient.post<AuthResponse>('/auth/signup', data),

    refresh: (refreshToken: string) =>
        apiClient.post<AuthResponse>('/auth/refresh', { refreshToken }),

    googleAuth: (token: string) =>
        apiClient.post<AuthResponse>('/auth/google', { token }),
};
