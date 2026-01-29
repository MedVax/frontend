import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import {
    CreatePrescriptionDto,
    PrescriptionResponse,
    PrescriptionsResponse,
} from "types/prescription";
import * as RtkqTag from "constants/data-tag";

import { objectToFormData } from "utils/object";

const TAG = "/prescriptions";

const prescriptionApi = medvaxApi.injectEndpoints({
    endpoints: (builder) => ({
        getPrescriptions: builder.query<
            PrescriptionsResponse,
            QueryRequest<void, { page?: number; limit?: number }, void>
        >({
            query: (config) => ({
                url: TAG,
                ...config,
            }),
            providesTags: [RtkqTag.PRESCRIPTION],
        }),

        getPrescriptionById: builder.query<
            PrescriptionResponse,
            QueryRequest<void, void, { id: string }>
        >({
            query: ({ path, ...config }) => ({
                url: `${TAG}/${path?.id}`,
                ...config,
            }),
            providesTags: (result, error, { path }) => [
                { type: RtkqTag.PRESCRIPTION, id: path?.id },
            ],
        }),


        uploadPrescription: builder.mutation<
            PrescriptionResponse,
            QueryRequest<CreatePrescriptionDto, void, void>
        >({
            query: ({ ...config }) => ({
                url: TAG,
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                data: objectToFormData(config?.data),
            }),
            invalidatesTags: [RtkqTag.PRESCRIPTION],
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
            invalidatesTags: [RtkqTag.PRESCRIPTION],
        }),
    }),
});

export const {
    useGetPrescriptionsQuery,
    useGetPrescriptionByIdQuery,
    useUploadPrescriptionMutation,
    useDeletePrescriptionMutation,
} = prescriptionApi;

export default prescriptionApi;
