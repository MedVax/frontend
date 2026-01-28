"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { GuestGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/use-auth";
import PasswordTextField from "@/libs/mui/password-textfield";
import { LoadingButton } from "@mui/lab";
import { getFormikTextFieldProps } from "@/utils/formik";
import { authApi } from "@/apis/auth-api";
import userApi from "@/apis/user-api";

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
  const [signinMutation, { isLoading }] = authApi.useSigninMutation();
  const [getUserProfileInfoQuery] = userApi.useLazyGetUserProfileInfoQuery();
  const { enqueueSnackbar } = useSnackbar();

  const returnUrl = searchParams.get("returnUrl") || "/";

  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address")
        .trim(),
      password: Yup.string().required("Password is required").trim(),
    }),
    onSubmit: async (values: {
      email: string;
      password: string;
      remember: boolean;
    }) => {
      try {
        await signinMutation({
          data: {
            email: values.email,
            password: values.password,
          },
        }).unwrap();

        await getUserProfileInfoQuery().unwrap();

        router.push(returnUrl);
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

  const handleChangeRememberMe = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    formik.setFieldValue(event.target.name, event.target.checked);
  };

  return (
    <div>
      {/* Title */}
      <Typography variant="h4" className="font-bold! mb-2">
        Sign In
      </Typography>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="mt-10">
        <div className="grid grid-cols-1 gap-4">
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
            className="mb-4"
          />

          <PasswordTextField
            {...getFormikTextFieldProps(formik, "password")}
            label="Password"
            fullWidth
            disabled={isLoading}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between pt-1 pb-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.remember}
                onChange={handleChangeRememberMe}
                name="remember"
                size="small"
              />
            }
            label="Remember me"
          />

          <Link
            href="/forgot-password"
            className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Forgot password?
          </Link>
        </div>

        <LoadingButton
          type="submit"
          fullWidth
          loading={isLoading}
          variant="contained"
          size="large"
        >
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
