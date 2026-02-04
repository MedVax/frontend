"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
  Divider,
  Skeleton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetUserProfileInfoQuery,
  useUpdateUserProfileInfoMutation,
  useUpdateUserPhotoMutation,
} from "@/apis/user-api";
import {
  useGetClientProfileQuery,
  useUpdateClientProfileMutation,
} from "@/apis/client-api";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthUser from "@/hooks/use-auth";
import { LoadingButton } from "@mui/lab";

const ClientProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const { data: userData, isLoading: userLoading } = useGetUserProfileInfoQuery();

<<<<<<< HEAD
  const clientProfileId = authUser?.user?.activeProfile?.userProfileClient;
=======
  const clientProfileId = authUser?.user?.activeProfile?.id;
>>>>>>> cf6dc32d857334ee6cac7cdfd122c7caf9696cee
  const { data: clientData, isLoading: clientLoading } = useGetClientProfileQuery(
    { path: { id: clientProfileId || "" } },
    { skip: !clientProfileId }
  );

  const [updateUserProfile] = useUpdateUserProfileInfoMutation();
  const [updateClientProfile] = useUpdateClientProfileMutation();
  const [updatePhoto, { isLoading: isUploadingPhoto }] = useUpdateUserPhotoMutation();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const user = userData?.data || authUser?.user;
  const clientProfile = clientData?.data;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    coverName: Yup.string(),
    referral: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      coverName: clientProfile?.coverName || "",
      referral: clientProfile?.referral || "",
      useCoverName: clientProfile?.useCoverName || false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Update client profile - this also updates user info
        if (user?.id) {
          await updateClientProfile({
            data: {
              id: String(user.activeProfile?.userProfileClient),
              firstName: values.firstName,
              lastName: values.lastName,
              coverName: values.coverName || undefined,
              referral: values.referral || undefined,
              useCoverName: values.useCoverName,
            },
          }).unwrap();

          // Update email and phone separately via user API
<<<<<<< HEAD
          // await updateUserProfile({
          //   data: {
          //     userId: user.id,
          //     email: values.email,
          //   },
          // }).unwrap();
=======
          await updateUserProfile({
            data: {
              userId: user.id,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              phoneNumber: values.phoneNumber,
            },
          }).unwrap();
>>>>>>> cf6dc32d857334ee6cac7cdfd122c7caf9696cee
        }

        enqueueSnackbar("Profile updated successfully", { variant: "success" });
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

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    try {
      await updatePhoto({ data: { file: photoFile } }).unwrap();
      enqueueSnackbar("Photo updated successfully", { variant: "success" });
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to update photo";
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
  };

  if (userLoading || clientLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Typography variant="h5" className="font-semibold">
        My Profile
      </Typography>

      {/* Profile Photo */}
      <Paper variant="outlined" className="p-6 bg-white!">
        <Typography variant="h6" className="font-semibold mb-4">
          Profile Photo
        </Typography>
        <Divider className="mb-4" />
        <div className="flex items-center gap-6">
          <Avatar
            src={photoPreview || user?.avatar || undefined}
            sx={{ width: 120, height: 120 }}
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <div className="space-y-2">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="photo-upload"
              type="file"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo-upload">
              <Button variant="outlined" component="span">
                Choose Photo
              </Button>
            </label>
            {photoFile && (
              <Button
                variant="contained"
                onClick={handlePhotoUpload}
                disabled={isUploadingPhoto}
              >
                {isUploadingPhoto ? "Uploading..." : "Upload"}
              </Button>
            )}
            <Typography variant="body2" color="text.secondary">
              JPG, PNG or GIF. Max size 2MB
            </Typography>
          </div>
        </div>
      </Paper>

      {/* Personal Information */}
      <Paper variant="outlined" className="p-6 bg-white!">
        <Typography variant="h6" className="font-semibold mb-4">
          Personal Information
        </Typography>
        <Divider className="mb-4" />

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && !!formik.errors.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && !!formik.errors.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            disabled
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />



          <Divider className="my-4" />

          <Typography variant="h6" className="font-semibold mb-4">
            Client Information
          </Typography>

          <TextField
            fullWidth
            label="Cover Name (Optional)"
            name="coverName"
            value={formik.values.coverName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText="A name to use instead of your real name for privacy"
          />

          <TextField
            fullWidth
            label="Referral Source (Optional)"
            name="referral"
            value={formik.values.referral}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText="How did you hear about us?"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.useCoverName}
                onChange={(e) =>
                  formik.setFieldValue("useCoverName", e.target.checked)
                }
              />
            }
            label="Use cover name instead of real name"
          />

          <LoadingButton
            type="submit"
            variant="contained"
            startIcon={<Iconify icon="solar:check-circle-linear" fontSize={20} />}
            loading={formik.isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </form>
      </Paper>
    </div>
  );
};

export default ClientProfile;

