"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function SigninPage() {
  return (
    <GuestGuard>
      <SigninForm />
    </GuestGuard>
  );
}

function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signin, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const returnUrl = searchParams.get("returnUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await signin({ email, password });

    if (result.success) {
      enqueueSnackbar("Signed in successfully!", { variant: "success" });
      router.push(returnUrl);
    } else {
      setError(result.error || "Failed to sign in");
    }
  };

  return (
    <div>
      {/* Title */}
      <Typography variant="h4" className="font-bold! mb-2">
        Sign
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" className="mb-6" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="grid grid-cols-1 gap-4">
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
            className="mb-4"
          />

          <PasswordTextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end pt-1 pb-8">
          <Link
            href="/forgot-password"
            className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Forgot password?
          </Link>
        </div>

        <LoadingButton type="submit" fullWidth loading={isLoading}>
          Sign In
        </LoadingButton>
      </form>

      <Divider className="p-6">
        <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>or</Typography>
      </Divider>

      {/* Sign Up Link */}
      <Typography
        className="text-center"
        sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
        >
          Sign up
        </Link>
      </Typography>
    </div>
  );
}
