"use client";

import React, { useMemo, useState } from "react";
import { Tab, Tabs, Typography, Paper, Skeleton, Box, Pagination, Alert } from "@mui/material";
import { useGetConsultantSessionsQuery, useUpdateSessionStatusMutation, SessionStatus, useGetClientSessionsQuery } from "@/apis/session-api";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify/react";
import BookingCard from "../../bookings/features/BookingCard";

const ConsultantBookings = () => {
  const [value, setValue] = useState(0);
  const limit = 4;
  const [page, setPage] = useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const contentProps = {
    page,
    limit,
    onPageChange: handlePageChange,
  };

  const tabs = [
    { title: "Upcoming", content: <ConsultantBookingsList state={SessionStatus.UPCOMING} {...contentProps} /> },
    { title: "Pending", content: <ConsultantBookingsList state={SessionStatus.PENDING} {...contentProps} /> },
    { title: "Past", content: <ConsultantBookingsList state={SessionStatus.COMPLETED} {...contentProps} /> },
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

interface ConsultantBookingsListProps {
  state: string;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const ConsultantBookingsList = ({
  state,
  page,
  limit,
  onPageChange,
}: ConsultantBookingsListProps) => {
  const { data, isFetching, error } = useGetConsultantSessionsQuery(
    useMemo(() => {
      return {
        params: {
          page,
          ...(state === SessionStatus.UPCOMING ? { take: 1 } : { take: limit }),
          state,
        },
      }
    }, [page, limit, state])
  );

  const sessions = data?.data?.data || [];
  const pagination = data?.data;

  if (isFetching) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={200} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mb-4">
        Failed to load sessions. Please try again later.
      </Alert>
    );
  }

  if (sessions.length === 0) {
    return (
      <Paper variant="outlined" className="p-8 text-center bg-white!">
        <Iconify icon="solar:calendar-mark-outline" fontSize={64} className="text-gray-400 mb-4 mx-auto" />
        <Typography variant="h6" className="mb-2">
          No {state === SessionStatus.UPCOMING ? "upcoming" : state === SessionStatus.PENDING ? "pending" : "past"}{" "}
          sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {state === SessionStatus.UPCOMING
            ? "Your upcoming sessions will appear here."
            : state === SessionStatus.PENDING
              ? "Sessions pending approval will appear here."
              : "Your past sessions will appear here."}
        </Typography>
      </Paper>
    );
  }



  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <BookingCard key={session.id} session={session} status={state as SessionStatus} />
      ))}

      {pagination && pagination.totalRecords > limit && state !== SessionStatus.UPCOMING && (
        <Box className="flex justify-center mt-6">
          <Pagination
            count={pagination.pages}
            page={page}
            onChange={(_, newPage) => onPageChange(newPage)}
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default ConsultantBookings;
