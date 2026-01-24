"use client";

import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { GuestGuard } from "@/components/auth/AuthGuard";

export default function ForgotPasswordSuccessPage() {
  return (
    <GuestGuard>
      <ForgotPasswordSuccess />
    </GuestGuard>
  );
}

function ForgotPasswordSuccess() {
  return (
    <div>
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
      <Box className="flex flex-col gap-4 mt-4">
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
          <Button fullWidth variant="outlined">
            Resend Email
          </Button>
        </Link>
      </Box>

      {/* Help Text */}
      <Typography
        className="text-center pt-8"
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
    </div>
  );
}
