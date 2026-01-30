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

// Helper component for the custom file input
const FileUploadInput = ({
    formik,
    name,
}: {
    formik: any;
    name: string;
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
                label=""
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
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
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
                    prescriberType: PrescriptionType.DOCTOR,
                    patientName: `${values.firstName} ${values.lastName}`,
                    patientPhone: values.mobileNumber,
                    patientEmail: values.email,
                    additionalNote: values.additionalNote,
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
                <div>
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
                        <Typography color="text.primary">Upload prescription</Typography>
                        <Typography color="text.primary">Doctor</Typography>
                    </Breadcrumbs>
                    <Typography variant="h3" className="font-bold">
                        Doctor Prescription Upload
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

            <Typography variant="body1" className="text-gray-600 mb-10 text-sm max-w-3xl">
                Upload a valid prescription issued by a licensed doctor. Ensure the patient details and medication information are clearly visible.
            </Typography>

            <form onSubmit={formik.handleSubmit} className="max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-1">
                        <Typography variant="subtitle2" className="mb-1">
                            Patient First Name
                        </Typography>
                        <TextField
                            {...getFormikTextFieldProps(formik, "firstName")}
                            label=""
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. John"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Typography variant="subtitle2" className="mb-1">
                            Patient Last Name
                        </Typography>
                        <TextField
                            {...getFormikTextFieldProps(formik, "lastName")}
                            label=""
                            fullWidth
                            disabled={isLoading}
                            placeholder="e.g. Doe"
                        />
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-1">
                    <Typography variant="subtitle2" className="mb-1">
                        Patient Mobile Number
                    </Typography>
                    <TextField
                        {...getFormikTextFieldProps(formik, "mobileNumber")}
                        label=""
                        fullWidth
                        disabled={isLoading}
                        placeholder="Enter Phone Number"
                    />
                </div>

                <div className="mb-6 flex flex-col gap-1">
                    <Typography variant="subtitle2" className="mb-1">
                        Patient Email Address (Optional)
                    </Typography>
                    <TextField
                        {...getFormikTextFieldProps(formik, "email")}
                        label=""
                        type="email"
                        fullWidth
                        disabled={isLoading}
                        placeholder="johndoe@example.com"
                    />
                </div>

                <div className="mb-6 flex flex-col gap-1">
                    <Typography variant="subtitle2" className="mb-1">
                        Prescription File{" "}
                        <span className="text-pink-600">
                            (only pdf, jpg, and jpeg files allowed) *
                        </span>
                    </Typography>
                    <FileUploadInput formik={formik} name="prescriptionFile" />
                </div>

                <div className="mb-6 flex flex-col gap-1">
                    <Typography variant="subtitle2" className="mb-1">
                        Doctor's Notes (Optional)
                    </Typography>
                    <TextField
                        {...getFormikTextFieldProps(formik, "additionalNote")}
                        label=""
                        fullWidth
                        multiline
                        rows={4}
                        disabled={isLoading}
                        placeholder="Any specific instructions..."
                    />
                </div>

                <div className="bg-pink-50/50 p-4 rounded-lg mb-6">
                    <Typography variant="caption" className="text-gray-600">
                        Ensure the uploaded file is a valid prescription. Any falsified documents will result in account suspension.
                    </Typography>
                </div>

                <div className="mb-8">
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
                            <Typography variant="body2" className="text-gray-600 text-sm">
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
                        <Typography variant="caption" color="error" className="ml-2">
                            {formik.errors.consent}
                        </Typography>
                    )}
                </div>

                <div className="flex flex-col gap-4 max-w-md mx-auto">
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
        </Shell>
    );
}
