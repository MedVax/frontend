"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  Chip,
  Alert,
  Skeleton,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetIntegrationsQuery,
  useDisconnectCalendarMutation,
  calendarIntegrationApi,
} from "@/apis/calendar-integration-api";
import { useSnackbar } from "notistack";
import { format } from "date-fns";


const CalendarIntegrationComponent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useGetIntegrationsQuery({});
  const [disconnectCalendarMutation, { isLoading: isDisconnecting }] = useDisconnectCalendarMutation();
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<"google" | "outlook" | "apple" | null>(null);

  const [getAuthUrlMutation] = calendarIntegrationApi.useLazyGetAuthUrlQuery();
  const integrations = data?.data || [];

  const handleConnect = async (provider: "google" | "outlook" | "apple") => {
    try {
      // const redirectUri = `${window.location.origin}/dashboard/calendar/callback`;
      const redirectUri = "https://sohvay.com:4500/google";
      const result = await getAuthUrlMutation({
        params: {
          provider,
          redirectUri,
        },
      }).unwrap();

      if (result.data?.authUrl) {
        // Store provider in sessionStorage for callback
        sessionStorage.setItem("calendarProvider", provider);
        // window.location.href = result.data.authUrl;
        window.open(result.data.authUrl, "_blank");
      }
    } catch (error) {
      enqueueSnackbar("Failed to initiate calendar connection", { variant: "error" });
    }
  };

  const handleDisconnect = async () => {
    if (!selectedProvider) return;

    try {
      await disconnectCalendarMutation({
        path: { provider: selectedProvider },
      }).unwrap();
      enqueueSnackbar("Calendar disconnected successfully", { variant: "success" });
      setDisconnectDialogOpen(false);
      setSelectedProvider(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to disconnect calendar";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const openDisconnectDialog = (provider: "google" | "outlook" | "apple") => {
    setSelectedProvider(provider);
    setDisconnectDialogOpen(true);
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "logos:google-icon";
      case "outlook":
        return "vscode-icons:file-type-outlook";
      case "apple":
        return "logos:apple";
      default:
        return "solar:calendar-outline";
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "google":
        return "Google Calendar";
      case "outlook":
        return "Outlook Calendar";
      case "apple":
        return "Apple Calendar";
      default:
        return provider;
    }
  };

  const connectedIntegrations = integrations.filter((i) => i.isConnected);
  const availableProviders: Array<"google" | "outlook" | "apple"> = ["google"];
  const connectedProviders = connectedIntegrations.map((i) => i.provider);

  return (
    <Paper variant="outlined" className="p-6 bg-white!">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="font-semibold">
          Calendar Integration
        </Typography>
        <Iconify icon="solar:calendar-mark-outline" fontSize={24} className="text-primary-main" />
      </div>
      <Divider className="mb-4" />

      {isLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <div className="space-y-4">
          {/* Connected Calendars */}
          {connectedIntegrations.length > 0 && (
            <div>
              <Typography variant="subtitle2" className="font-semibold mb-3 text-gray-700">
                Connected Calendars
              </Typography>
              <div className="space-y-3">
                {connectedIntegrations.map((integration) => (
                  <Box
                    key={integration.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Iconify
                        icon={getProviderIcon(integration.provider)}
                        fontSize={32}
                      />
                      <div>
                        <Typography variant="body1" className="font-semibold">
                          {getProviderName(integration.provider)}
                        </Typography>
                        {integration.providerEmail && (
                          <Typography variant="caption" color="text.secondary">
                            {integration.providerEmail}
                          </Typography>
                        )}
                        {integration.lastSyncedAt && (
                          <Typography variant="caption" color="text.secondary" className="block">
                            Last synced: {format(new Date(integration.lastSyncedAt), "MMM d, yyyy")}
                          </Typography>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip
                        label="Connected"
                        color="success"
                        size="small"
                        variant="soft"
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => openDisconnectDialog(integration.provider)}
                      >
                        <Iconify icon="solar:unlink-outline" fontSize={20} />
                      </IconButton>
                    </div>
                  </Box>
                ))}
              </div>
            </div>
          )}

          {/* Available Providers */}
          {availableProviders.filter((p) => !connectedProviders.includes(p)).length > 0 && (
            <div>
              <Typography variant="subtitle2" className="font-semibold mb-3 text-gray-700">
                {connectedIntegrations.length > 0 ? "Connect More Calendars" : "Connect Your Calendar"}
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availableProviders
                  .filter((p) => !connectedProviders.includes(p))
                  .map((provider) => (
                    <Button
                      key={provider}
                      variant="outlined"
                      fullWidth
                      startIcon={<Iconify icon={getProviderIcon(provider)} fontSize={24} />}
                      onClick={() => handleConnect(provider)}
                      className="h-16"
                    >
                      Connect {getProviderName(provider)}
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {connectedIntegrations.length === 0 && (
            <Alert severity="info">
              Connect your calendar to automatically sync your sessions and receive reminders.
            </Alert>
          )}
        </div>
      )}

      {/* Disconnect Dialog */}
      <Dialog open={disconnectDialogOpen} onClose={() => setDisconnectDialogOpen(false)}>
        <DialogTitle>Disconnect Calendar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to disconnect {selectedProvider && getProviderName(selectedProvider)}?
            You will no longer receive automatic calendar sync for your sessions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisconnectDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDisconnect}
            color="error"
            variant="contained"
            disabled={isDisconnecting}
          >
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CalendarIntegrationComponent;

