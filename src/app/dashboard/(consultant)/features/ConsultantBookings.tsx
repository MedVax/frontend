"use client";

import React, { useState } from "react";
import { Tab, Tabs, Typography, Paper, Avatar, Button, Chip, Icon, Skeleton, Box } from "@mui/material";
import { Calendar, ClockCircle, Global } from "@solar-icons/react";
import { format } from "date-fns";
import { useGetConsultantSessionsQuery, useUpdateSessionStatusMutation, SessionStatus } from "@/apis/session-api";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify/react";
import BookingCard from "../../bookings/features/BookingCard";

const ConsultantBookings = () => {
  const [value, setValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [updateStatus] = useUpdateSessionStatusMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Fetch sessions based on active tab
  const stateMap = ["upcoming", "pending", "past"];
  const { data, isLoading } = useGetConsultantSessionsQuery({
    params: { page: 1, limit: 50, state: stateMap[value] },
  });

  const sessions = data?.data?.data || [];

  const handleAcceptSession = async (sessionId: string) => {
    try {
      await updateStatus({
        path: { id: sessionId },
        data: { status: SessionStatus.APPROVED },
      }).unwrap();
      enqueueSnackbar("Session accepted", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to accept session", {
        variant: "error",
      });
    }
  };

  const handleDeclineSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to decline this session?")) return;
    try {
      await updateStatus({
        path: { id: sessionId },
        data: { status: SessionStatus.DECLINED },
      }).unwrap();
      enqueueSnackbar("Session declined", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to decline session", {
        variant: "error",
      });
    }
  };

  const tabs = [
    { title: "Upcoming", content: <ConsultantBookingsUpcoming sessions={sessions} isLoading={isLoading} onAccept={handleAcceptSession} onDecline={handleDeclineSession} /> },
    { title: "Pending", content: <ConsultantBookingsPending sessions={sessions} isLoading={isLoading} onAccept={handleAcceptSession} onDecline={handleDeclineSession} /> },
    { title: "Past", content: <ConsultantBookingsPast sessions={sessions} isLoading={isLoading} /> },
  ];

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="consultant bookings tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.title} />
        ))}
      </Tabs>
      <div className="mt-10">
        {tabs[value].content}
      </div>
    </div>
  );
};

interface ConsultantBookingsProps {
  sessions: any[];
  isLoading: boolean;
  onAccept?: (sessionId: string) => void;
  onDecline?: (sessionId: string) => void;
}

