"use client";

import React from "react";
import { Shell } from "@/components/ui";
import {
    Typography,
    TextField,
    Button,
    Breadcrumbs,
    Link as MuiLink,
    Paper,
    Grid,
    IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { getFormikTextFieldProps } from "@/utils/formik";

export default function ContactPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            subject: Yup.string().required("Subject is required"),
            message: Yup.string().required("Message is required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            // Simulate API call
            setTimeout(() => {
                setSubmitting(false);
                enqueueSnackbar("Message sent successfully!", { variant: "success" });
                resetForm();
            }, 1500);
        },
    });

    return (
        <Shell component="main" className="py-12 bg-gray-50/30 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="mb-12">
                    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                        <MuiLink
                            component="button"
                            underline="hover"
                            color="inherit"
                            onClick={() => router.push("/")}
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Home
                        </MuiLink>
                        <Typography color="text.primary" className="font-semibold text-pink-600">Contact Us</Typography>
                    </Breadcrumbs>
                    <Typography variant="h3" component="h1" className="font-bold text-gray-900 tracking-tight mb-2">
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" className="text-gray-500 text-lg max-w-2xl">
                        Have questions about our services or need support? We're here to help. Reach out to us through any of the channels below.
                    </Typography>
                </div>

                <Grid container spacing={4}>

                    {/* Contact Information Column */}
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                        <div className="space-y-6">
                            {/* Contact Card */}
                            <Paper
                                elevation={0}
                                className="p-8 bg-white rounded-3xl border border-gray-100"
                                sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)" }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <Icon icon="solar:chat-round-call-bold" width={28} />
                                    </div>
                                    <Typography variant="h6" fontWeight="bold" className="text-gray-900">
                                        Contact Info
                                    </Typography>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-3">
                                        <Icon icon="solar:phone-calling-bold-duotone" width={24} className="text-gray-400 mt-1 shrink-0" />
                                        <div>
                                            <Typography variant="subtitle2" className="text-gray-900 font-semibold">Phone</Typography>
                                            <Typography variant="body2" className="text-gray-600">+234 812 383 4240</Typography>
                                            <Typography variant="caption" className="text-gray-500">Mon-Fri 9am-6pm</Typography>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Icon icon="solar:letter-bold-duotone" width={24} className="text-gray-400 mt-1 shrink-0" />
                                        <div>
                                            <Typography variant="subtitle2" className="text-gray-900 font-semibold">Email</Typography>
                                            <Typography variant="body2" className="text-gray-600">support@medvax.com</Typography>
                                            <Typography variant="caption" className="text-gray-500">24/7 Support</Typography>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Icon icon="solar:map-point-bold-duotone" width={24} className="text-gray-400 mt-1 shrink-0" />
                                        <div>
                                            <Typography variant="subtitle2" className="text-gray-900 font-semibold">Office</Typography>
                                            <Typography variant="body2" className="text-gray-600">
                                                Lagos, Nigeria
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </Paper>

                            {/* Social Media / Connect Card */}
                            <Paper
                                elevation={0}
                                className="p-8 text-white rounded-3xl border border-gray-100 relative overflow-hidden"
                                sx={{
                                    bgcolor: "#E91D74", // primary.main from theme
                                    boxShadow: "0px 10px 30px rgba(233, 29, 116, 0.3)"
                                }}
                            >
                                {/* Decorative circle */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                                <Typography variant="h6" fontWeight="bold" className="mb-2 relative z-10">
                                    Connect with us
                                </Typography>
                                <Typography variant="body2" className="text-pink-100 mb-6 relative z-10">
                                    Follow our journey and stay updated with the latest news.
                                </Typography>

                                <div className="flex gap-3 relative z-10">
                                    <IconButton
                                        component="a"
                                        href="https://facebook.com"
                                        target="_blank"
                                        className="bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110"
                                        size="small"
                                    >
                                        <Icon icon="ic:baseline-facebook" width={20} />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href="https://instagram.com"
                                        target="_blank"
                                        className="bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110"
                                        size="small"
                                    >
                                        <Icon icon="ri:instagram-fill" width={20} />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href="https://twitter.com"
                                        target="_blank"
                                        className="bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110"
                                        size="small"
                                    >
                                        <Icon icon="ri:twitter-x-fill" width={20} />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href="https://linkedin.com"
                                        target="_blank"
                                        className="bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110"
                                        size="small"
                                    >
                                        <Icon icon="ri:linkedin-fill" width={20} />
                                    </IconButton>
                                </div>
                            </Paper>
                        </div>
                    </Grid>

                    {/* Contact Form Column */}
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                        <Paper
                            elevation={0}
                            className="p-8 md:p-10 bg-white rounded-3xl border border-gray-100"
                            sx={{
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                            }}
                        >
                            <div className="mb-8">
                                <Typography variant="h5" fontWeight="bold" className="text-gray-900 mb-2">
                                    Send us a Message
                                </Typography>
                                <Typography variant="body1" className="text-gray-500">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </Typography>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            {...getFormikTextFieldProps(formik, "name")}
                                            label="Full Name"
                                            fullWidth
                                            placeholder="John Doe"
                                            InputProps={{ sx: { borderRadius: "16px" } }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            {...getFormikTextFieldProps(formik, "email")}
                                            label="Email Address"
                                            fullWidth
                                            placeholder="john@example.com"
                                            InputProps={{ sx: { borderRadius: "16px" } }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            {...getFormikTextFieldProps(formik, "subject")}
                                            label="Subject"
                                            fullWidth
                                            placeholder="How can we help?"
                                            InputProps={{ sx: { borderRadius: "16px" } }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            {...getFormikTextFieldProps(formik, "message")}
                                            label="Message"
                                            fullWidth
                                            multiline
                                            rows={6}
                                            placeholder="Tell us more about your inquiry..."
                                            InputProps={{ sx: { borderRadius: "16px" } }}
                                        />
                                    </Grid>
                                </Grid>

                                <div className="pt-4 flex justify-end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={formik.isSubmitting}
                                        endIcon={!formik.isSubmitting && <Icon icon="solar:plain-3-bold" />}
                                        sx={{
                                            borderRadius: "50px",
                                            textTransform: "none",
                                            px: 5,
                                            py: 1.5,
                                            fontSize: "1rem",
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
                                        {formik.isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Shell>
    );
}
