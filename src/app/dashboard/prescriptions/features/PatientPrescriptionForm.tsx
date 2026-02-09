"use client";

import React, { useRef } from "react";
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Paper,
    Divider,
    Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import { prescriptionApi, PrescriptionType } from "apis/prescription-api";
import { getFormikTextFieldProps } from "@/utils/formik";

const FileUploadInput = ({
    formik,
    name,
    label,
}: {
    formik: any;
    name: string;
    label: string;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const file = formik.values[name];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            formik.setFieldValue(name, event.currentTarget.files[0]);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        formik.setFieldValue(name, null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const isError = formik.touched[name] && Boolean(formik.errors[name]);

    return (
        <div onClick={() => fileInputRef.current?.click()}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: "none" }}
            />
            <TextField
                label={label}
                fullWidth
                value={file ? file.name : ""}
                placeholder="Upload Prescription File"
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            {file ? (
                                <Icon
                                    icon="mdi:close"
                                    className="cursor-pointer text-gray-500"
                                    onClick={handleClear}
                                />
                            ) : (
                                <Icon icon="mdi:tray-upload" className="text-gray-500" />
                            )}
                        </InputAdornment>
                    ),
                    sx: {
                        cursor: "pointer",
                        "& input": { cursor: "pointer" },
                    },
                }}
                error={isError}
                helperText={isError ? formik.errors[name] : "Only pdf, jpg, and jpeg files allowed"}
            />
        </div>
    );
};

export default function PatientPrescriptionForm() {
    const { enqueueSnackbar } = useSnackbar();
    const [createPrescription, { isLoading }] =
        prescriptionApi.useCreatePrescriptionMutation();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            prescriptionFile: null,
            additionalNote: "",
            consent: false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            mobileNumber: Yup.string().required("Mobile number is required"),
            email: Yup.string().email("Invalid email address"),
            prescriptionFile: Yup.mixed().required("Prescription file is required"),
            consent: Yup.boolean().oneOf(
                [true],
                "You must consent to the terms to proceed"
            ),
        }),
        onSubmit: async (values) => {
            try {
                const payload = {
                    file: values.prescriptionFile!,
                    prescriberType: PrescriptionType.PATIENT,
                    patientName: `${values.firstName} ${values.lastName}`,
                    patientPhone: values.mobileNumber,
                    patientEmail: values.email,
                    additionalNote: values.additionalNote,
                };

                await createPrescription({
                    data: payload,
                }).unwrap();

                enqueueSnackbar("Prescription uploaded successfully!", {
                    variant: "success",
                });
                formik.resetForm();
            } catch (error: any) {
                console.error("Upload error", error);
                enqueueSnackbar(error?.data?.message || "Failed to upload prescription", {
                    variant: "error",
                });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto">
            <Paper variant="outlined" className="p-8 bg-white!">
                <Typography variant="h5" className="font-bold mb-4 flex items-center gap-2">
                    <Icon icon="solar:document-medicine-linear" fontSize={24} />
                    Patient Information
                </Typography>
                <Divider className="mb-6" />

                <Alert severity="info" className="mb-6">
                    Upload your prescription below. Ensure all details are visible.
                </Alert>

                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <TextField
                            {...getFormikTextFieldProps(formik, "firstName")}
                            label="First Name"
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. John"
                        />

                        <TextField
                            {...getFormikTextFieldProps(formik, "lastName")}
                            label="Last Name"
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. Doe"
                        />
                    </div>

                    <TextField
                        {...getFormikTextFieldProps(formik, "mobileNumber")}
                        label="Mobile Number"
                        fullWidth
                        disabled={isLoading}
                        placeholder="Enter Phone Number"
                    />

                    <TextField
                        {...getFormikTextFieldProps(formik, "email")}
                        label="Email Address (Optional)"
                        type="email"
                        fullWidth
                        disabled={isLoading}
                        placeholder="johndoe@example.com"
                    />

                    <FileUploadInput
                        formik={formik}
                        name="prescriptionFile"
                        label="Prescription File *"
                    />

                    <TextField
                        {...getFormikTextFieldProps(formik, "additionalNote")}
                        label="Additional Note (Optional)"
                        fullWidth
                        multiline
                        rows={4}
                        disabled={isLoading}
                        placeholder="Any specific instructions for the pharmacist..."
                    />
                </div>

                <Divider className="my-6" />

                <div className="mb-4">
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="consent"
                                checked={formik.values.consent}
                                onChange={formik.handleChange}
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="body2" className="text-gray-600">
                                I consent to the terms and verify this document is authentic.
                            </Typography>
                        }
                        className="items-start -ml-2"
                    />
                    {formik.touched.consent && formik.errors.consent && (
                        <Typography variant="caption" color="error" className="ml-2 block mt-1">
                            {formik.errors.consent}
                        </Typography>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            px: 4,
                            py: 1.5
                        }}
                    >
                        {isLoading ? "Uploading..." : "Submit Prescription"}
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
