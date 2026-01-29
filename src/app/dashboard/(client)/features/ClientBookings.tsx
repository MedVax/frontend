"use client";

import React, { useState } from "react";
import {
    Tab,
    Tabs,
    Typography,
    Paper,
    Skeleton,
    Alert,
    Box,
    Pagination,
    Chip,
} from "@mui/material";
import BookingCard from "../../bookings/features/BookingCard";
import { useGetClientSessionsQuery, Session, SessionStatus } from "@/apis/session-api";
import { Icon as Iconify } from "@iconify/react";

const ClientBookings = () => {
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setPage(1); // Reset to first page when switching tabs
    };

    const tabs = [
        { title: "Upcoming", state: "upcoming" },
        { title: "Pending", state: "pending_approval" },
        { title: "Past", state: "past" },
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
    const { data, isLoading, error } = useGetClientSessionsQuery({
        params: {
            page,
            limit,
            state,
        },
    });

    const sessions = data?.data?.data || [];
    const pagination = data?.data;

    if (isLoading) {
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
                <Iconify icon="solar:calendar-mark-outline" fontSize={64} className="text-gray-400 mb-4" />
                <Typography variant="h6" className="mb-2">
                    No {state === "upcoming" ? "upcoming" : state === "pending_approval" ? "pending" : "past"}{" "}
                    sessions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {state === "upcoming"
                        ? "Your upcoming sessions will appear here."
                        : state === "pending_approval"
                            ? "Sessions pending approval will appear here."
                            : "Your past sessions will appear here."}
                </Typography>
            </Paper>
        );
    }

    return (
        <div className="space-y-4">
            {sessions.map((session) => (
                <BookingCard key={session.id} session={session} />
            ))}

            {pagination && pagination.totalRecords > limit && (
                <Box className="flex justify-center mt-6">
                    <Pagination
                        count={pagination.pageCount}
                        page={page}
                        onChange={(_, newPage) => onPageChange(newPage)}
                        color="primary"
                    />
                </Box>
            )}
        </div>
    );
};

export default ClientBookings;
