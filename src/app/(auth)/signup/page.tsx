"use client";

import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <Container
      maxWidth="sm"
      className="flex items-center justify-center py-12"
    >
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
          Create an account
        </Typography>
        <Typography
          className="text-center mb-8"
          sx={{ color: "#6b7280", fontFamily: "var(--font-nunito)" }}
        >
          Join MedVax for a better healthcare experience
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" className="mb-6" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} className="space-y-5">
          <Box className="flex gap-4">
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="material-symbols:person-outline"
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
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

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
            helperText="At least 8 characters"
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

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    <Icon
                      icon={
                        showConfirmPassword
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
              mt: 2,
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
              "Create Account"
            )}
          </Button>
        </Box>

        <Divider className="my-8">
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
      </Paper>
    </Container>
  );
}

