"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { Nunito } from "next/font/google";
import { GuestGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/use-auth";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

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
  const [showPassword, setShowPassword] = useState(false);
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
          Welcome back
        </Typography>
        <Typography
          className="text-center mb-8"
          sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }}
        >
          Sign in to your account to continue
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

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="material-symbols:lock-outline"
                    width={20}
                    height={20}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "material-symbols:visibility-off"
                          : "material-symbols:visibility"
                      }
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Box className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Forgot password?
            </Link>
          </Box>

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
              "Sign In"
            )}
          </Button>
        </Box>

        <Divider className="my-8">
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
      </Paper>
    </Container>
  );
}

