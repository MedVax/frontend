"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paper, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useConnectCalendarMutation } from "@/apis/calendar-integration-api";
import { useSnackbar } from "notistack";

const CalendarCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [connectCalendarMutation] = useConnectCalendarMutation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");
      const provider = sessionStorage.getItem("calendarProvider") as "google" | "outlook" | "apple" | null;
      console.log({ code, errorParam, provider });
      if (errorParam) {
        setError(`Authorization failed: ${errorParam}`);
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
        return;
      }

      if (!code || !provider) {
        setError("Missing authorization code or provider");
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
        return;
      }

      try {
        await connectCalendarMutation({
          data: {
            provider,
            code,
          },
        }).unwrap();

        sessionStorage.removeItem("calendarProvider");
        enqueueSnackbar("Calendar connected successfully!", { variant: "success" });
        router.push("/dashboard");
      } catch (err: unknown) {
        const errorMessage =
          (err as { data?: { defaultUserMessage?: string } })?.data?.defaultUserMessage ||
          "Failed to connect calendar";
        setError(errorMessage);
        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="h-[calc(100vh-400px)] w-full justify-center flex  mt-20 p-4">
      <Paper variant="outlined" className="p-8 max-w-md w-full h-fit text-center bg-white!">
        {error ? (
          <>
            <Iconify
              icon="solar:close-circle-bold"
              fontSize={64}
              className="text-red-500 mb-4 mx-auto"
            />
            <Typography variant="h6" className="font-semibold mb-2">
              Connection Failed
            </Typography>
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Redirecting to dashboard...
            </Typography>
          </>
        ) : (
          <>
            <CircularProgress className="mb-4 mx-auto" />
            <Typography variant="h6" className="font-semibold mb-2">
              Connecting Calendar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we connect your calendar...
            </Typography>
          </>
        )}
      </Paper>
    </div>
  );
};

export default CalendarCallbackPage;

