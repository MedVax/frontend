"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { GuestGuard } from "@/components/auth/AuthGuard";
import userApi from "@/apis/user-api";
import { LoadingButton } from "@mui/lab";

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <ForgotPasswordForm />
    </GuestGuard>
  );
}

function ForgotPasswordForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [forgotPasswordMutation, { isLoading }] =
    userApi.useUserForgotPasswordMutation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await forgotPasswordMutation({ data: { email } }).unwrap();
      enqueueSnackbar("Password reset email sent!", { variant: "success" });
      router.push("/forgot-password/success");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setError(
        error?.data?.message || "Failed to send reset email. Please try again."
      );
    }
  };

  return (
    <div>
      {/* Title */}
      <Typography variant="h4" className="font-bold! mb-2">
        Forgot your password?
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" className="mb-6" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 mt-10"
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="john.doe@example.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  icon="material-symbols:mail-outline"
                  width={20}
                  height={20}
                />
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" fullWidth loading={isLoading}>
          Send Reset Link
        </LoadingButton>
      </Box>

      {/* Back to Sign In Link */}
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
