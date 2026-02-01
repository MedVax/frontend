"use client";

import useAuthUser from "@/hooks/use-auth";
import { Button, Typography, Paper, Avatar, Chip, Box, Skeleton, Icon } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { Icon as Iconify } from "@iconify/react";
import { Calendar, ClockCircle, Global } from "@solar-icons/react";
import { format } from "date-fns";
import { useGetConsultantSessionsQuery, useGetConsultantStatsQuery, Session } from "@/apis/session-api";
import BookingCard from "../../bookings/features/BookingCard";

const ConsultantDashboard = () => {
  const authUser = useAuthUser();
  const router = useRouter();

  // Get upcoming sessions
  const { data: sessionsData, isLoading: sessionsLoading } = useGetConsultantSessionsQuery({
    params: { page: 1, limit: 5, state: "upcoming" },
  });

  // Get stats - using dummy consultantId for now
  const consultantId = "consultant-123"; // This should come from consultant profile
  const { data: statsData, isLoading: statsLoading } = useGetConsultantStatsQuery({
    path: { consultantId },
  }, { skip: !consultantId });

  const upcomingSessions = sessionsData?.data?.data || [];
  const stats = statsData?.data || {
    totalSessions: 0,
    upcomingSessions: 0,
    completedSessions: 0,
    pendingSessions: 0,
  };

  const nextSession = upcomingSessions[0];

  return (
    <div className="space-y-6">
      {/* Header */}
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
          onClick={() => router.push("/dashboard/availability")}
        >
          Update Availability
        </Button>
      </div>

      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={120} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Paper variant="outlined" className="p-4 bg-white!">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  Total Sessions
                </Typography>
                <Typography variant="h4" className="font-semibold">
                  {stats.totalSessions}
                </Typography>
              </div>
              <Iconify icon="solar:calendar-mark-outline" fontSize={32} className="text-blue-500" />
            </div>
          </Paper>

          <Paper variant="outlined" className="p-4 bg-white!">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  Upcoming
                </Typography>
                <Typography variant="h4" className="font-semibold text-blue-600">
                  {stats.upcomingSessions}
                </Typography>
              </div>
              <Iconify icon="solar:calendar-add-outline" fontSize={32} className="text-blue-500" />
            </div>
          </Paper>

          <Paper variant="outlined" className="p-4 bg-white!">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
                <Typography variant="h4" className="font-semibold text-orange-600">
                  {stats.pendingSessions}
                </Typography>
              </div>
              <Iconify icon="solar:clock-circle-outline" fontSize={32} className="text-orange-500" />
            </div>
          </Paper>

          <Paper variant="outlined" className="p-4 bg-white!">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h4" className="font-semibold text-green-600">
                  {stats.completedSessions}
                </Typography>
              </div>
              <Iconify icon="solar:check-circle-outline" fontSize={32} className="text-green-500" />
            </div>
          </Paper>
        </div>
      )}

      {/* Next Session */}
      {sessionsLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : nextSession ? (
        <Paper variant="outlined" className="p-6 bg-white!">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              Next Session
            </Typography>
            <Chip
              label={nextSession.status}
              color={nextSession.status === "PENDING" ? "warning" : "info"}
              variant="soft"
              size="small"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={nextSession.client?.userProfile?.user?.avatar || undefined}
                sx={{ width: 64, height: 64 }}
              >
                {nextSession.client?.userProfile?.user?.firstName?.[0]}
                {nextSession.client?.userProfile?.user?.lastName?.[0]}
              </Avatar>
              <div className="flex flex-col">
                <Typography variant="h6" className="font-semibold">
                  {nextSession.client?.userProfile?.user?.firstName}{" "}
                  {nextSession.client?.userProfile?.user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nextSession.sessionType} Session
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Icon fontSize="small">
                  <Calendar />
                </Icon>
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography className="font-semibold">
                    {format(new Date(nextSession.scheduledDate), "dd MMM, yyyy")}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon fontSize="small">
                  <ClockCircle />
                </Icon>
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Time
                  </Typography>
                  <Typography className="font-semibold">
                    {format(new Date(nextSession.scheduledDate), "h:mm a")}
                  </Typography>
                </div>
              </div>
              {nextSession.clientTimezone && (
                <div className="flex items-center gap-2">
                  <Icon fontSize="small">
                    <Global />
                  </Icon>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Timezone
                    </Typography>
                    <Typography className="font-semibold">
                      {nextSession.clientTimezone}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1" />
            <div className="flex gap-2">
              {nextSession.meetingUrl && (
                <Button variant="contained" href={nextSession.meetingUrl} target="_blank">
                  Join Session
                </Button>
              )}
              <Button variant="outlined" onClick={() => router.push("/dashboard/bookings")}>
                View All
              </Button>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper variant="outlined" className="p-6 text-center">
          <Iconify icon="solar:calendar-mark-outline" fontSize={64} className="text-gray-400 mb-4" />
          <Typography variant="h6" className="mb-2">
            No upcoming sessions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your next session will appear here
          </Typography>
        </Paper>
      )}

      {/* Recent Sessions */}
      {upcomingSessions.length > 1 && (
        <div>
          <Typography variant="h6" className="font-semibold mb-4">
            Upcoming Sessions
          </Typography>
          <div className="space-y-4">
            {upcomingSessions.slice(1, 4).map((session) => (
              <Paper
                key={session.id}
                variant="outlined"
                className="p-4 bg-white! flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    src={session.client?.userProfile?.user?.avatar || undefined}
                    sx={{ width: 48, height: 48 }}
                  >
                    {session.client?.userProfile?.user?.firstName?.[0]}
                    {session.client?.userProfile?.user?.lastName?.[0]}
                  </Avatar>
                  <div>
                    <Typography variant="subtitle1" className="font-semibold">
                      {session.client?.userProfile?.user?.firstName} {session.client?.userProfile?.user?.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.sessionType} Session
                    </Typography>
                  </div>
                </div>
                <div className="text-right">
                  <Typography variant="body2" className="font-semibold">
                    {format(new Date(session.scheduledDate), "dd MMM, yyyy")}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(session.scheduledDate), "h:mm a")}
                  </Typography>
                </div>
              </Paper>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantDashboard;
