"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, Alert } from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { GuestGuard } from "@/components/auth/AuthGuard";
import userApi from "@/apis/user-api";
import { LoadingButton } from "@mui/lab";
import { getFormikTextFieldProps } from "@/utils/formik";
import PasswordTextField from "@/libs/mui/password-textfield";

export default function ResetPasswordPage() {
  return (
    <GuestGuard>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </GuestGuard>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [resetPasswordMutation, { isLoading }] =
    userApi.useUserResetPasswordMutation();

  const token = searchParams.get("token") || "";

  const formik = useFormik({
    initialValues: { newPassword: "", confirmNewPassword: "" },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmNewPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
    }),
    onSubmit: async (values) => {
      if (!token) {
        enqueueSnackbar("Invalid or missing reset token.", { variant: "error" });
        return;
      }
      try {
        await resetPasswordMutation({
          data: { token, newPassword: values.newPassword, confirmNewPassword: values.confirmNewPassword },
        }).unwrap();
        enqueueSnackbar("Password reset successfully!", { variant: "success" });
        router.push("/signin");
      } catch (err: unknown) {
        const error = err as { data?: { message?: string }; message?: string };
        enqueueSnackbar(
          error?.data?.message || error?.message || "Failed to reset password. Please try again.",
          { variant: "error" }
        );
      }
    },
  });

  if (!token) {
    return (
      <div>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Invalid or expired reset link. Please request a new one.
        </Alert>
        <Box className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            <Icon icon="material-symbols:arrow-back" width={18} height={18} />
            Request new reset link
          </Link>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" className="font-bold! mb-2">
        Reset your password
      </Typography>
      <Typography sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }} className="mb-2">
        Enter your new password below.
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 mt-10"
      >
        <PasswordTextField
          {...getFormikTextFieldProps(formik, "newPassword")}
          label="New Password"
          fullWidth
          disabled={isLoading}
          placeholder="Enter new password"
        />

        <PasswordTextField
          {...getFormikTextFieldProps(formik, "confirmNewPassword")}
          label="Confirm New Password"
          fullWidth
          disabled={isLoading}
          placeholder="Confirm new password"
        />

        <LoadingButton type="submit" fullWidth loading={isLoading} variant="contained" size="large">
          Reset Password
        </LoadingButton>
      </Box>

      <Box className="mt-8 text-center">
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          <Icon icon="material-symbols:arrow-back" width={18} height={18} />
          Back to sign in
        </Link>
      </Box>
    </div>
  );
}