const ConsultantBookingsUpcoming = ({ sessions, isLoading, onAccept, onDecline }: ConsultantBookingsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={200} />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <Paper variant="outlined" className="p-8 text-center bg-white!">
        <Iconify icon="solar:calendar-mark-outline" fontSize={64} className="text-gray-400 mb-4" />
        <Typography variant="h6" className="mb-2">
          No upcoming sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your upcoming sessions will appear here
        </Typography>
      </Paper>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Paper key={session.id} variant="outlined" className="p-6 bg-white!">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Avatar
                src={session.client?.userProfile?.user?.avatar || undefined}
                sx={{ width: 64, height: 64 }}
              >
                {session.client?.userProfile?.user?.firstName?.[0]}
                {session.client?.userProfile?.user?.lastName?.[0]}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Typography variant="h6" className="font-semibold">
                    {session.client?.userProfile?.user?.firstName}{" "}
                    {session.client?.userProfile?.user?.lastName}
                  </Typography>
                  <Chip
                    label={session.sessionType}
                    size="small"
                    variant="soft"
                    color="info"
                  />
                  <Chip
                    label={session.status}
                    size="small"
                    variant="soft"
                    color={session.status === "PENDING" ? "warning" : "info"}
                  />
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
                        {format(new Date(session.scheduledDate), "dd MMM, yyyy")}
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
                        {format(new Date(session.scheduledDate), "h:mm a")}
                      </Typography>
                    </div>
                  </div>
                  {session.clientTimezone && (
                    <div className="flex items-center gap-2">
                      <Icon fontSize="small">
                        <Global />
                      </Icon>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Timezone
                        </Typography>
                        <Typography className="font-semibold">
                          {session.clientTimezone}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
                {session.note && (
                  <Typography variant="body2" color="text.secondary" className="mt-2">
                    Note: {session.note}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {session.meetingUrl && (
                <Button
                  variant="contained"
                  href={session.meetingUrl}
                  target="_blank"
                  startIcon={<Iconify icon="solar:videocamera-record-outline" fontSize={20} />}
                >
                  Join Session
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => window.location.href = `/dashboard/bookings/${session.id}`}
              >
                View Details
              </Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

const ConsultantBookingsPending = ({ sessions, isLoading, onAccept, onDecline }: ConsultantBookingsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={200} />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <Paper variant="outlined" className="p-8 text-center bg-white!">
        <Iconify icon="solar:clock-circle-outline" fontSize={64} className="text-gray-400 mb-4" />
        <Typography variant="h6" className="mb-2">
          No pending sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sessions awaiting your approval will appear here
        </Typography>
      </Paper>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Paper key={session.id} variant="outlined" className="p-6 bg-white!">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Avatar
                src={session.client?.userProfile?.user?.avatar || undefined}
                sx={{ width: 64, height: 64 }}
              >
                {session.client?.userProfile?.user?.firstName?.[0]}
                {session.client?.userProfile?.user?.lastName?.[0]}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Typography variant="h6" className="font-semibold">
                    {session.client?.userProfile?.user?.firstName}{" "}
                    {session.client?.userProfile?.user?.lastName}
                  </Typography>
                  <Chip
                    label={session.sessionType}
                    size="small"
                    variant="soft"
                    color="info"
                  />
                  <Chip
                    label={session.status}
                    size="small"
                    variant="soft"
                    color="warning"
                  />
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
                        {format(new Date(session.scheduledDate), "dd MMM, yyyy")}
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
                        {format(new Date(session.scheduledDate), "h:mm a")}
                      </Typography>
                    </div>
                  </div>
                </div>
                {session.note && (
                  <Typography variant="body2" color="text.secondary" className="mt-2">
                    Note: {session.note}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="contained"
                color="success"
                onClick={() => onAccept?.(session.id)}
                startIcon={<Iconify icon="solar:check-circle-linear" fontSize={20} />}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDecline?.(session.id)}
                startIcon={<Iconify icon="solar:close-circle-linear" fontSize={20} />}
              >
                Decline
              </Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

const ConsultantBookingsPast = ({ sessions, isLoading }: Omit<ConsultantBookingsProps, "onAccept" | "onDecline">) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={200} />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <Paper variant="outlined" className="p-8 text-center bg-white!">
        <Iconify icon="solar:history-outline" fontSize={64} className="text-gray-400 mb-4" />
        <Typography variant="h6" className="mb-2">
          No past sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your completed sessions will appear here
        </Typography>
      </Paper>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Paper key={session.id} variant="outlined" className="p-6 bg-white!">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Avatar
                src={session.client?.userProfile?.user?.avatar || undefined}
                sx={{ width: 64, height: 64 }}
              >
                {session.client?.userProfile?.user?.firstName?.[0]}
                {session.client?.userProfile?.user?.lastName?.[0]}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Typography variant="h6" className="font-semibold">
                    {session.client?.userProfile?.user?.firstName}{" "}
                    {session.client?.userProfile?.user?.lastName}
                  </Typography>
                  <Chip
                    label={session.sessionType}
                    size="small"
                    variant="soft"
                    color="info"
                  />
                  <Chip
                    label={session.status}
                    size="small"
                    variant="soft"
                    color={session.status === "COMPLETED" ? "success" : "default"}
                  />
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
                        {format(new Date(session.scheduledDate), "dd MMM, yyyy")}
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
                        {format(new Date(session.scheduledDate), "h:mm a")}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outlined" onClick={() => window.location.href = `/dashboard/bookings/${session.id}`}>
                View Details
              </Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default ConsultantBookings;
