"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { Nunito } from "next/font/google";
import { GuestGuard } from "@/components/auth/AuthGuard";
import userApi from "@/apis/user-api";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

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
    <Container maxWidth="sm" className="flex items-center justify-center py-12">
      <Paper
        elevation={0}
        className={`${nunito.variable} w-full p-8 md:p-12`}
        sx={{
          borderRadius: 4,
          backgroundColor: "white",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Logo */}
        <Box className="flex items-center justify-center gap-2 mb-8">
          <Box
            component="img"
            src="/logo.svg"
            alt="MedVax Logo"
            sx={{ width: 32, height: 37 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <Typography
            sx={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 800,
              fontSize: 28,
              color: "#111827",
            }}
          >
            MedVax
          </Typography>
        </Box>

        {/* Icon */}
        <Box className="flex justify-center mb-6">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#fef1f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              icon="material-symbols:lock-reset"
              width={32}
              height={32}
              style={{ color: "#e91d74" }}
            />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          className="text-center mb-2"
          sx={{
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Forgot your password?
        </Typography>
        <Typography
          className="text-center mb-8"
          sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }}
        >
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" className="mb-6" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{
              backgroundColor: "#e91d74",
              color: "white",
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: 16,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#c2185b",
              },
              "&:disabled": {
                backgroundColor: "#f5a0c0",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Send Reset Link"
            )}
          </Button>
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
      </Paper>
    </Container>
  );
}
