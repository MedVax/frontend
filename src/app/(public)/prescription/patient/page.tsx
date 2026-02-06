"use client";

import React, { useRef, useState } from "react";
import { Shell } from "@/components/ui";
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    // InputAdornment,
    Breadcrumbs,
    Link as MuiLink,
    Paper,
    Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { prescriptionApi, PrescriptionType } from "apis/prescription-api";
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
        <div onClick={() => fileInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center gap-3">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: "none" }}
            />

            {file ? (
                <div className="flex flex-col items-center gap-3 w-full">
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-sm">
                        <Icon icon="solar:file-check-bold" width={32} />
                    </div>
                    <div className="text-center">
                        <Typography variant="subtitle1" fontWeight="bold" className="text-gray-900">
                            {file.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                    </div>
                    <Button
                        size="small"
                        color="error"
                        variant="soft"
                        startIcon={<Icon icon="solar:trash-bin-bold" />}
                        onClick={handleClear}
                        sx={{ borderRadius: "12px", textTransform: "none", mt: 1, bgcolor: '#FEF2F2', color: '#EF4444' }}
                    >
                        Remove File
                    </Button>
                </div>
            ) : (
                <>
                    <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110 duration-300">
                        <Icon icon="solar:cloud-upload-bold" width={32} />
                    </div>
                    <div className="text-center">
                        <Typography variant="h6" fontWeight="bold" className="text-gray-800 mb-1">
                            Click to Upload Prescription
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                            JPG, PNG or PDF (Max 5MB)
                        </Typography>
                    </div>
                </>
            )}
            {isError && (
                <Typography variant="caption" color="error" className="mt-2 font-medium">
                    {formik.errors[name] as string}
                </Typography>
            )}
        </div>
    );
};

