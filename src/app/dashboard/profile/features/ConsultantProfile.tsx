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
  Chip,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetUserProfileInfoQuery,
  useUpdateUserProfileInfoMutation,
  useUpdateUserPhotoMutation,
} from "@/apis/user-api";
import {
  useGetConsultantProfileQuery,
  useUpdateConsultantProfileMutation,
} from "@/apis/consultant-api";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthUser from "@/hooks/use-auth";
import { getFormikTextFieldProps } from "@/utils/formik";
import { LoadingButton } from "@mui/lab";
import { Tooltip, IconButton } from "@mui/material";

const ConsultantProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const { data: userData, isLoading: userLoading } = useGetUserProfileInfoQuery();

  const consultantProfileId = authUser?.user?.activeProfile?.userProfileConsultant;
  const { data: consultantData, isLoading: consultantLoading } = useGetConsultantProfileQuery(
    { path: { id: consultantProfileId || "" } },
    { skip: !consultantProfileId }
  );

  const [updateUserProfile] = useUpdateUserProfileInfoMutation();
  const [updateConsultantProfile] = useUpdateConsultantProfileMutation();
  const [updatePhoto, { isLoading: isUploadingPhoto }] = useUpdateUserPhotoMutation();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [bioTab, setBioTab] = useState(0); // 0 = edit, 1 = preview
  const [expertiseInput, setExpertiseInput] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const user = userData?.data || authUser?.user;
  const consultantProfile = consultantData?.data;

  const handleShare = async () => {
    if (!consultantProfileId) {
      enqueueSnackbar("Profile not available for sharing", { variant: "error" });
      return;
    }

    try {
      setIsSharing(true);
      const profileUrl = typeof window !== "undefined" 
        ? `${window.location.origin}/consultants/${consultantProfileId}`
        : "";

      const name = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Consultant";
      const shareData = {
        title: `${name} - Consultant Profile`,
        text: `Check out my consultant profile on MedVax${consultantProfile?.jobTitle ? ` - ${consultantProfile.jobTitle}` : ""}`,
        url: profileUrl,
      };

      // Try Web Share API first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        enqueueSnackbar("Profile shared successfully!", { variant: "success" });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(profileUrl);
        enqueueSnackbar("Profile link copied to clipboard!", { variant: "success" });
      }
    } catch (error: any) {
      // User cancelled share or clipboard failed
      if (error.name !== "AbortError") {
        // Try fallback to clipboard if Web Share failed
        try {
          const profileUrl = typeof window !== "undefined" 
            ? `${window.location.origin}/consultants/${consultantProfileId}`
            : "";
          await navigator.clipboard.writeText(profileUrl);
          enqueueSnackbar("Profile link copied to clipboard!", { variant: "success" });
        } catch (clipboardError) {
          enqueueSnackbar("Failed to share profile. Please copy the URL manually.", {
            variant: "error",
          });
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    jobTitle: Yup.string(),
    bio: Yup.string(),
    rate: Yup.number().min(0, "Rate must be positive"),
    yearsOfExperience: Yup.number().min(0, "Years must be positive"),
    faith: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      jobTitle: consultantProfile?.jobTitle || "",
      bio: consultantProfile?.bio || "",
      rate: consultantProfile?.rate || 0,
      areaOfExpertise: consultantProfile?.areaOfExpertise || [],
      yearsOfExperience: consultantProfile?.yearsOfExperience || 0,
      faith: consultantProfile?.faith || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Update user profile
        await updateUserProfile({
          data: {
            userId: user?.id || 0,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        }).unwrap();

        // Update consultant profile
        if (consultantProfileId) {
          await updateConsultantProfile({
            data: {
              id: consultantProfileId,
              firstName: values.firstName,
              lastName: values.lastName,
              jobTitle: values.jobTitle || undefined,
              bio: values.bio || undefined,
              rate: values.rate || undefined,
              areaOfExpertise: values.areaOfExpertise.length > 0 ? values.areaOfExpertise : undefined,
              yearsOfExperience: values.yearsOfExperience || undefined,
              faith: values.faith || undefined,
            },
          }).unwrap();
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
      const err = error as { defaultUserMessage?: string; message?: string };
      enqueueSnackbar(
        err?.defaultUserMessage || err?.message || "An error occurred",
        {
          variant: "error",
        }
      );
    }
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim() && !formik.values.areaOfExpertise.includes(expertiseInput.trim())) {
      formik.setFieldValue("areaOfExpertise", [
        ...formik.values.areaOfExpertise,
        expertiseInput.trim(),
      ]);
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (expertise: string) => {
    formik.setFieldValue(
      "areaOfExpertise",
      formik.values.areaOfExpertise.filter((e) => e !== expertise)
    );
  };

  const renderMarkdownPreview = (text: string) => {
    // Simple markdown rendering - basic formatting
    const lines = text.split("\n");
    return (
      <div className="prose prose-sm max-w-none">
        {lines.map((line, idx) => {
          // Headers
          if (line.startsWith("# ")) {
            return (
              <h1 key={idx} className="text-2xl font-bold mt-4 mb-2">
                {line.substring(2)}
              </h1>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2 key={idx} className="text-xl font-bold mt-3 mb-2">
                {line.substring(3)}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-lg font-bold mt-2 mb-1">
                {line.substring(4)}
              </h3>
            );
          }
          // Bold
          const boldRegex = /\*\*(.*?)\*\*/g;
          let processedLine = line;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;
          while ((match = boldRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
              parts.push(line.substring(lastIndex, match.index));
            }
            parts.push(
              <strong key={`bold-${match.index}`}>{match[1]}</strong>
            );
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
          }
          // Italic
          const italicRegex = /\*(.*?)\*/g;
          const finalParts: React.ReactNode[] = [];
          parts.forEach((part, partIdx) => {
            if (typeof part === "string") {
              let partLastIndex = 0;
              let italicMatch;
              while ((italicMatch = italicRegex.exec(part)) !== null) {
                if (italicMatch.index > partLastIndex) {
                  finalParts.push(part.substring(partLastIndex, italicMatch.index));
                }
                finalParts.push(
                  <em key={`italic-${partIdx}-${italicMatch.index}`}>{italicMatch[1]}</em>
                );
                partLastIndex = italicMatch.index + italicMatch[0].length;
              }
              if (partLastIndex < part.length) {
                finalParts.push(part.substring(partLastIndex));
              }
            } else {
              finalParts.push(part);
            }
          });

          if (line.trim() === "") {
            return <br key={idx} />;
          }
          return (
            <p key={idx} className="mb-2">
              {finalParts.length > 0 ? finalParts : line}
            </p>
          );
        })}
      </div>
    );
  };

  if (userLoading || consultantLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <Typography variant="h5" className="font-semibold">
          My Profile
        </Typography>
        {consultantProfileId && (
          <Tooltip title="Share your public profile">
            <Button
              variant="outlined"
              onClick={handleShare}
              disabled={isSharing}
              startIcon={
                <Iconify 
                  icon={isSharing ? "solar:loading-circle-bold" : "solar:share-bold"} 
                  fontSize={20} 
                />
              }
            >
              {isSharing ? "Sharing..." : "Share Profile"}
            </Button>
          </Tooltip>
        )}
      </div>

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
                className="ml-1"
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
            name="email"
            type="email"
            label="Email"
            disabled
            {...getFormikTextFieldProps(formik, "email")}
          />



          <Divider className="my-4" />

          <Typography variant="h6" className="font-semibold mb-4">
            Consultant Information
          </Typography>

          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g., General Practitioner, Psychologist"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="Rate (NGN)"
              name="rate"
              type="number"
              value={formik.values.rate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rate && !!formik.errors.rate}
              helperText={formik.touched.rate && formik.errors.rate}
              InputProps={{
                startAdornment: <span className="mr-2">₦</span>,
              }}
            />

            <TextField
              fullWidth
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formik.values.yearsOfExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.yearsOfExperience && !!formik.errors.yearsOfExperience
              }
              helperText={
                formik.touched.yearsOfExperience && formik.errors.yearsOfExperience
              }
            />
          </div>

          <TextField
            fullWidth
            label="Faith (Optional)"
            name="faith"
            value={formik.values.faith}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g., Christian, Muslim, None"
          />

          {/* Area of Expertise */}
          <div>
            <Typography variant="body2" className="mb-2 font-medium">
              Areas of Expertise
            </Typography>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formik.values.areaOfExpertise.map((expertise, idx) => (
                <Chip
                  key={idx}
                  label={expertise}
                  onDelete={() => handleRemoveExpertise(expertise)}
                  color="primary"
                  variant="soft"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <TextField
                fullWidth
                size="small"
                placeholder="Add area of expertise"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddExpertise();
                  }
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddExpertise}
                disabled={!expertiseInput.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Bio with Markdown Editor */}
          <div>
            <Typography variant="body2" className="mb-2 font-medium">
              Bio (Markdown Supported)
            </Typography>
            <Tabs value={bioTab} onChange={(_, v) => setBioTab(v)} className="mb-2">
              <Tab label="Edit" />
              <Tab label="Preview" />
            </Tabs>
            {bioTab === 0 ? (
              <TextField
                fullWidth
                multiline
                rows={10}
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write your bio using Markdown syntax...&#10;&#10;Example:&#10;# About Me&#10;&#10;I am a **licensed** healthcare professional with *extensive* experience..."
                className="font-mono text-sm"
              />
            ) : (
              <Box
                className="border border-gray-300 rounded p-4 min-h-[250px] bg-gray-50"
                sx={{ minHeight: "250px" }}
              >
                {formik.values.bio ? (
                  renderMarkdownPreview(formik.values.bio)
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No bio content to preview
                  </Typography>
                )}
              </Box>
            )}
            <Typography variant="caption" color="text.secondary" className="mt-1 block">
              Supports Markdown: **bold**, *italic*, # headers, line breaks
            </Typography>
          </div>

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

export default ConsultantProfile;

