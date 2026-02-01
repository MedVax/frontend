"use client";

import useAuthUser from "@/hooks/use-auth";
import { Button, Typography, Paper, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Icon as Iconify } from "@iconify/react";

import { useGetConsultantSessionsQuery, useGetConsultantStatsQuery } from "@/apis/session-api";
import BookingCard from "../../bookings/features/BookingCard";
import CalendarIntegrationComponent from "../../calendar/features/CalendarIntegration";
import { SessionStatus } from "@/apis/session-api";

const ConsultantDashboard = () => {
  const authUser = useAuthUser();
  const router = useRouter();

  // Get upcoming sessions
  const { data: sessionsData, isLoading: sessionsLoading } = useGetConsultantSessionsQuery({
    params: { page: 1, limit: 1, state: SessionStatus.UPCOMING },
  });

  // Get stats - using dummy consultantId for now
  const consultantId = authUser?.user?.activeProfile?.userProfileConsultant || "";
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Paper variant="outlined" className="p-4 bg-white!">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  Total Sessions
                </Typography>
                <Typography variant="h4" className="font-semibold">
                  {stats.totalSessions || 0}
                </Typography>
              </div>
              <Iconify icon="solar:calendar-mark-outline" fontSize={32} className="text-blue-500" />
            </div>
          </Paper>



          <Paper variant="outlined" className="p-4 bg-white!">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
                <Typography variant="h4" className="font-semibold text-orange-600">
                  {stats.pendingSessions || 0}
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
                  {stats.completedSessions || 0}
                </Typography>
              </div>
              <Iconify icon="solar:check-circle-outline" fontSize={32} className="text-green-500" />
            </div>
          </Paper>
        </div>
      )}

      {/* Recent Sessions */}
      {nextSession && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              Upcoming Sessions
            </Typography>

            <Button variant="outlined" onClick={() => router.push("/dashboard/bookings")}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            <BookingCard
              key={nextSession?.id}
              isConsultant
              status={SessionStatus.UPCOMING}
              session={{
                ...nextSession
              }}
            />
          </div>
        </div>
      )}

      <CalendarIntegrationComponent />
    </div>
  );
};

export default ConsultantDashboard;
