"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Avatar,
  Skeleton,
  Alert,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSessionByIdQuery,
  useUpdatePrescriptionNoteMutation,
  useUpdateSessionNoteReportMutation,
} from "@/apis/session-api";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";
import Link from "next/link";
import { format } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";

const SessionDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const sessionId = params?.id as string;

  const isConsultant = authUser?.user?.activeProfile?.type === "CONSULTANT";

  const { data, isLoading, error } = useGetSessionByIdQuery(
    { path: { id: sessionId } },
    { skip: !sessionId }
  );

  const [updatePrescriptionNote, { isLoading: isUpdatingPrescription }] =
    useUpdatePrescriptionNoteMutation();
  const [updateSessionNote, { isLoading: isUpdatingSessionNote }] =
    useUpdateSessionNoteReportMutation();

  const [isEditingPrescription, setIsEditingPrescription] = useState(false);
  const [isEditingSessionNote, setIsEditingSessionNote] = useState(false);

  const session = data?.data;

  const prescriptionNoteFormik = useFormik({
    initialValues: {
      prescriptionNote: session?.prescriptionNote || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      prescriptionNote: Yup.string().required("Prescription note is required"),
    }),
    onSubmit: async (values) => {
      try {
        await updatePrescriptionNote({
          path: { id: sessionId },
          data: { prescriptionNote: values.prescriptionNote },
        }).unwrap();
        enqueueSnackbar("Prescription note updated successfully", {
          variant: "success",
        });
        setIsEditingPrescription(false);
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.defaultMessage || "Failed to update prescription note",
          { variant: "error" }
        );
      }
    },
  });

  const sessionNoteFormik = useFormik({
    initialValues: {
      sessionNote: session?.sessionNote || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      sessionNote: Yup.string().required("Session note is required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateSessionNote({
          path: { id: sessionId },
          data: { sessionNote: values.sessionNote },
        }).unwrap();
        enqueueSnackbar("Session note updated successfully", {
          variant: "success",
        });
        setIsEditingSessionNote(false);
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.defaultMessage || "Failed to update session note",
          { variant: "error" }
        );
      }
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  if (error || !session) {
    return (
      <Alert severity="error" className="mb-4">
        {error ? "Failed to load session details" : "Session not found"}
      </Alert>
    );
  }

  const client = session.client;
  const clientUser = client?.userProfile?.user;
  const consultant = session.consultant;
  const consultantUser = consultant?.userProfile?.user;

  const clientName = clientUser
    ? `${clientUser.firstName || ""} ${clientUser.lastName || ""}`.trim()
    : "N/A";
  const consultantName = consultantUser
    ? `${consultantUser.firstName || ""} ${consultantUser.lastName || ""}`.trim()
    : "N/A";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button
          variant="outlined"
          startIcon={<Iconify icon="solar:arrow-left-linear" fontSize={20} />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        {session.meetingUrl && (
          <Button
            variant="contained"
            href={session.meetingUrl}
            target="_blank"
            component="a"
            startIcon={<Iconify icon="solar:videocamera-record-linear" fontSize={20} />}
          >
            Join Session
          </Button>
        )}
      </div>

      {/* Session Info Card */}
      <Paper variant="outlined" className="p-6">
        <Typography variant="h5" className="font-semibold mb-4">
          Session Details
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Date & Time
            </Typography>
            <Typography variant="body1" className="font-medium">
              {format(new Date(session.scheduledDate), "MMMM dd, yyyy h:mm a")}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={session.status}
              color={
                session.status === "COMPLETED"
                  ? "success"
                  : session.status === "UPCOMING"
                    ? "primary"
                    : session.status === "CANCELED"
                      ? "error"
                      : "default"
              }
              size="small"
            />
          </div>
          <div>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Session Type
            </Typography>
            <Typography variant="body1" className="font-medium">
              {session.sessionType}
            </Typography>
          </div>
          {session.clientTimezone && (
            <div>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Timezone
              </Typography>
              <Typography variant="body1" className="font-medium">
                {session.clientTimezone}
              </Typography>
            </div>
          )}
        </div>
      </Paper>

      {/* Client Information */}
      <Paper variant="outlined" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-semibold">
            Client Information
          </Typography>
          {isConsultant && (
            <Button
              component={Link}
              href={`/dashboard/clients/${session.clientId}`}
              variant="outlined"
              size="small"
              startIcon={<Iconify icon="solar:user-outline" fontSize={18} />}
            >
              View Full Profile
            </Button>
          )}
        </div>
        {clientUser ? (
          <div className="flex items-center gap-4">
            <Avatar
              src={clientUser.avatar || undefined}
              sx={{ width: 64, height: 64 }}
            >
              {clientUser.firstName?.[0]}
              {clientUser.lastName?.[0]}
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold">
                {isConsultant ? (
                  <Link
                    href={`/dashboard/clients/${session.clientId}`}
                    className="text-primary hover:underline"
                  >
                    {clientName}
                  </Link>
                ) : (
                  clientName
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {clientUser.email}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography color="text.secondary">No client information</Typography>
        )}
      </Paper>

      {/* Consultant Information */}
      <Paper variant="outlined" className="p-6">
        <Typography variant="h6" className="font-semibold mb-4">
          Consultant Information
        </Typography>
        {consultantUser ? (
          <div className="flex items-center gap-4">
            <Avatar
              src={consultantUser.avatar || undefined}
              sx={{ width: 64, height: 64 }}
            >
              {consultantUser.firstName?.[0]}
              {consultantUser.lastName?.[0]}
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold">
                {consultantName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {consultantUser.email}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography color="text.secondary">No consultant information</Typography>
        )}
      </Paper>

      {/* Prescription Note */}
      <Paper variant="outlined" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-semibold">
            Prescription Note
          </Typography>
          {isConsultant && !isEditingPrescription && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<Iconify icon="solar:pen-linear" fontSize={18} />}
              onClick={() => setIsEditingPrescription(true)}
            >
              {session.prescriptionNote ? "Edit" : "Add"}
            </Button>
          )}
        </div>

        {isConsultant && isEditingPrescription ? (
          <form onSubmit={prescriptionNoteFormik.handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Prescription Note"
              name="prescriptionNote"
              value={prescriptionNoteFormik.values.prescriptionNote}
              onChange={prescriptionNoteFormik.handleChange}
              onBlur={prescriptionNoteFormik.handleBlur}
              error={
                prescriptionNoteFormik.touched.prescriptionNote &&
                !!prescriptionNoteFormik.errors.prescriptionNote
              }
              helperText={
                prescriptionNoteFormik.touched.prescriptionNote &&
                prescriptionNoteFormik.errors.prescriptionNote
              }
              className="mb-4"
            />
            <div className="flex gap-2">
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isUpdatingPrescription}
              >
                Save
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsEditingPrescription(false);
                  prescriptionNoteFormik.resetForm();
                }}
                disabled={isUpdatingPrescription}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : session.prescriptionNote ? (
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 2,
              borderRadius: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body1">{session.prescriptionNote}</Typography>
          </Box>
        ) : (
          <Typography color="text.secondary" className="italic">
            No prescription note added yet.
          </Typography>
        )}
      </Paper>

      {/* Session Note (Consultant Only) */}
      {isConsultant && (
        <Paper variant="outlined" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              Session Note/Report
            </Typography>
            {!isEditingSessionNote && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon="solar:pen-linear" fontSize={18} />}
                onClick={() => setIsEditingSessionNote(true)}
              >
                {session.sessionNote ? "Edit" : "Add"}
              </Button>
            )}
          </div>

          {isEditingSessionNote ? (
            <form onSubmit={sessionNoteFormik.handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={8}
                label="Session Note/Report"
                name="sessionNote"
                value={sessionNoteFormik.values.sessionNote}
                onChange={sessionNoteFormik.handleChange}
                onBlur={sessionNoteFormik.handleBlur}
                error={
                  sessionNoteFormik.touched.sessionNote &&
                  !!sessionNoteFormik.errors.sessionNote
                }
                helperText={
                  sessionNoteFormik.touched.sessionNote &&
                  sessionNoteFormik.errors.sessionNote
                }
                className="mb-4"
              />
              <div className="flex gap-2">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isUpdatingSessionNote}
                >
                  Save
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsEditingSessionNote(false);
                    sessionNoteFormik.resetForm();
                  }}
                  disabled={isUpdatingSessionNote}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : session.sessionNote ? (
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                padding: 2,
                borderRadius: 1,
                whiteSpace: "pre-wrap",
              }}
            >
              <Typography variant="body1">{session.sessionNote}</Typography>
            </Box>
          ) : (
            <Typography color="text.secondary" className="italic">
              No session note added yet.
            </Typography>
          )}
        </Paper>
      )}

      {/* Client Note */}
      {session.note && (
        <Paper variant="outlined" className="p-6">
          <Typography variant="h6" className="font-semibold mb-4">
            Client Note
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 2,
              borderRadius: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body1">{session.note}</Typography>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default SessionDetailPage;

