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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
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

export default function DoctorPrescriptionPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    /* eslint-disable no-console */
    const [createPrescription, { isLoading }] =
        prescriptionApi.useCreatePrescriptionMutation();

    const formik = useFormik({
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
                        Start uploading patient prescriptions securely. Ensure all details are accurate and verified.
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

            <div className="max-w-md mx-auto">
                <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">

                    {/* Patient Section */}
                    <div className="space-y-4">
                        <Typography variant="subtitle1" fontWeight="bold" className="text-gray-800 border-b pb-2">
                            Patient Details
                        </Typography>
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
                        <TextField
                            {...getFormikTextFieldProps(formik, "patientLocation")}
                            label="Location / Address"
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. 123 Main St"
                        />
                    </div>

                    {/* Prescription Section */}
                    <div className="space-y-4">
                        <Typography variant="subtitle1" fontWeight="bold" className="text-gray-800 border-b pb-2">
                            Prescription Details
                        </Typography>
                        <TextField
                            {...getFormikTextFieldProps(formik, "drugName")}
                            label="Drug Name (Optional)"
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. Amoxicillin"
                        />
                        <TextField
                            {...getFormikTextFieldProps(formik, "dosage")}
                            label="Dosage (Optional)"
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. 500mg"
                        />
                        <FileUploadInput
                            formik={formik}
                            name="prescriptionFile"
                            label="Prescription File *"
                        />
                        <TextField
                            {...getFormikTextFieldProps(formik, "additionalNote")}
                            label="Additional Notes (Optional)"
                            fullWidth
                            multiline
                            rows={3}
                            disabled={isLoading}
                            placeholder="Any specific instructions..."
                        />
                    </div>

                    {/* Prescriber Section */}
                    <div className="space-y-4">
                        <Typography variant="subtitle1" fontWeight="bold" className="text-gray-800 border-b pb-2">
                            Prescriber Information
                        </Typography>
                        <TextField
                            {...getFormikTextFieldProps(formik, "prescriberName")}
                            label="Prescriber Name"
                            fullWidth
                            disabled={isLoading}
                            placeholder="Dr. Jane Smith"
                        />
                        <TextField
                            {...getFormikTextFieldProps(formik, "prescriberEmail")}
                            label="Prescriber Email (Optional)"
                            type="email"
                            fullWidth
                            disabled={isLoading}
                            placeholder="doctor@hospital.com"
                        />
                        <TextField
                            {...getFormikTextFieldProps(formik, "prescriberPhone")}
                            label="Prescriber Phone (Optional)"
                            fullWidth
                            disabled={isLoading}
                            placeholder="Hospital or direct line"
                        />
                        <TextField
                            {...getFormikTextFieldProps(formik, "hospitalName")}
                            label="Hospital / Clinic Name (Optional)"
                            fullWidth
                            disabled={isLoading}
                            placeholder="General Hospital"
                        />
                        <TextField
                            {...getFormikTextFieldProps(formik, "prescriberLocation")}
                            label="Hospital Location (Optional)"
                            fullWidth
                            disabled={isLoading}
                            placeholder="City, State"
                        />
                    </div>

                    <div className="bg-pink-50/50 p-4 rounded-lg">
                        <Typography variant="caption" className="text-gray-600">
                            Ensure the uploaded file is a valid prescription. Any falsified documents will result in account suspension.
                        </Typography>
                    </div>

                    <div>
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
                                    I verify that this prescription is authentic and issued by a licensed healthcare professional.
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

                    <div className="mt-8 flex flex-col items-center gap-4">
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
                            {isLoading ? "Uploading..." : "Submit Prescription"}
                        </Button>
                    </div>
                </form>
            </div>
        </Shell>
    );
}
