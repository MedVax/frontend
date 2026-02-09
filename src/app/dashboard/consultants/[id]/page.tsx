"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  Skeleton,
  Alert,
  Divider,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetConsultantByIdQuery,
  useAssignConsultantMutation,
} from "@/apis/consultant-api";
import { useGetClientProfileByUserQuery } from "@/apis/client-api";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";
import Link from "next/link";
import { Star, Star2 } from "@solar-icons/react";
import { Icon } from "@mui/material";

const ConsultantDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();

  const consultantId = params?.id as string;
  const isConsultant = authUser?.user?.activeProfile?.type === "CONSULTANT";
  const activeProfileId = authUser?.user?.activeProfile?.id;
  const isClient = authUser?.user?.activeProfile?.type === "CLIENT";

  const { data, isLoading } = useGetConsultantByIdQuery(
    { path: { id: consultantId } },
    { skip: !consultantId }
  );
  const { data: clientProfileData } = useGetClientProfileByUserQuery(
    { path: { clientProfileId: activeProfileId as string } },
    { skip: !isClient }
  );

  const consultant = data?.data;
  const assignedConsultant = clientProfileData?.data?.userProfileConsultant;
  const hasAssignedConsultant = !!assignedConsultant;
  const isCurrentConsultantAssigned = assignedConsultant?.id === consultantId;
  const isOwnProfile = isConsultant && activeProfileId === consultantId;
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const handleAssignClick = () => {
    setAssignDialogOpen(true);
  };

  const handleShare = () => {
    const publicUrl = `${window.location.origin}/consultants/${consultantId}`;
    if (navigator.share) {
      navigator.share({
        title: `${consultant?.userProfile?.user?.firstName} ${consultant?.userProfile?.user?.lastName} - Consultant Profile`,
        text: `Check out this consultant profile on MedVax`,
        url: publicUrl,
      });
    } else {
      navigator.clipboard.writeText(publicUrl);
      enqueueSnackbar("Profile link copied to clipboard", { variant: "success" });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={300} className="rounded-xl" />
        <Skeleton variant="rectangular" height={400} className="rounded-xl" />
      </div>
    );
  }

  if (!consultant) {
    return (
      <Alert severity="error">
        Consultant not found. <Link href="/dashboard/consultants">Go back</Link>
      </Alert>
    );
  }

  const user = consultant.userProfile?.user;
  const avatar = user?.avatar;
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const expertise = consultant.areaOfExpertise || [];
  const rate = consultant.rate;
  const yearsOfExperience = consultant.yearsOfExperience;
  const rating = consultant.rating;

  // Simple markdown rendering for bio
  const renderBio = (bio: string) => {
    const lines = bio.split("\n");
    return (
      <div className="prose prose-lg max-w-none">
        {lines.map((line, idx) => {
          if (line.startsWith("# ")) {
            return (
              <h1 key={idx} className="text-3xl font-bold mt-6 mb-3">
                {line.substring(2)}
              </h1>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2 key={idx} className="text-2xl font-bold mt-5 mb-2">
                {line.substring(3)}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-xl font-bold mt-4 mb-2">
                {line.substring(4)}
              </h3>
            );
          }
          const boldRegex = /\*\*(.*?)\*\*/g;
          const italicRegex = /\*(.*?)\*/g;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;

          while ((match = boldRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
              parts.push(line.substring(lastIndex, match.index));
            }
            parts.push(
              <strong key={`bold-${match.index}`} className="font-semibold">
                {match[1]}
              </strong>
            );
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
          }

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
                  <em key={`italic-${partIdx}-${italicMatch.index}`} className="italic">
                    {italicMatch[1]}
                  </em>
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
            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
              {finalParts.length > 0 ? finalParts : line}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button
          variant="outlined"
          startIcon={<Iconify icon="solar:arrow-left-linear" fontSize={20} />}
          component={Link}
          href="/dashboard/consultants"
        >
          Back to Consultants
        </Button>
        <div className="flex gap-2">
          {isOwnProfile && (
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:external-link-linear" fontSize={20} />}
              component={Link}
              href={`/consultants/${consultantId}`}
              target="_blank"
            >
              View Public Profile
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:share-linear" fontSize={20} />}
            onClick={handleShare}
          >
            Share
          </Button>
          {activeProfileId && !isConsultant && (
            <>
              {isCurrentConsultantAssigned ? (
                <Button
                  variant="contained"
                  component={Link}
                  href={`/consultant/${consultantId}/book`}
                  startIcon={<Iconify icon="solar:calendar-add-outline" fontSize={20} />}
                >
                  Book
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleAssignClick}
                >
                  Assign Consultant
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Hero Card */}
      <Paper
        variant="outlined"
        className="p-8 bg-linear-to-r from-primary-main to-primary-dark text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <Avatar
            src={avatar || undefined}
            sx={{
              width: { xs: 120, md: 160 },
              height: { xs: 120, md: 160 },
              border: "4px solid white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <Typography variant="h3" className="font-bold mb-2 text-white">
              {name || "Consultant"}
            </Typography>
            {consultant.jobTitle && (
              <Typography variant="h5" className="mb-4 opacity-90">
                {consultant.jobTitle}
              </Typography>
            )}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {rating && (
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Icon fontSize="small" sx={{ color: "white" }}>
                    <Star />
                  </Icon>
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    {rating.toFixed(1)} Rating
                  </Typography>
                </div>
              )}
              {yearsOfExperience && (
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Icon fontSize="small" sx={{ color: "white" }}>
                    <Star2 />
                  </Icon>
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    {yearsOfExperience} Years Experience
                  </Typography>
                </div>
              )}
              {consultant.hasSetAvailability && (
                <Chip
                  label="Available"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        {rate && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card className="h-full hover:shadow-lg transition-shadow bg-white!">
              <CardContent className="text-center p-6">
                <Iconify
                  icon="solar:wallet-money-outline"
                  fontSize={32}
                  className="text-primary-main mb-2"
                />
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Session Rate
                </Typography>
                <Typography variant="h4" className="font-bold text-primary">
                  ₦{rate.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {yearsOfExperience && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card className="h-full hover:shadow-lg transition-shadow bg-white!">
              <CardContent className="text-center p-6">
                <Iconify
                  icon="solar:case-outline"
                  fontSize={32}
                  className="text-blue-600 mb-2"
                />
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Experience
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {yearsOfExperience}+ Years
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {rating && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card className="h-full hover:shadow-lg transition-shadow bg-white!">
              <CardContent className="text-center p-6">
                <Iconify
                  icon="solar:star-bold"
                  fontSize={32}
                  className="text-yellow-500 mb-2"
                />
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Rating
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {rating.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {expertise.length > 0 && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card className="h-full hover:shadow-lg transition-shadow bg-white!">
              <CardContent className="text-center p-6">
                <Iconify
                  icon="solar:medal-ribbons-outline"
                  fontSize={32}
                  className="text-green-600 mb-2"
                />
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Areas of Expertise
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {expertise.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          {consultant.bio && (
            <Paper variant="outlined" className="p-8 bg-white!">
              <Typography variant="h5" className="font-bold mb-4 flex items-center gap-2">
                <Iconify icon="solar:user-id-outline" fontSize={24} />
                About
              </Typography>
              <Divider className="mb-6" />
              {renderBio(consultant.bio)}
            </Paper>
          )}

          {/* Areas of Expertise */}
          {expertise.length > 0 && (
            <Paper variant="outlined" className="p-8 bg-white!">
              <Typography variant="h5" className="font-bold mb-4 flex items-center gap-2">
                <Iconify icon="solar:medal-ribbons-outline" fontSize={24} />
                Areas of Expertise
              </Typography>
              <Divider className="mb-6" />
              <div className="flex flex-wrap gap-3">
                {expertise.map((exp: string, idx: number) => (
                  <Chip
                    key={idx}
                    label={exp}
                    color="primary"
                    variant="soft"
                    className="text-base py-2 px-2"
                    sx={{
                      fontSize: "1rem",
                      height: "auto",
                      padding: "12px 16px",
                    }}
                  />
                ))}
              </div>
            </Paper>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Paper variant="outlined" className="p-6 bg-white!">
            <Typography variant="h6" className="font-bold mb-4">
              Contact Information
            </Typography>
            <Divider className="mb-4" />
            {user?.email && (
              <div className="flex items-center gap-3 mb-3">
                <Iconify icon="solar:letter-outline" fontSize={20} />
                <Typography variant="body2">{user.email}</Typography>
              </div>
            )}
            {consultant.faith && (
              <div className="flex items-center gap-3 mb-3">
                <Iconify icon="solar:heart-pulse-outline" fontSize={20} />
                <Typography variant="body2">{consultant.faith}</Typography>
              </div>
            )}
            {consultant.offerFaithTherapy && (
              <Chip
                label="Offers Faith-Based Therapy"
                color="success"
                variant="soft"
                className="mt-2"
              />
            )}
          </Paper>

          {/* Availability */}
          {consultant.hasSetAvailability && (
            <Paper variant="outlined" className="p-6 bg-white!">
              <Typography variant="h6" className="font-bold mb-4">
                Availability
              </Typography>
              <Divider className="mb-4" />
              <div className="flex items-center gap-2 text-green-600">
                <Iconify icon="solar:check-circle-bold" fontSize={20} />
                <Typography variant="body2" className="font-semibold">
                  Available for bookings
                </Typography>
              </div>
            </Paper>
          )}
        </div>
      </div>

      {/* Assign Dialog */}
      <AssignConsultantDialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        consultantId={consultantId}
      />
    </div>
  );
};

interface AssignConsultantDialogProps {
  open: boolean;
  onClose: () => void;
  consultantId: string;
}

const AssignConsultantDialog = ({
  open,
  onClose,
  consultantId,
}: AssignConsultantDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const router = useRouter();
  const clientProfileId = authUser?.user?.activeProfile?.userProfileClient || "";
  const [assignConsultantMutation, { isLoading }] = useAssignConsultantMutation();
  const { data: consultantData } = useGetConsultantByIdQuery(
    { path: { id: consultantId } },
    { skip: !consultantId }
  );

  const consultant = consultantData?.data;

  const handleAssign = async () => {
    try {
      await assignConsultantMutation({
        data: {
          clientId: clientProfileId,
          consultantId,
        },
      }).unwrap();
      enqueueSnackbar("Consultant assigned successfully", { variant: "success" });
      onClose();
      router.push("/dashboard");
    } catch (error: any) {
      enqueueSnackbar(error?.data?.defaultMessage || "Failed to assign consultant", {
        variant: "error",
      });
    }
  };

  if (!consultant) {
    return null;
  }

  const user = consultant.userProfile?.user;
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Assign Consultant</DialogTitle>
      <DialogContent>
        <DialogContentText className="mb-4">
          Are you sure you want to assign this consultant to your profile?
        </DialogContentText>
        <Paper variant="outlined" className="p-4 bg-white!">
          <div className="flex items-center gap-4">
            <Avatar src={user?.avatar || undefined} sx={{ width: 56, height: 56 }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold">
                {name || "Consultant"}
              </Typography>
              {consultant.jobTitle && (
                <Typography variant="body2" color="text.secondary">
                  {consultant.jobTitle}
                </Typography>
              )}
            </div>
          </div>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleAssign} variant="contained" disabled={isLoading}>
          {isLoading ? "Assigning..." : "Assign Consultant"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsultantDetails;
