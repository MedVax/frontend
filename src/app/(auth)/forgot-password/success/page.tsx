"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Nunito } from "next/font/google";
import { GuestGuard } from "@/components/auth/AuthGuard";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

export default function ForgotPasswordSuccessPage() {
  return (
    <GuestGuard>
      <ForgotPasswordSuccess />
    </GuestGuard>
  );
}

function ForgotPasswordSuccess() {
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

        {/* Success Icon */}
        <Box className="flex justify-center mb-6">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              icon="material-symbols:check-circle"
              width={48}
              height={48}
              style={{ color: "#22c55e" }}
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
          Check your email
        </Typography>
        <Typography
          className="text-center mb-8"
          sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }}
        >
          We&apos;ve sent a password reset link to your email address. Please
          check your inbox and follow the instructions.
        </Typography>

        {/* Actions */}
        <Box className="space-y-4">
          <Link href="/signin" passHref>
            <Button
              fullWidth
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
              }}
            >
              Back to Sign In
            </Button>
          </Link>

          <Link href="/forgot-password" passHref>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#e5e7eb",
                color: "#6b7280",
                fontFamily: "var(--font-nunito)",
                fontWeight: 500,
                fontSize: 16,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#e91d74",
                  color: "#e91d74",
                  backgroundColor: "#fef1f8",
                },
              }}
            >
              Resend Email
            </Button>
          </Link>
        </Box>

        {/* Help Text */}
        <Typography
          className="text-center mt-8"
          sx={{
            color: "#9ca3af",
            fontSize: 14,
            fontFamily: "var(--font-nunito)",
          }}
        >
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <Link
            href="/forgot-password"
            className="text-pink-600 hover:text-pink-700 transition-colors"
          >
            try again
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

