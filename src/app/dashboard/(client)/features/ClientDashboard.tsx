"use client";

import useAuthUser from "@/hooks/use-auth";
import { Avatar, Button, Divider, Icon, Paper, Typography, Skeleton, Box, Alert } from "@mui/material";
import { Calendar, ClockCircle, Global } from "@solar-icons/react";
import { format } from "date-fns";
import React from "react";
import { useRouter } from "next/navigation";
import { SessionStatus, useGetClientSessionsQuery } from "@/apis/session-api";
import { useGetClientProfileByUserQuery } from "@/apis/client-api";
import { Icon as Iconify } from "@iconify/react";
import Link from "next/link";
import CalendarIntegrationComponent from "./CalendarIntegration";

const ClientDashboard = () => {
  const authUser = useAuthUser();
  const router = useRouter();

  // Get client profile with consultant info
  const isClient = authUser?.user?.activeProfile?.type === "CLIENT";
  const { data: profileData, isLoading: profileLoading } = useGetClientProfileByUserQuery(
    {
      path: { clientProfileId: authUser?.user?.activeProfile?.id as string },
    },
    { skip: !isClient }
  );

  // Get upcoming sessions
  const { data: sessionsData, isLoading: sessionsLoading } = useGetClientSessionsQuery({
    params: { take: 1, skip: 0, state: SessionStatus.UPCOMING },
  });

  const clientProfile = profileData?.data;
  const consultant = clientProfile?.userProfileConsultant;
  const hasAssignedConsultant = !!consultant;
  const consultantId = consultant?.id;
  const upcomingSessions = sessionsData?.data?.data || [];
  const nextSession = upcomingSessions[0];

  // Get consultant name from next session if available, or use placeholder
  const consultantName = nextSession?.consultant?.userProfile?.user
    ? `${nextSession.consultant.userProfile.user.firstName || ""} ${nextSession.consultant.userProfile.user.lastName || ""}`.trim()
    : consultant?.jobTitle || "Consultant";
  const consultantAvatar = nextSession?.consultant?.userProfile?.user?.avatar;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        <div>
          <Typography component="span" className="text-grey-9 capitalize">
            Hi {authUser?.user?.firstName}
          </Typography>
          <Typography variant="h5" className="font-semibold mt-2">
            Welcome back
          </Typography>
        </div>

        <Button
          className="bg-black text-white"
          disabled={!hasAssignedConsultant}
          title={!hasAssignedConsultant ? "Please assign a consultant first" : ""}
          onClick={() => {
            if (hasAssignedConsultant && consultantId) {
              router.push(`/consultant/${consultantId}/book`);
            }
          }}
        >
          Book new session
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-10">
        {/* Consultant Card */}
        {profileLoading ? (
          <Skeleton variant="rectangular" width={300} height={300} />
        ) : consultant ? (
          <Paper variant="outlined" className="space-y-4 flex flex-col bg-white! p-4 md:w-[300px] w-full">
            <div className="flex items-center gap-4">
              <Avatar src={consultantAvatar || undefined} sx={{ width: 56, height: 56 }}>
                {nextSession?.consultant?.userProfile?.user?.firstName?.[0]}
                {nextSession?.consultant?.userProfile?.user?.lastName?.[0]}
              </Avatar>
              <div className="flex flex-col">
                <Link href={`/consultants/${consultantId}`}>
                  <Typography variant="h6" className="font-semibold">
                    {consultantName}
                  </Typography>
                </Link>
                {consultant?.jobTitle && (
                  <Typography variant="body2" color="text.secondary">
                    {consultant.jobTitle}
                  </Typography>
                )}
              </div>
            </div>

            <Divider />

            {consultant.bio && (
              <Typography variant="body2" color="text.secondary" className="line-clamp-4">
                {consultant.bio}
              </Typography>
            )}

            <div className="flex-1"></div>

            <div className="flex flex-col gap-2">
              <Button
                variant="soft"
                fullWidth
                component={Link}
                href="/dashboard/consultants"
              >
                Change Consultant
              </Button>
              {/* <Button
                variant="outlined"
                fullWidth
                component={Link}
                href={`/consultants/${consultantId}`}
              >
                View Consultant
              </Button> */}

            </div>

          </Paper>
        ) : (
          <Paper variant="outlined" className="space-y-4 bg-white! p-4 md:w-[300px] w-full">
            <Alert severity="info" className="mb-4">
              You don&apos;t have a consultant assigned yet.
            </Alert>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              href="/dashboard/consultants"
            >
              Assign Consultant
            </Button>
          </Paper>
        )}

        {/* Upcoming Session Card */}
        {sessionsLoading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : nextSession ? (
          <Paper variant="outlined" className="space-y-4 bg-white! p-4 md:w-[calc(100%-300px)]">
            <Typography variant="h6" className="font-semibold">
              Upcoming session
            </Typography>
            <Divider />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Avatar
                  src={nextSession.consultant?.userProfile?.user?.avatar || undefined}
                  sx={{ width: 56, height: 56 }}
                >
                  {nextSession.consultant?.userProfile?.user?.firstName?.[0]}
                  {nextSession.consultant?.userProfile?.user?.lastName?.[0]}
                </Avatar>
                <div className="flex flex-col">
                  <Typography variant="h6" className="font-semibold">
                    {nextSession.consultant?.userProfile?.user?.firstName}{" "}
                    {nextSession.consultant?.userProfile?.user?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(nextSession.consultant as any)?.jobTitle}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 max-w-[500px]">
                {[
                  {
                    icon: <Calendar />,
                    title: "Date",
                    value: format(new Date(nextSession.scheduledDate), "dd MMM, yyyy"),
                  },
                  {
                    icon: <ClockCircle />,
                    title: "Time",
                    value: format(new Date(nextSession.scheduledDate), "h:mm a"),
                  },
                  {
                    icon: <Global />,
                    title: "Timezone",
                    value: nextSession.clientTimezone || "Africa/Lagos",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="text-grey-9" fontSize="small">
                      {item.icon}
                    </Icon>
                    <div>
                      <Typography variant="body2" color="text.secondary">
                        {item.title}
                      </Typography>
                      <Typography className="font-semibold">{item.value}</Typography>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button color="secondary" variant="soft" onClick={() => router.push("/dashboard/bookings")}>
                  Reschedule
                </Button>
                <div className="flex-1"></div>
                {nextSession.meetingUrl && (
                  <Button
                    variant="soft"
                    href={nextSession.meetingUrl}
                    target="_blank"
                    component="a"
                  >
                    Join Session
                  </Button>
                )}
              </div>
            </div>
          </Paper>
        ) : (
          <Paper variant="outlined" className="space-y-4 bg-white! p-4 md:w-[calc(100%-300px)]">
            <Typography variant="h6" className="font-semibold">
              Upcoming session
            </Typography>
            <Divider />
            <Box className="text-center py-8">
              <Iconify icon="solar:calendar-mark-outline" fontSize={64} className="text-gray-400 mb-4 mx-auto" />
              <Typography variant="body1" color="text.secondary" className="mb-4">
                No upcoming sessions
              </Typography>
              <Button
                variant="contained"
                disabled={!hasAssignedConsultant}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                title={!hasAssignedConsultant ? "Please assign a consultant first" : ""}
                onClick={() => {
                  if (hasAssignedConsultant && consultantId) {
                    router.push(`/consultant/${consultantId}/book`);
                  }
                }}
              >
                Book a Session
              </Button>
            </Box>
          </Paper>
        )}
      </div>

      {/* Calendar Integration Section */}
      <CalendarIntegrationComponent />
    </div>
  );
};

export default ClientDashboard;
