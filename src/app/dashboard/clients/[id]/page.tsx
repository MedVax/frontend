"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Avatar,
  Divider,
  Skeleton,
  Alert,
  Grid,
  Tabs,
  Tab,
  Box,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetClientProfileQuery,
} from "@/apis/client-api";
import {
  useGetConsultantSessionsQuery,
  SessionStatus,
} from "@/apis/session-api";
import {
  useGetPrescriptionsQuery,
  PrescriptionStatus,
} from "@/apis/prescription-api";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";
import Link from "next/link";
import { format } from "date-fns";
import BookingCard from "../../bookings/features/BookingCard";

const ClientDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const clientId = params?.id as string;

  const isConsultant = authUser?.user?.activeProfile?.type === "CONSULTANT";

  const [tabValue, setTabValue] = useState(0);

  const { data: clientData, isLoading: clientLoading } = useGetClientProfileQuery(
    { path: { id: clientId } },
    { skip: !clientId }
  );

  const { data: sessionsData, isLoading: sessionsLoading } =
    useGetConsultantSessionsQuery(
      {
        params: { clientId, limit: 100 },
      },
      { skip: !clientId || !isConsultant }
    );

  // Get client user ID for fetching prescriptions
  const clientUserId = clientData?.data?.userProfile?.user?.id;

  const { data: prescriptionsData, isLoading: prescriptionsLoading } =
    useGetPrescriptionsQuery(
      {
        params: { skip: 0, take: 100, userId: clientUserId },
      },
      {
        skip: !clientUserId || !isConsultant,
      }
    );

  if (!isConsultant) {
    return (
      <Alert severity="error">
        You don't have permission to view this page.
      </Alert>
    );
  }

  if (clientLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  const client = clientData?.data;
  const clientUser = client?.userProfile?.user;
  const sessions = sessionsData?.data?.data || [];
  const prescriptions = prescriptionsData?.data?.data || [];
  const clientPrescriptions = prescriptions;

  if (!client) {
    return (
      <Alert severity="error" className="mb-4">
        Client not found
      </Alert>
    );
  }

  const clientName = clientUser
    ? `${clientUser.firstName || ""} ${clientUser.lastName || ""}`.trim()
    : client.coverName || "N/A";

  const completedSessions = sessions.filter(
    (s) => s.status === SessionStatus.COMPLETED
  );
  const upcomingSessions = sessions.filter(
    (s) => s.status === SessionStatus.UPCOMING
  );
  const pendingSessions = sessions.filter(
    (s) => s.status === SessionStatus.PENDING
  );

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
      </div>

      {/* Client Profile Card */}
      <Paper variant="outlined" className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar
            src={clientUser?.avatar || undefined}
            sx={{ width: 80, height: 80 }}
          >
            {clientUser?.firstName?.[0]}
            {clientUser?.lastName?.[0]}
          </Avatar>
          <div>
            <Typography variant="h5" className="font-semibold">
              {clientName}
            </Typography>
            {clientUser?.email && (
              <Typography variant="body2" color="text.secondary">
                {clientUser.email}
              </Typography>
            )}
            {client.coverName && (
              <Typography variant="body2" color="text.secondary">
                Cover Name: {client.coverName}
              </Typography>
            )}
          </div>
        </div>

        <Divider className="my-4" />

        <Grid container spacing={3}>
          {client.referral && (
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Referral
              </Typography>
              <Typography variant="body1" className="font-medium">
                {client.referral}
              </Typography>
            </Grid>
          )}
          {client.channel && (
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Channel
              </Typography>
              <Typography variant="body1" className="font-medium">
                {client.channel}
              </Typography>
            </Grid>
          )}
          {client.symptoms && client.symptoms.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Symptoms
              </Typography>
              <div className="flex flex-wrap gap-2">
                {client.symptoms.map((symptom, index) => (
                  <Chip key={index} label={symptom} size="small" />
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper variant="outlined">
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          aria-label="client details tabs"
        >
          <Tab label="Sessions" />
          <Tab label="Prescriptions" />
          <Tab label="Medical Reports" />
        </Tabs>

        <Box className="p-6">
          {tabValue === 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold">
                  All Sessions ({sessions.length})
                </Typography>
                <div className="flex gap-2">
                  <Chip
                    label={`Upcoming: ${upcomingSessions.length}`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={`Completed: ${completedSessions.length}`}
                    color="success"
                    size="small"
                  />
                  <Chip
                    label={`Pending: ${pendingSessions.length}`}
                    color="warning"
                    size="small"
                  />
                </div>
              </div>

              {sessionsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={200} />
                  ))}
                </div>
              ) : sessions.length === 0 ? (
                <Alert severity="info">No sessions found for this client.</Alert>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id}>
                      <BookingCard
                        session={session}
                        isConsultant={true}
                        status={session.status}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button
                          component={Link}
                          href={`/dashboard/sessions/${session.id}`}
                          variant="outlined"
                          size="small"
                          startIcon={
                            <Iconify icon="solar:eye-linear" fontSize={18} />
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tabValue === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold">
                  Prescriptions ({clientPrescriptions.length})
                </Typography>
                <div className="flex gap-2">
                  <Chip
                    label={`Pending: ${clientPrescriptions.filter((p) => p.status === PrescriptionStatus.PENDING).length}`}
                    color="warning"
                    size="small"
                  />
                  <Chip
                    label={`Approved: ${clientPrescriptions.filter((p) => p.status === PrescriptionStatus.APPROVED).length}`}
                    color="success"
                    size="small"
                  />
                  <Chip
                    label={`Rejected: ${clientPrescriptions.filter((p) => p.status === PrescriptionStatus.REJECTED).length}`}
                    color="error"
                    size="small"
                  />
                </div>
              </div>

              {prescriptionsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={200} />
                  ))}
                </div>
              ) : clientPrescriptions.length === 0 ? (
                <Alert severity="info">
                  No prescriptions found for this client.
                </Alert>
              ) : (
                <div className="space-y-4">
                  {clientPrescriptions.map((prescription) => (
                    <Card key={prescription.id} variant="outlined">
                      <CardContent>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Typography variant="h6" className="font-semibold mb-1">
                              Prescription #{prescription.id.slice(0, 8)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Uploaded: {format(
                                new Date(prescription.createdAt),
                                "MMM dd, yyyy h:mm a"
                              )}
                            </Typography>
                          </div>
                          <Chip
                            label={prescription.status}
                            color={
                              prescription.status === PrescriptionStatus.APPROVED
                                ? "success"
                                : prescription.status === PrescriptionStatus.REJECTED
                                ? "error"
                                : "warning"
                            }
                            size="small"
                          />
                        </div>

                        <Divider className="my-3" />

                        <Grid container spacing={2}>
                          {prescription.prescriberType && (
                            <Grid item xs={12} md={6}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Prescriber Type
                              </Typography>
                              <Typography variant="body1" className="font-medium">
                                {prescription.prescriberType}
                              </Typography>
                            </Grid>
                          )}

                          {prescription.prescriberType === "PATIENT" && (
                            <>
                              {prescription.patientName && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Patient Name
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.patientName}
                                  </Typography>
                                </Grid>
                              )}
                              {prescription.patientEmail && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Patient Email
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.patientEmail}
                                  </Typography>
                                </Grid>
                              )}
                              {prescription.patientPhone && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Patient Phone
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.patientPhone}
                                  </Typography>
                                </Grid>
                              )}
                              {prescription.patientLocation && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Location
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.patientLocation}
                                  </Typography>
                                </Grid>
                              )}
                            </>
                          )}

                          {prescription.prescriberType === "DOCTOR" && (
                            <>
                              {prescription.prescriberName && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Prescriber Name
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.prescriberName}
                                  </Typography>
                                </Grid>
                              )}
                              {prescription.hospitalName && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Hospital
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.hospitalName}
                                  </Typography>
                                </Grid>
                              )}
                              {prescription.drugName && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Drug Name
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.drugName}
                                  </Typography>
                                </Grid>
                              )}
                              {prescription.dosage && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Dosage
                                  </Typography>
                                  <Typography variant="body1" className="font-medium">
                                    {prescription.dosage}
                                  </Typography>
                                </Grid>
                              )}
                            </>
                          )}

                          {prescription.additionalNote && (
                            <Grid item xs={12}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Additional Note
                              </Typography>
                              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                {prescription.additionalNote}
                              </Typography>
                            </Grid>
                          )}

                          {prescription.notes && (
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  backgroundColor: "#f5f5f5",
                                  padding: 2,
                                  borderRadius: 1,
                                }}
                              >
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Review Notes
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                  {prescription.notes}
                                </Typography>
                              </Box>
                            </Grid>
                          )}

                          {prescription.fileUrl && (
                            <Grid item xs={12}>
                              <Button
                                variant="outlined"
                                href={prescription.fileUrl}
                                target="_blank"
                                component="a"
                                startIcon={<Iconify icon="solar:document-linear" fontSize={18} />}
                                fullWidth
                              >
                                View Prescription File
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {tabValue === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold">
                  Medical Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All session notes and prescription notes for this client
                </Typography>
              </div>

              {sessionsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={200} />
                  ))}
                </div>
              ) : sessions.length === 0 ? (
                <Alert severity="info">No sessions found for this client.</Alert>
              ) : (
                <div className="space-y-4">
                  {sessions
                    .filter(
                      (session) =>
                        session.prescriptionNote || session.sessionNote || session.note
                    )
                    .map((session) => (
                      <Card key={session.id} variant="outlined">
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <Typography variant="subtitle1" className="font-semibold">
                                Session - {format(
                                  new Date(session.scheduledDate),
                                  "MMMM dd, yyyy h:mm a"
                                )}
                              </Typography>
                              <div className="flex gap-2 mt-1">
                                <Chip
                                  label={session.status}
                                  color={
                                    session.status === SessionStatus.COMPLETED
                                      ? "success"
                                      : session.status === SessionStatus.UPCOMING
                                      ? "primary"
                                      : session.status === SessionStatus.CANCELED
                                      ? "error"
                                      : "default"
                                  }
                                  size="small"
                                />
                                <Chip
                                  label={session.sessionType}
                                  size="small"
                                  variant="outlined"
                                />
                              </div>
                            </div>
                            <Button
                              component={Link}
                              href={`/dashboard/sessions/${session.id}`}
                              variant="outlined"
                              size="small"
                              startIcon={<Iconify icon="solar:eye-linear" fontSize={18} />}
                            >
                              View Details
                            </Button>
                          </div>

                          <Divider className="my-3" />

                          {session.note && (
                            <Box
                              sx={{
                                backgroundColor: "#fff9e6",
                                padding: 2,
                                borderRadius: 1,
                                marginBottom: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                className="font-semibold"
                                gutterBottom
                              >
                                Client Note:
                              </Typography>
                              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                {session.note}
                              </Typography>
                            </Box>
                          )}

                          {session.prescriptionNote && (
                            <Box
                              sx={{
                                backgroundColor: "#f5f5f5",
                                padding: 2,
                                borderRadius: 1,
                                marginBottom: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                className="font-semibold"
                                gutterBottom
                              >
                                Prescription Note:
                              </Typography>
                              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                {session.prescriptionNote}
                              </Typography>
                            </Box>
                          )}

                          {session.sessionNote && (
                            <Box
                              sx={{
                                backgroundColor: "#e3f2fd",
                                padding: 2,
                                borderRadius: 1,
                                marginBottom: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                className="font-semibold"
                                gutterBottom
                              >
                                Session Note/Report:
                              </Typography>
                              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                {session.sessionNote}
                              </Typography>
                            </Box>
                          )}

                          {!session.prescriptionNote &&
                            !session.sessionNote &&
                            !session.note && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                className="italic"
                              >
                                No notes available for this session.
                              </Typography>
                            )}
                        </CardContent>
                      </Card>
                    ))}

                  {sessions.filter(
                    (session) =>
                      session.prescriptionNote || session.sessionNote || session.note
                  ).length === 0 && (
                    <Alert severity="info">
                      No medical reports available. Notes will appear here once sessions have
                      prescription notes or session notes added.
                    </Alert>
                  )}
                </div>
              )}
            </div>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default ClientDetailsPage;

