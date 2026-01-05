import { z } from 'zod';

export const consultationType = z.enum(['sexual_health', 'general', 'mental', 'maternal_health']);
export const consultationStatus = z.enum(['requested', 'accepted', 'completed', 'canceled']);

export const requestConsultationSchema = z.object({
    type: consultationType,
    preferredTime: z.string().datetime().optional(),
    symptomsDescription: z.string().min(10, 'Please provide more details about your symptoms'),
});

export const completeConsultationSchema = z.object({
    notes: z.string().min(1, 'Notes are required'),
    prescriptionUrl: z.string().url().optional(),
});

export type ConsultationType = z.infer<typeof consultationType>;
export type ConsultationStatus = z.infer<typeof consultationStatus>;
export type RequestConsultationInput = z.infer<typeof requestConsultationSchema>;
export type CompleteConsultationInput = z.infer<typeof completeConsultationSchema>;
