import { z } from 'zod';

export const prescriptionStatusEnum = z.enum(['pending', 'approved', 'rejected']);

export const patientPrescriptionSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    location: z.string().min(1, 'Location is required'),
    email: z.string().email().optional(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    prescriptionFile: z.instanceof(File).refine(
        (file) => file.size <= 10 * 1024 * 1024,
        'File size must be less than 10MB'
    ).refine(
        (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
        'Only JPEG, PNG, and PDF files are allowed'
    ),
    additionalNotes: z.string().optional(),
});

export const doctorPrescriptionSchema = z.object({
    patientFullName: z.string().min(1, 'Patient full name is required'),
    patientEmail: z.string().email().optional(),
    patientPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    prescriberFullName: z.string().min(1, 'Prescriber full name is required'),
    prescriberEmail: z.string().email().optional(),
    prescriberPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    prescriberHospital: z.string().min(1, 'Hospital is required'),
    prescriberLocation: z.string().min(1, 'Location is required'),
    hospitalName: z.string().min(1, 'Hospital name is required'),
    drugName: z.string().min(1, 'Drug name is required'),
    dosage: z.string().min(1, 'Dosage is required'),
    prescriptionFile: z.instanceof(File).refine(
        (file) => file.size <= 10 * 1024 * 1024,
        'File size must be less than 10MB'
    ).refine(
        (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
        'Only JPEG, PNG, and PDF files are allowed'
    ),
    additionalNotes: z.string().optional(),
});

export const verifyPrescriptionSchema = z.object({
    status: prescriptionStatusEnum,
    notes: z.string().optional(),
});

export type PatientPrescriptionInput = z.infer<typeof patientPrescriptionSchema>;
export type DoctorPrescriptionInput = z.infer<typeof doctorPrescriptionSchema>;
export type VerifyPrescriptionInput = z.infer<typeof verifyPrescriptionSchema>;
export type PrescriptionStatusEnum = z.infer<typeof prescriptionStatusEnum>;
