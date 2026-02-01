"use client";

import React, { useMemo, useState } from "react";
import {
    Tab,
    Tabs,
    Typography,
    Paper,
    Skeleton,
    Alert,
    Box,
    Pagination,
} from "@mui/material";
import BookingCard from "../../bookings/features/BookingCard";
import { SessionStatus, useGetClientSessionsQuery } from "@/apis/session-api";
import { Icon as Iconify } from "@iconify/react";

const ClientBookings = () => {
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 4;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setPage(1); // Reset to first page when switching tabs
    };

    const tabs = [
        { title: "Upcoming", state: SessionStatus.UPCOMING },
        { title: "Pending", state: SessionStatus.PENDING },
        { title: "Past", state: SessionStatus.COMPLETED },
    ];

    const currentTab = tabs[value];

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="bookings tabs">
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.title} />
                ))}
            </Tabs>
            <div className="mt-10">
                <ClientBookingsList
                    state={currentTab.state}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

interface ClientBookingsListProps {
    state: string;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const ClientBookingsList = ({
    state,
    page,
    limit,
    onPageChange,
}: ClientBookingsListProps) => {
    const { data, isFetching, error } = useGetClientSessionsQuery(
        useMemo(() => {
            return {
                params: {
                    skip: (page - 1) * limit,
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
        <div>
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
        </div>
    );
};

export default ClientBookings;
