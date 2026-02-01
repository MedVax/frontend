"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useUserChangePasswordMutation } from "@/apis/user-api";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthUser from "@/hooks/use-auth";
import PasswordTextField from "@/libs/mui/password-textfield";
import { getFormikTextFieldProps } from "@/utils/formik";

const Security = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [changePassword, { isLoading }] = useUserChangePasswordMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const authUser = useAuthUser();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await changePassword({
          data: {
            userId: authUser?.user?.id || 0,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          },
        }).unwrap();
        enqueueSnackbar("Password changed successfully", { variant: "success" });
        setShowSuccess(true);
        formik.resetForm();
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error: any) {
        enqueueSnackbar(error?.data?.message || "Failed to change password", {
          variant: "error",
        });
      }
    },
  });

  return (
    <div className="space-y-10">
      <Typography variant="h5" className="font-semibold">
        Security Settings
      </Typography>

      <Paper variant="outlined" className="p-6 bg-white!">
        <div className="flex items-center gap-3 mb-4">
          <Iconify icon="solar:lock-password-linear" fontSize={24} />
          <Typography variant="h6" className="font-semibold">
            Change Password
          </Typography>
        </div>
        <Divider className="mb-4" />

        {showSuccess && (
          <Alert severity="success" className="mb-4">
            Your password has been changed successfully.
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <PasswordTextField
            fullWidth
            type="password"
            label="Current Password"
            name="oldPassword"
            {...getFormikTextFieldProps(formik, "oldPassword")}
          />

          <PasswordTextField
            fullWidth
            type="password"
            label="New Password"
            name="newPassword"
            {...getFormikTextFieldProps(formik, "newPassword")}
          />

          <PasswordTextField
            fullWidth
            type="password"
            label="Confirm New Password"
            name="confirmPassword"
            {...getFormikTextFieldProps(formik, "confirmPassword")}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={<Iconify icon="solar:check-circle-linear" fontSize={20} />}
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </Paper>

      {/* <Paper variant="outlined" className="p-6 bg-white!">
        <div className="flex items-center gap-3 mb-4">
          <Iconify icon="solar:shield-check-linear" fontSize={24} />
          <Typography variant="h6" className="font-semibold">
            Two-Factor Authentication
          </Typography>
        </div>
        <Divider className="mb-4" />
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </Typography>
        <Button variant="outlined" disabled>
          Coming Soon
        </Button>
      </Paper> */}

      {/* <Paper variant="outlined" className="p-6 bg-white!">
        <div className="flex items-center gap-3 mb-4">
          <Iconify icon="solar:logout-2-linear" fontSize={24} />
          <Typography variant="h6" className="font-semibold">
            Active Sessions
          </Typography>
        </div>
        <Divider className="mb-4" />
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Manage your active sessions and sign out from devices you no longer use.
        </Typography>
        <Button variant="outlined" disabled>
          View Active Sessions
        </Button>
      </Paper> */}
    </div>
  );
};

export default Security;

