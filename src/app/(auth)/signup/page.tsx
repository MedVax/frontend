"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, TextField, InputAdornment, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { GuestGuard } from "@/components/auth/AuthGuard";
import PasswordTextField from "@/libs/mui/password-textfield";
import { LoadingButton } from "@mui/lab";
import { getFormikTextFieldProps } from "@/utils/formik";
import { authApi } from "@/apis/auth-api";
import userApi from "@/apis/user-api";

export default function SignupPage() {
  return (
    <GuestGuard>
      <SignupForm />
    </GuestGuard>
  );
}

function SignupForm() {
  const router = useRouter();
  const [signupMutation, { isLoading }] = authApi.useSignupMutation();
  const [getUserProfileInfoQuery] = userApi.useLazyGetUserProfileInfoQuery();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("First name is required")
        .trim()
        .min(2, "First name must be at least 2 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .trim()
        .min(2, "Last name must be at least 2 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address")
        .trim(),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .trim(),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .trim(),
    }),
    onSubmit: async (values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        await signupMutation({
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          },
        }).unwrap();

        await getUserProfileInfoQuery().unwrap();

        router.push("/");
      } catch (error: unknown) {
        const err = error as { defaultUserMessage?: string; message?: string };
        enqueueSnackbar(
          err?.defaultUserMessage || err?.message || "An error occurred",
          {
            variant: "error",
          }
        );
      }
    },
  });

  return (
    <div>
      <Typography variant="h4" className="font-bold! mb-2">
        Sign Up
      </Typography>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="mt-10">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4">
            <TextField
              {...getFormikTextFieldProps(formik, "firstName")}
              label="First Name"
              fullWidth
              disabled={isLoading}
              placeholder="John"
            />

            <TextField
              {...getFormikTextFieldProps(formik, "lastName")}
              label="Last Name"
              fullWidth
              disabled={isLoading}
              placeholder="Doe"
            />
          </div>

          <TextField
            {...getFormikTextFieldProps(formik, "email")}
            label="Email"
            type="email"
            fullWidth
            disabled={isLoading}
            placeholder="Enter email address"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="material-symbols:mail-outline"
                      width={20}
                      height={20}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <PasswordTextField
            {...getFormikTextFieldProps(
              formik,
              "password",
              "At least 8 characters"
            )}
            label="Password"
            fullWidth
            disabled={isLoading}
            placeholder="Enter your password"
          />

          <PasswordTextField
            {...getFormikTextFieldProps(formik, "confirmPassword")}
            label="Confirm Password"
            fullWidth
            disabled={isLoading}
            placeholder="Confirm your password"
          />
        </div>

        <div className="mt-4">
          <LoadingButton
            type="submit"
            fullWidth
            loading={isLoading}
            variant="contained"
            size="large"
          >
            Create Account
          </LoadingButton>
        </div>
      </form>

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
