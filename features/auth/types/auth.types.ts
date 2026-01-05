export type UserRole = 'user' | 'admin' | 'pharmacist' | 'clinician' | 'therapist' | 'delivery';

export type User = {
    id: number;
    phone: string;
    email: string | null;
    name: string;
    role: UserRole;
    metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
};

export type OTPRequest = {
    requestId: string;
    expiresIn: number;
};
