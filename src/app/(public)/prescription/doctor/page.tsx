"use client";

import React, { useRef } from "react";
import { Shell } from "@/components/ui";
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    // InputAdornment,
    Breadcrumbs,
    Link as MuiLink,
} from "@mui/material";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { prescriptionApi, PrescriptionType } from "apis/prescription-api";
import { getFormikTextFieldProps } from "@/utils/formik";

interface PrescriptionFormValues {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    patientLocation: string;
    drugName: string;
    dosage: string;
    prescriptionFile: File | null;
    additionalNote: string;
    prescriberName: string;
    prescriberEmail: string;
    prescriberPhone: string;
    hospitalName: string;
    prescriberLocation: string;
    consent: boolean;
}

const FileUploadInput = ({
    formik,
    name,
    label,
}: {
    formik: FormikProps<PrescriptionFormValues>;
    name: keyof PrescriptionFormValues;
    label: string;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const file = formik.values[name] as File | null;

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

export default function DoctorPrescriptionPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    /* eslint-disable no-console */
    const [createPrescription, { isLoading }] =
        prescriptionApi.useCreatePrescriptionMutation();

    const formik = useFormik<PrescriptionFormValues>({
        initialValues: {
            // Patient Info
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            patientLocation: "",

            // Prescription Info
            drugName: "",
            dosage: "",
            prescriptionFile: null,
            additionalNote: "",

            // Prescriber Info
            prescriberName: "",
            prescriberEmail: "",
            prescriberPhone: "",
            hospitalName: "",
            prescriberLocation: "",

            consent: false,
        },
        validationSchema: Yup.object({
            // Patient Info validations
            firstName: Yup.string().required("Patient first name is required"),
            lastName: Yup.string().required("Patient last name is required"),
            mobileNumber: Yup.string().required("Patient mobile number is required"),
            email: Yup.string().email("Invalid email address"),
            patientLocation: Yup.string().required("Patient location is required"),

            // Prescription Info validations
            drugName: Yup.string(), // Optional as per usually logic, strict if required
            dosage: Yup.string(),
            prescriptionFile: Yup.mixed().required("Prescription file is required"),

            // Prescriber Info validations
            prescriberName: Yup.string().required("Prescriber name is required"),
            prescriberEmail: Yup.string().email("Invalid email address"),
            prescriberPhone: Yup.string(),
            hospitalName: Yup.string(),
            prescriberLocation: Yup.string(),

            consent: Yup.boolean().oneOf(
                [true],
                "You must verify the authenticity of this prescription"
            ),
        }),
        onSubmit: async (values) => {
            try {
                const payload = {
                    file: values.prescriptionFile!,
                    prescriberType: PrescriptionType.DOCTOR,
                    // Patient Inputs
                    patientName: `${values.firstName} ${values.lastName}`,
                    patientPhone: values.mobileNumber,
                    patientEmail: values.email,
                    patientLocation: values.patientLocation,
                    additionalNote: values.additionalNote,

                    // Specific Prescription Inputs
                    drugName: values.drugName,
                    dosage: values.dosage,

                    // Prescriber Inputs
                    prescriberName: values.prescriberName,
                    prescriberEmail: values.prescriberEmail,
                    prescriberPhone: values.prescriberPhone,
                    prescriberHospital: values.hospitalName, // Mapping both for safety or preference
                    hospitalName: values.hospitalName,
                    prescriberLocation: values.prescriberLocation,
                };

                await createPrescription({
                    data: payload,
                }).unwrap();

                enqueueSnackbar("Doctor Prescription uploaded successfully!", {
                    variant: "success",
                });
                formik.resetForm();
            } catch (error) {
                console.error("Upload error", error);
                const errorMessage = (error as any)?.data?.message || "Failed to upload prescription";
                enqueueSnackbar(errorMessage, {
                    variant: "error",
                });
            }
        },
    });

    return (
        <Shell component="main" className="py-12 bg-gray-50/30 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                    <div className="flex flex-col gap-2 max-w-lg">
                        <Breadcrumbs aria-label="breadcrumb" className="mb-2">
                            <MuiLink
                                component="a"
                                underline="hover"
                                color="inherit"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/");
                                }}
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Home
                            </MuiLink>
                            <Typography color="text.secondary" className="font-medium">Prescriptions</Typography>
                            <Typography color="text.primary" className="font-semibold text-pink-600">Doctor Portal</Typography>
                        </Breadcrumbs>

                        <Typography variant="h3" className="font-bold text-gray-900 tracking-tight">
                            Submit Prescription
                        </Typography>

                        <Typography variant="body1" className="text-gray-500 text-lg">
                            For licensed healthcare providers to submit prescriptions directly.
                        </Typography>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-8">
                    {/* Doctor Details Section */}
                    <Paper
                        elevation={0}
                        className="p-8 md:p-10 bg-white rounded-3xl border border-gray-100/50"
                        sx={{
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                            "&:hover": {
                                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
                            }
                        }}
                    >
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Icon icon="solar:stethoscope-bold" width={28} />
                            </div>
                            <div>
                                <Typography variant="h6" fontWeight="800" className="text-gray-900">
                                    Provider Details
                                </Typography>
                                <Typography variant="caption" className="text-gray-500 text-sm">
                                    Your professional information for verification.
                                </Typography>
                            </div>
                        </div>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "doctorName")}
                                    label="Doctor's Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="Dr. Start Lastname"
                                    InputProps={{ sx: { borderRadius: "16px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "hospitalName")}
                                    label="Hospital / Clinic Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. City General Hospital"
                                    InputProps={{ sx: { borderRadius: "16px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "doctorPhone")}
                                    label="Contact Number"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="Official Phone Number"
                                    InputProps={{ sx: { borderRadius: "16px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "doctorEmail")}
                                    label="Official Email (Optional)"
                                    type="email"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="dr.name@hospital.com"
                                    InputProps={{ sx: { borderRadius: "16px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "doctorAddress")}
                                    label="Practice Address"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="Full address of the medical facility"
                                    InputProps={{ sx: { borderRadius: "16px" } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Prescription File Section */}
                    <Paper
                        elevation={0}
                        className="p-8 md:p-10 bg-white rounded-3xl border border-gray-100/50"
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
                                    Prescription Document
                                </Typography>
                                <Typography variant="caption" className="text-gray-500 text-sm">
                                    Upload the signed prescription.
                                </Typography>
                            </div>
                        </div>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12 }}>
                                <div className="group transition-all duration-300">
                                    <div className="relative border-2 border-dashed border-gray-200 rounded-3xl p-8 hover:border-pink-400 hover:bg-pink-50/30 transition-all cursor-pointer text-center group-hover:shadow-sm">
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
                                    label="Clinical Notes (Optional)"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    disabled={isLoading}
                                    placeholder="Dosage instructions, contraindications, etc..."
                                    InputProps={{ sx: { borderRadius: "16px" } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className="bg-linear-to-r from-indigo-50 to-blue-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600 shrink-0">
                            <Icon icon="solar:shield-check-bold" width={24} />
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="text-gray-900 mb-1">
                                Professional Declaration
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 leading-relaxed">
                                By submitting this prescription, you declare that you are a licensed healthcare professional authorized to prescribe medication.
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
                                    I certify that this prescription is authentic, accurate, and issued in accordance with applicable laws and regulations.
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
                                    borderRadius: "50px",
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
                                {isLoading ? "Processing..." : "Submit Prescription"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Shell>
    );
}
