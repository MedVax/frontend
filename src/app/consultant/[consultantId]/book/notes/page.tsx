"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
  Skeleton,
  Divider,
  Chip,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import {
  useGetClientSessionsQuery,
  useUpdateSessionNoteMutation,
  SessionStatus,
} from "@/apis/session-api";
import useAuthUser from "@/hooks/use-auth";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const validationSchema = Yup.object({
  note: Yup.array().of(Yup.object({
    sessionId: Yup.string().required("Session ID is required"),
    note: Yup.string().required("Session note is required"),
  })),
});

const SessionNotesPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const authUser = useAuthUser();
  const isClient = authUser?.user?.activeProfile?.type === "CLIENT";
  const consultantId = params?.consultantId as string;
  const sessionIdsParam = searchParams.get("sessionIds");

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [updateNote, { isLoading }] = useUpdateSessionNoteMutation();

  // Get upcoming sessions
  const { data: sessionsData, isLoading: sessionsLoading } = useGetClientSessionsQuery({
    params: { state: SessionStatus.UPCOMING, ids: sessionIdsParam?.split(",") },
  });

  const sessions = sessionsData?.data?.data || [];

  // Filter sessions if sessionIds provided
  const filteredSessions = sessionIdsParam
    ? sessions.filter((session) =>
      sessionIdsParam?.split(",").includes(session.id)
    )
    : sessions;

  // Set first session as selected by default
  useEffect(() => {
    if (filteredSessions.length > 0 && !selectedSessionId) {
      setSelectedSessionId(filteredSessions[0].id);
    }
  }, [filteredSessions, selectedSessionId]);

  const selectedSession = filteredSessions.find((s) => s.id === selectedSessionId);

  const formik = useFormik({
    initialValues: {
      note: sessionIdsParam ? [
        ...(sessionIdsParam?.split(",")?.map((id: string) => ({
          sessionId: id,
          note: "I'll like to discuss about my health concerns on" //sample note for the consultation
        }))),
      ] : []
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedSessionId) {
        enqueueSnackbar("Please select a session", { variant: "error" });
        return;
      }

      try {
        await Promise.all(
          values.note.map(async (note) => {
            if (!note.sessionId) {
              throw new Error("Session ID is required");
            }
            await updateNote({
              path: { id: note.sessionId as string },
              data: { note: note.note },
            }).unwrap();
          })
        );

        enqueueSnackbar("Session note updated successfully", { variant: "success" });
        router.push("/dashboard/bookings");
      } catch (error: unknown) {
        const errorMessage =
          (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update session note";
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    },
  });

  if (!isClient) {
    return (
      <div className="space-y-6">
        <Alert severity="error">
          This page is only accessible to clients.{" "}
          <Link href="/dashboard" className="underline">
            Go to Dashboard
          </Link>
        </Alert>
      </div>
    );
  }

  if (sessionsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  if (filteredSessions.length === 0) {
    return (
      <div className="space-y-6">
        <Alert severity="info">
          No sessions found. <Link href={`/consultant/${consultantId}/book`}>Book a session</Link>
        </Alert>
      </div>
    );
  }

  const consultant = selectedSession?.consultant?.userProfile?.user;
  const consultantName = consultant
    ? `${consultant.firstName} ${consultant.lastName}`.trim()
    : "Consultant";

  console.log({ formik: formik.values.note });
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/dashboard" className="hover:text-primary-main">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/bookings" className="hover:text-primary-main">
          Bookings
        </Link>
        <span>/</span>
        <span>Session Notes</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Session List */}
        <div className="lg:col-span-1">
          <Paper variant="outlined" className="p-4 bg-white!">
            <Typography variant="h6" className="font-semibold mb-4">
              Your Sessions
            </Typography>
            <Divider className="mb-4" />
            <Box className="space-y-2">
              {filteredSessions.map((session) => {
                const isSelected = session.id === selectedSessionId;
                return (
                  <Paper
                    key={session.id}
                    variant="outlined"
                    className={`p-3 cursor-pointer transition-colors ${isSelected
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white hover:bg-gray-50"
                      }`}
                    onClick={() => {
                      setSelectedSessionId(session.id);
                    }}
                  >
                    <Box className="flex items-center justify-between mb-2">
                      <Typography variant="subtitle2" className="font-semibold flex items-center gap-1">
                        <Iconify icon="solar:calendar-line-duotone" fontSize={18} /> {format(parseISO(session.scheduledDate), "MMM d, yyyy")}
                      </Typography>
                      <Chip
                        label={session.status}
                        size="small"
                        color={
                          session.status === SessionStatus.UPCOMING
                            ? "primary"
                            : "default"
                        }
                      />
                    </Box>
                    <div className="flex items-center gap-1">
                      <Iconify icon="solar:clock-circle-line-duotone" fontSize={15} />
                      <Typography variant="caption" color="text.secondary">
                        {format(parseISO(session.scheduledDate), "h:mm a")}
                      </Typography>
                    </div>
                  </Paper>
                );
              })}
            </Box>
          </Paper>
        </div>

        {/* Right Column - Note Form */}
        <div className="lg:col-span-2">
          <Paper variant="outlined" className="p-6 bg-white!">
            {selectedSession && (
              <>
                <Box className="mb-6">
                  <Typography variant="h6" className="font-semibold mb-2">
                    Consultation Note
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="mb-4">
                    Session with {consultantName} on{" "}
                    {format(parseISO(selectedSession.scheduledDate), "MMMM d, yyyy 'at' h:mm a")}
                  </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    label="Session Note"
                    placeholder="Add notes about what you'd like to discuss or any concerns..."
                    value={formik.values.note?.find((note) => note.sessionId === selectedSessionId)?.note || ""}
                    onChange={(e) => {
                      formik.setFieldValue("note", formik.values.note?.map((note) => note.sessionId === selectedSessionId ? { ...note, note: e.target.value } : note));
                    }}

                  // onBlur={formik.handleBlur}

                  // error={formik.touched.note && !!formik.errors.note}
                  // helperText={formik.touched.note && formik.errors.note}
                  />

                  <Box className="flex justify-end gap-4">
                    <Button
                      variant="outlined"
                      component={Link}
                      href="/dashboard/bookings"
                    >
                      Skip
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      startIcon={<Iconify icon="solar:check-circle-outline" fontSize={20} />}
                    >
                      {isLoading ? "Saving..." : "Save Note"}
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </Paper>
        </div>
      </div >
    </div >
  );
};

export default SessionNotesPage;

