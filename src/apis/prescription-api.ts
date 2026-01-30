import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse, PaginationServerResponse } from "types/global";
import * as RtkqTag from "constants/data-tag";
import { objectToFormData } from "utils/object";

const TAG = "/prescriptions";

export enum PrescriptionType {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
}

export enum PrescriptionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Prescription {
  id: string;
  orderId?: string | null;
  userId?: string | null;
  uploadedBy: string;
  fileUrl: string;
  status: PrescriptionStatus;
  reviewedBy?: string | null;
  notes?: string | null;
  // Patient fields
  patientName?: string | null;
  patientLocation?: string | null;
  patientEmail?: string | null;
  patientPhone?: string | null;
  additionalNote?: string | null;
  // Doctor fields
  prescriberName?: string | null;
  prescriberEmail?: string | null;
  prescriberPhone?: string | null;
  prescriberHospital?: string | null;
  prescriberLocation?: string | null;
  hospitalName?: string | null;
  drugName?: string | null;
  dosage?: string | null;
  prescriberType?: PrescriptionType | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrescriptionRequest {
  file: File;
  orderId?: string;
  prescriberType: PrescriptionType;
  // Patient fields
  patientName?: string;
  patientLocation?: string;
  patientEmail?: string;
  patientPhone?: string;
  additionalNote?: string;
  // Doctor fields
  prescriberName?: string;
  prescriberEmail?: string;
  prescriberPhone?: string;
  prescriberHospital?: string;
  prescriberLocation?: string;
  hospitalName?: string;
  drugName?: string;
  dosage?: string;
}

export type PrescriptionResponse = ServerResponse<Prescription>;
export type PrescriptionsResponse = PaginationServerResponse<Prescription[]>;

export const prescriptionApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptions: builder.query<
      PrescriptionsResponse,
      QueryRequest<void, { skip?: number; take?: number }, void>
    >({
      query: ({ params, ...config }) => ({
        url: TAG,
        params: {
          skip: params?.skip || 0,
          take: params?.take || 20,
        },
        ...config,
      }),
      providesTags: ["PRESCRIPTION"],
    }),

    getPrescriptionById: builder.query<
      PrescriptionResponse,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: "PRESCRIPTION", id: path?.id }];
      },
    }),

    createPrescription: builder.mutation<
      PrescriptionResponse,
      QueryRequest<CreatePrescriptionRequest, void, void>
    >({
      query: ({ data, ...config }) => {
        if (!data) {
          throw new Error("Data is required for creating a prescription");
        }
        const formData = objectToFormData({
          file: data.file,
          prescriberType: data.prescriberType,
          ...(data.orderId && { orderId: data.orderId }),
          // Patient fields
          ...(data.patientName && { patientName: data.patientName }),
          ...(data.patientLocation && { patientLocation: data.patientLocation }),
          ...(data.patientEmail && { patientEmail: data.patientEmail }),
          ...(data.patientPhone && { patientPhone: data.patientPhone }),
          ...(data.additionalNote && { additionalNote: data.additionalNote }),
          // Doctor fields
          ...(data.prescriberName && { prescriberName: data.prescriberName }),
          ...(data.prescriberEmail && { prescriberEmail: data.prescriberEmail }),
          ...(data.prescriberPhone && { prescriberPhone: data.prescriberPhone }),
          ...(data.prescriberHospital && {
            prescriberHospital: data.prescriberHospital,
          }),
          ...(data.prescriberLocation && {
            prescriberLocation: data.prescriberLocation,
          }),
          ...(data.hospitalName && { hospitalName: data.hospitalName }),
          ...(data.drugName && { drugName: data.drugName }),
          ...(data.dosage && { dosage: data.dosage }),
        });

        return {
          url: TAG,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": undefined,
          },
          ...config,
        };
      },
      invalidatesTags: ["PRESCRIPTION"],
    }),

    deletePrescription: builder.mutation<
      ServerResponse<null>,
      QueryRequest<void, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/${path?.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: ["PRESCRIPTION"],
    }),
  }),
});

export const {
  useGetPrescriptionsQuery,
  useGetPrescriptionByIdQuery,
  useCreatePrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionApi;

