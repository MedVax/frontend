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
import NextLink from "next/link";
import { Icon } from "@iconify/react";
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

export default function DoctorPrescriptionPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            medicalLicenseNumber: "",
            prescriptionFile: null,
            additionalNote: "",
            consent: false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            mobileNumber: Yup.string().required("Mobile number is required"),
            email: Yup.string().email("Invalid email address"),
            medicalLicenseNumber: Yup.string().required("Medical License Number is required"),
            prescriptionFile: Yup.mixed().required("Prescription file is required"),
            consent: Yup.boolean().oneOf(
                [true],
                "You must certify the prescription to proceed"
            ),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log("Form Values:", values);
                enqueueSnackbar("Prescription uploaded successfully!", {
                    variant: "success",
                });
                formik.resetForm();
            } catch (error) {
                enqueueSnackbar("Failed to upload prescription", { variant: "error" });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <Shell component="main" className="py-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                <div className="flex flex-col gap-2 max-w-sm">
                    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                        <MuiLink
                            component={NextLink}
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Home
                        </MuiLink>
                        <Typography color="text.secondary">Upload prescription</Typography>
                        <Typography color="text.primary">Doctor</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" className="font-bold!">
                        Doctor Prescription Form
                    </Typography>

                    <Typography variant="body1" className="text-gray-600 mb-5">
                        Kindly upload a patient prescription. As a licensed provider, please verify all details before submission.
                    </Typography>
                </div>

                <Button
                    variant="outlined"
                    onClick={() => router.push("/prescription/patient")}
                    sx={{
                        borderRadius: "50px",
                        textTransform: "none",
                        color: "text.primary",
                        borderColor: "grey.300",
                    }}
                >
                    Patient Form
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
                                disabled={isSubmitting}
                                placeholder="e.g. John"
                            />

                            <TextField
                                {...getFormikTextFieldProps(formik, "lastName")}
                                label="Last Name"
                                fullWidth
                                disabled={isSubmitting}
                                placeholder="e.g. Doe"
                            />
                        </div>

                        <TextField
                            {...getFormikTextFieldProps(formik, "mobileNumber")}
                            label="Mobile Number"
                            fullWidth
                            disabled={isSubmitting}
                            placeholder="Enter Phone Number"
                        />

                        <TextField
                            {...getFormikTextFieldProps(formik, "email")}
                            label="Email Address (Optional)"
                            type="email"
                            fullWidth
                            disabled={isSubmitting}
                            placeholder="johndoe@example.com"
                        />

                        <TextField
                            {...getFormikTextFieldProps(formik, "medicalLicenseNumber")}
                            label="Medical License Number"
                            fullWidth
                            disabled={isSubmitting}
                            placeholder="Enter License Number"
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
                            disabled={isSubmitting}
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
                                    I certify that I am a licensed healthcare professional and this prescription is authentic, issued in accordance with medical standards for the named patient.
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
                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={isSubmitting}
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "#4B5563",
                                "&:hover": { bgcolor: "#374151" },
                                borderRadius: "50px",
                                textTransform: "none",
                                py: 1.5,
                            }}
                        >
                            Proceed
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </Shell>
    );
}