export default function PatientPrescriptionPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    /* eslint-disable no-console */
    const [createPrescription, { isLoading }] =
        prescriptionApi.useCreatePrescriptionMutation();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            patientLocation: "",
            prescriptionFile: null,
            additionalNote: "",
            consent: false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            mobileNumber: Yup.string().required("Mobile number is required"),
            email: Yup.string().email("Invalid email address"),
            patientLocation: Yup.string().required("Location is required"),
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
                    patientLocation: values.patientLocation,
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
        <Shell component="main" className="py-12 bg-gray-50/30 min-h-screen">
            {/* Breadcrumbs - Wider Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<div className="w-1 h-1 rounded-full bg-gray-300" />}
                    className="text-sm"
                >
                    <MuiLink
                        component="a"
                        underline="hover"
                        color="inherit"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/");
                        }}
                        className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                    >
                        <Icon icon="solar:home-smile-linear" width={14} />
                        Home
                    </MuiLink>
                    <MuiLink
                        underline="none"
                        color="inherit"
                        className="text-gray-500 cursor-default"
                    >
                        Prescriptions
                    </MuiLink>
                    <Typography color="primary.main" className="font-semibold text-sm">Patient Upload</Typography>
                </Breadcrumbs>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                    <div className="flex flex-col gap-2 max-w-lg">
                        <Typography variant="h3" className="font-bold text-gray-900 tracking-tight">
                            Upload Prescription
                        </Typography>

                        <Typography variant="body1" className="text-gray-500 text-lg">
                            Securely send us your prescription and we'll handle the rest.
                        </Typography>
                    </div>

                    <Button
                        variant="outlined"
                        onClick={() => router.push("/consultation")}
                        startIcon={<Icon icon="solar:stethoscope-bold" />}
                        sx={{
                            // Theme defaults
                            textTransform: "none",
                            color: "text.primary",
                            borderColor: "grey.200",
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            "&:hover": {
                                borderColor: "primary.main",
                                bgcolor: "primary.50",
                                color: "primary.main"
                            }
                        }}
                    >
                        Consult a Doctor
                    </Button>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-8">
                    {/* Patient Section */}
                    <Paper
                        elevation={0}
                        className="p-8 md:p-10 bg-white rounded-[24px] border border-gray-100/50"
                        sx={{
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                            "&:hover": {
                                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
                            }
                        }}
                    >
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Icon icon="solar:user-id-bold" width={28} />
                            </div>
                            <div>
                                <Typography variant="h6" fontWeight="800" className="text-gray-900">
                                    Personal Information
                                </Typography>
                                <Typography variant="caption" className="text-gray-500 text-sm">
                                    We need these details to process your request.
                                </Typography>
                            </div>
                        </div>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "firstName")}
                                    label="First Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. John"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "lastName")}
                                    label="Last Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. Doe"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "mobileNumber")}
                                    label="Mobile Number"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="Enter Phone Number"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "email")}
                                    label="Email Address (Optional)"
                                    type="email"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="johndoe@example.com"
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "patientLocation")}
                                    label="Delivery Location"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. 123 Main St, New York"
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Prescription Section */}
                    <Paper
                        elevation={0}
                        className="p-8 md:p-10 bg-white rounded-[24px] border border-gray-100/50"
                        sx={{
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                            "&:hover": {
                                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
                            }
                        }}
                    >
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                            <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
                                <Icon icon="solar:document-medicine-bold" width={28} />
                            </div>
                            <div>
                                <Typography variant="h6" fontWeight="800" className="text-gray-900">
                                    Prescription Details
                                </Typography>
                                <Typography variant="caption" className="text-gray-500 text-sm">
                                    Upload a clear image of your valid prescription.
                                </Typography>
                            </div>
                        </div>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12 }}>
                                <div className="group transition-all duration-300">
                                    <div className="relative border-2 border-dashed border-gray-200 rounded-[24px] p-8 hover:border-pink-400 hover:bg-pink-50/30 transition-all cursor-pointer text-center group-hover:shadow-sm">
                                        <FileUploadInput
                                            formik={formik}
                                            name="prescriptionFile"
                                            label="Upload Prescription File *"
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "additionalNote")}
                                    label="Additional Notes (Optional)"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    disabled={isLoading}
                                    placeholder="Any specific instructions for the pharmacist..."
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-[24px] border border-blue-100 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 shrink-0">
                            <Icon icon="solar:shield-check-bold" width={24} />
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="text-gray-900 mb-1">
                                Verification Required
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 leading-relaxed">
                                A valid Prescription must contain: date, patient&apos;s details, facility name/stamp, dosage, and prescriber signature.
                                <span className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1">
                                    View Sample
                                </span>
                            </Typography>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 pt-4">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="consent"
                                    checked={formik.values.consent}
                                    onChange={formik.handleChange}
                                    color="primary"
                                    sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                                />
                            }
                            label={
                                <Typography variant="body2" className="text-gray-600 text-sm">
                                    I confirm that the prescription uploaded is authentic, issued by a licensed professional, and I consent to its verification.
                                </Typography>
                            }
                            className="ml-1"
                        />
                        {formik.touched.consent && formik.errors.consent && (
                            <Typography variant="caption" color="error" className="ml-9 -mt-6 font-medium">
                                {formik.errors.consent}
                            </Typography>
                        )}

                        <div className="flex flex-col items-center gap-6">
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={isLoading}
                                startIcon={isLoading ? null : <Icon icon="solar:verified-check-bold" />}
                                sx={{
                                    // Theme default borderRadius: 84px
                                    textTransform: "none",
                                    py: 2,
                                    fontSize: "1.125rem",
                                    fontWeight: "700",
                                    bgcolor: "#2D3748",
                                    boxShadow: "0 10px 20px rgba(45, 55, 72, 0.15)",
                                    "&:hover": {
                                        bgcolor: "#1A202C",
                                        boxShadow: "0 15px 30px rgba(45, 55, 72, 0.25)",
                                        transform: "translateY(-2px)"
                                    },
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {isLoading ? "Securely Uploading..." : "Submit Prescription"}
                            </Button>

                            <div className="flex items-center gap-2 text-gray-400">
                                <Icon icon="solar:lock-password-bold" />
                                <Typography variant="caption" fontWeight="medium">
                                    256-bit SSL Secure Encryption
                                </Typography>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Shell>
    );
}
