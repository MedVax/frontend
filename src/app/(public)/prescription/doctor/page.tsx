"use client";

import React, { useRef } from "react";
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
    Grid,
    Paper,
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
                helperText={isError ? (formik.errors[name] as string) : "Only pdf, jpg, and jpeg files allowed"}
            />
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
        <Shell component="main" className="py-12 bg-gray-50/50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                    <div className="flex flex-col gap-2 max-w-sm">
                        <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                            <MuiLink
                                component="a"
                                underline="hover"
                                color="inherit"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/");
                                }}
                            >
                                Home
                            </MuiLink>
                            <Typography color="text.secondary">Upload prescription</Typography>
                            <Typography color="text.primary">Doctor</Typography>
                        </Breadcrumbs>

                        <Typography variant="h4" className="font-bold!">
                            Doctor Prescription Upload
                        </Typography>

                        <Typography variant="body1" className="text-gray-600 mb-5">
                            Securely upload patient prescriptions. Please ensure all details are accurate and the prescription is authenticated.
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
                        Book Consultation
                    </Button>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Patient Section */}
                    <Paper variant="outlined" className="p-6 md:p-8 bg-white rounded-xl shadow-sm border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Icon icon="solar:user-id-bold" width={24} />
                            </div>
                            <Typography variant="h6" fontWeight="bold">
                                Patient Details
                            </Typography>
                        </div>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "firstName")}
                                    label="First Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. John"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "lastName")}
                                    label="Last Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. Doe"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "mobileNumber")}
                                    label="Mobile Number"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="Enter Phone Number"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
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
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "patientLocation")}
                                    label="Location / Address"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. 123 Main St, Apartment 4B"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Prescription Section */}
                    <Paper variant="outlined" className="p-6 md:p-8 bg-white rounded-xl shadow-sm border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <Icon icon="solar:document-medicine-bold" width={24} />
                            </div>
                            <Typography variant="h6" fontWeight="bold">
                                Prescription Details
                            </Typography>
                        </div>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "drugName")}
                                    label="Drug Name (Optional)"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. Amoxicillin"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "dosage")}
                                    label="Dosage (Optional)"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="e.g. 500mg, Twice daily"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 md:p-6 transition-colors hover:bg-gray-100">
                                    <FileUploadInput
                                        formik={formik}
                                        name="prescriptionFile"
                                        label="Upload Prescription File *"
                                    />
                                </div>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "additionalNote")}
                                    label="Additional Notes / Instructions (Optional)"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    disabled={isLoading}
                                    placeholder="Any specific instructions for the pharmacist..."
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Prescriber Section */}
                    <Paper variant="outlined" className="p-6 md:p-8 bg-white rounded-xl shadow-sm border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Icon icon="solar:stethoscope-bold" width={24} />
                            </div>
                            <Typography variant="h6" fontWeight="bold">
                                Prescriber Information
                            </Typography>
                        </div>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "prescriberName")}
                                    label="Prescriber Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="Dr. Jane Smith"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "prescriberEmail")}
                                    label="Prescriber Email (Optional)"
                                    type="email"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="doctor@hospital.com"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "prescriberPhone")}
                                    label="Prescriber Phone (Optional)"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="+234..."
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "hospitalName")}
                                    label="Hospital / Clinic Name"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="General Hospital"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    {...getFormikTextFieldProps(formik, "prescriberLocation")}
                                    label="Hospital Location"
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder="City, State"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 flex items-start gap-3">
                        <Icon icon="solar:shield-warning-bold" className="text-pink-600 shrink-0 mt-0.5" width={20} />
                        <Typography variant="caption" className="text-gray-700 leading-snug">
                            Ensure the uploaded file is a valid prescription. Any falsified documents will result in immediate account suspension and potential legal action.
                        </Typography>
                    </div>

                    <div className="flex flex-col gap-6 pt-2">
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
                                <Typography variant="body2" className="text-gray-600">
                                    I verify that this prescription is authentic, current, and issued by a licensed healthcare professional.
                                </Typography>
                            }
                            className="ml-0"
                        />
                        {formik.touched.consent && formik.errors.consent && (
                            <Typography variant="caption" color="error" className="ml-8 -mt-4">
                                {formik.errors.consent}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isLoading}
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                py: 2,
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                bgcolor: "primary.main",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                "&:hover": {
                                    bgcolor: "primary.dark",
                                    boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            {isLoading ? "Uploading Prescription..." : "Submit Prescription"}
                        </Button>
                    </div>
                </form>
            </div>
        </Shell>
    );
}
