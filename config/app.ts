export const APP_CONFIG = {
    name: 'MedVax',
    description: "As a full-service pharmacy and healthcare solutions provider, we connect individuals, pharmacies, and healthcare providers to deliver quality healthcare services.",
    defaultPageSize: 20,
    maxFileUploadSize: 10 * 1024 * 1024, // 10MB
    supportedImageTypes: ['image/jpeg', 'image/png'],
    supportedDocumentTypes: ['application/pdf'],
    otpLength: 6,
    otpExpiryMinutes: 5,
} as const;

export const PAYMENT_PROVIDERS = {
    PAYSTACK: 'paystack',
    FLUTTERWAVE: 'flutterwave',
} as const;

export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    PHARMACIST: 'pharmacist',
    CLINICIAN: 'clinician',
    THERAPIST: 'therapist',
    DELIVERY: 'delivery',
} as const;
