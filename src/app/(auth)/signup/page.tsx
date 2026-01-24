"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Alert,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { GuestGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/use-auth";
import PasswordTextField from "@/libs/mui/password-textfield";
import { LoadingButton } from "@mui/lab";

export default function SignupPage() {
  return (
    <GuestGuard>
      <SignupForm />
    </GuestGuard>
  );
}

function SignupForm() {
  const { signup, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const result = await signup({
      firstName,
      lastName,
      email,
      password,
    });

    if (result.success) {
      enqueueSnackbar("Account created successfully!", { variant: "success" });
    } else {
      setError(result.error || "Failed to create account");
    }
  };

  return (
    <div>
      <Typography variant="h4" className="font-bold! mb-2">
        Sign Up
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" className="mb-6" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} className="space-y-8 mt-10">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4">
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              placeholder="John"
            />

            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              placeholder="Doe"
            />
          </div>

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
          />

          <PasswordTextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            helperText="At least 8 characters"
          />

          <PasswordTextField
            label="Confirm Password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            helperText="Passwords do not match"
          />
        </div>

        <LoadingButton type="submit" fullWidth loading={isLoading}>
          Create Account
        </LoadingButton>
      </Box>

      <Divider className="p-6">
        <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>or</Typography>
      </Divider>

      {/* Sign In Link */}
      <Typography
        className="text-center"
        sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }}
      >
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </Typography>
    </div>
  );
}
