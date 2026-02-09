"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Chip,
  Box,
  Skeleton,
  Alert,
  Divider,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useGetConsultantByIdQuery } from "@/apis/consultant-api";
import { Calendar, ClockCircle, Star, Star2, User } from "@solar-icons/react";
import { Icon } from "@mui/material";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { usePathname } from "next/navigation";

interface PublicConsultantProfileProps {
  consultantId: string;
}

const PublicConsultantProfile = ({ consultantId }: PublicConsultantProfileProps) => {
  const { data, isLoading, error } = useGetConsultantByIdQuery(
    { path: { id: consultantId } },
    { skip: !consultantId }
  );
  const { enqueueSnackbar } = useSnackbar();
  const pathname = usePathname();
  const [isSharing, setIsSharing] = useState(false);

  const consultant = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton variant="rectangular" height={300} className="rounded-xl" />
          <Skeleton variant="rectangular" height={400} className="rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !consultant) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
        <Alert severity="error" className="max-w-md">
          Consultant profile not found.{" "}
          <Link href="/" className="underline">
            Return to home
          </Link>
        </Alert>
      </div>
    );
  }

  const user = consultant.userProfile?.user;
  const avatar = user?.avatar;
  const name = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Consultant";
  const email = user?.email || "";
  const expertise = consultant.areaOfExpertise || [];
  const rate = consultant.rate;
  const yearsOfExperience = consultant.yearsOfExperience;
  const rating = consultant.rating;

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const profileUrl = typeof window !== "undefined" 
        ? `${window.location.origin}${pathname}`
        : "";

      const shareData = {
        title: `${name} - Consultant Profile`,
        text: `Check out ${name}'s consultant profile on MedVax${consultant.jobTitle ? ` - ${consultant.jobTitle}` : ""}`,
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
            ? `${window.location.origin}${pathname}`
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
          let processedLine = line;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;

          // Process bold first
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

          // Process italic in parts
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary-main to-primary-dark text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
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
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Typography
                  variant="h3"
                  className="font-bold"
                  sx={{ color: "white" }}
                >
                  {name}
                </Typography>
                <Tooltip title="Share profile">
                  <IconButton
                    onClick={handleShare}
                    disabled={isSharing}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                    size="small"
                  >
                    <Iconify 
                      icon={isSharing ? "solar:loading-circle-bold" : "solar:share-bold"} 
                      fontSize={24} 
                    />
                  </IconButton>
                </Tooltip>
              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Quick Info Cards */}
        <Grid container spacing={3}>
          {rate && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                variant="outlined"
                className="p-6 bg-white! text-center hover:shadow-lg transition-shadow"
              >
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Session Rate
                </Typography>
                <Typography variant="h4" className="font-bold text-primary">
                  ₦{rate.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          )}
          {yearsOfExperience && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                variant="outlined"
                className="p-6 bg-white! text-center hover:shadow-lg transition-shadow"
              >
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Experience
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {yearsOfExperience}+ Years
                </Typography>
              </Paper>
            </Grid>
          )}
          {rating && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                variant="outlined"
                className="p-6 bg-white! text-center hover:shadow-lg transition-shadow"
              >
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Rating
                </Typography>
                <div className="flex items-center justify-center gap-1">
                  <Iconify icon="solar:star-bold" className="text-yellow-500" fontSize={24} />
                  <Typography variant="h4" className="font-bold">
                    {rating.toFixed(1)}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          )}
          {expertise.length > 0 && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                variant="outlined"
                className="p-6 bg-white! text-center hover:shadow-lg transition-shadow"
              >
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Areas of Expertise
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {expertise.length}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div className="prose prose-lg max-w-none">
                  {renderBio(consultant.bio)}
                </div>
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
                      className="text-base py-6 px-4"
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
            {/* Book Session Card */}
            <Paper
              variant="outlined"
              className="p-6 bg-linear-to-br from-primary-main to-primary-dark text-white"
            >
              <Typography variant="h6" className="font-bold mb-4 text-white">
                Book a Session
              </Typography>
              <Typography variant="body2" className="mb-6 opacity-90">
                Schedule a consultation with {name.split(" ")[0]} today
              </Typography>
              <Button
                variant="contained"
                fullWidth
                className="bg-white text-primary-main hover:bg-gray-100 mb-3"
                component={Link}
                href="/dashboard/bookings"
                size="large"
              >
                Book Now
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleShare}
                disabled={isSharing}
                className="border-white text-white hover:bg-white/10"
                size="medium"
                startIcon={
                  <Iconify 
                    icon={isSharing ? "solar:loading-circle-bold" : "solar:share-bold"} 
                    fontSize={20} 
                  />
                }
              >
                Share Profile
              </Button>
            </Paper>

            {/* Contact Info */}
            <Paper variant="outlined" className="p-6 bg-white!">
              <Typography variant="h6" className="font-bold mb-4">
                Contact Information
              </Typography>
              <Divider className="mb-4" />
              {email && (
                <div className="flex items-center gap-3 mb-3">
                  <Iconify icon="solar:letter-outline" fontSize={20} />
                  <Typography variant="body2">{email}</Typography>
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

            {/* Quick Stats */}
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
      </div>
    </div>
  );
};

export default PublicConsultantProfile;

