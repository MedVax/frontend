"use client";

import React, { useRef, useState } from "react";
import { Shell } from "@/components/ui";
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Breadcrumbs,
    Link as MuiLink,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import prescriptionApi from "apis/prescription-api";
import { LoadingButton } from "@mui/lab";
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

export default function PatientPrescriptionPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    /* eslint-disable no-console */
    const [uploadPrescription, { isLoading }] =
        prescriptionApi.useUploadPrescriptionMutation();

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
                const payload: any = {
                    file: values.prescriptionFile,
                    notes: values.additionalNote,
                    // Backend does not currently accept firstName/lastName/mobile/email in CreatePrescriptionDto
                    // "POST /prescriptions with { fileUrl, notes }"
                };

                // Append user details to notes for context if not supported directly
                const userDetails = `\n\nPatient Details:\nName: ${values.firstName} ${values.lastName}\nMobile: ${values.mobileNumber}\nEmail: ${values.email}`;
                payload.notes = (payload.notes || "") + userDetails;

                await uploadPrescription({
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
        <Shell component="main" className="py-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                <div className="flex flex-col gap-2 max-w-sm">
                    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                        <MuiLink
                            component="a"
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Home
                        </MuiLink>
                        <Typography color="text.secondary">Upload prescription</Typography>
                        <Typography color="text.primary">Patient</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" className="font-bold!">
                        Patient Prescription Form
                    </Typography>

                    <Typography variant="body1" className="text-gray-600 mb-5">
                        Kindly upload a prescription from a licensed healthcare provider, and we will process your medication request immediately.
                    </Typography>
                </div>

                <Button
                    variant="outlined"
                    onClick={() => router.push("/consultation")}
                    sx={{
                        borderRadius: "50px",
                        textTransform: "none",
                        color: "text.primary",
                        borderColor: "grey.300",
                    }}
                >
                    Apply a doctor
                </Button>
            </div>
            <div className="max-w-md mx-auto">

                <form onSubmit={formik.handleSubmit} className="mt-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-4">
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
                            placeholder=""
                        />
                    </div>

                    <div className="bg-pink-50/50 p-4 rounded-lg my-6">
                        <Typography variant="body2" className="text-gray-600">
                            A valid Prescription should contain: date of prescription,
                            patient&apos;s details, facility name/stamp, dosage and prescriber
                            (Doctor).{" "}
                            <span className="text-pink-600 font-semibold cursor-pointer">
                                See Sample
                            </span>
                        </Typography>
                    </div>

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
                                <Typography variant="caption" className="text-gray-600">
                                    By uploading this prescription, you consent to our team reviewing and verifying the document for the purpose of fulfilling your medication request. You confirm that the prescription is authentic, issued by a licensed healthcare professional, and intended for you or someone under your care.
                                </Typography>
                            }
                            className="items-start -ml-2"
                            sx={{
                                "& .MuiCheckbox-root": {
                                    paddingTop: "0px",
                                },
                            }}
                        />
                        {formik.touched.consent && formik.errors.consent && (
                            <Typography variant="caption" color="error" className="ml-2 block mt-1">
                                {formik.errors.consent}
                            </Typography>
                        )}
                    </div>

                    <div className="mt-28 flex flex-col items-center">
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isLoading}
                            sx={{
                                bgcolor: "#4B5563",
                                "&:hover": { bgcolor: "#374151" },
                                borderRadius: "50px",
                                textTransform: "none",
                                py: 1.5,
                            }}
                        >
                            {isLoading ? "Uploading..." : "Proceed"}
                        </Button>

                        <Typography variant="caption" className="text-gray-500 my-4">
                            Don&apos;t have a prescription?
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={() => router.push("/consultation")}
                            sx={{
                                borderRadius: "50px",
                                textTransform: "none",
                                py: 1.5,
                                bgcolor: "#E91E63",
                                "&:hover": { bgcolor: "#D81B60" },
                            }}
                        >
                            Book Consultation
                        </Button>
                    </div>
                </form>
            </div>
        </Shell>
    );
}
