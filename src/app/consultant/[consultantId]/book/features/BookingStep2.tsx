"use client";

import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Alert,
  CircularProgress,

} from "@mui/material";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useScheduleSessionsMutation } from "@/apis/session-api";

interface BookingStep2Props {
  bookingData: any;
  onBack: () => void;
  onComplete: () => void;
  consultantId: string;
}

const BookingStep2 = ({ bookingData, onBack, onComplete, consultantId }: BookingStep2Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const initializeBooking = async () => {
    if (!bookingData) {
      enqueueSnackbar("Booking data is missing", { variant: "error" });
      onBack();
      return;
    }

    try {

      const result = bookingData;

      if (result.data?.paymentLink) {
        console.log({ result });
        // Store session IDs in sessionStorage for after payment
        if (result.data?.sessions) {
          const sessionIds = result.data.sessions.map((s: any) => s.id);
          sessionStorage.setItem("pendingSessionIds", JSON.stringify(sessionIds));
        }
        // Redirect to payment
        window.location.href = result.data.paymentLink;
      } else if (result.data?.sessions) {
        // Sessions created without payment (shouldn't happen normally)
        const sessionIds = result.data.sessions.map((s: any) => s.id);
        enqueueSnackbar("Sessions booked successfully", { variant: "success" });
        router.push(`/consultant/${consultantId}/book/notes?sessionIds=${sessionIds.join(",")}`);
      }
    } catch (error: unknown) {
      const err = error as { defaultUserMessage?: string; message?: string };
      const errorMessage =
        err?.defaultUserMessage || err?.message ||
        "Failed to initialize booking";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  useEffect(() => {

    initializeBooking();
  }, []);

  return (
    <Box>
      <Typography variant="h6" className="font-semibold mb-4">
        Processing Payment
      </Typography>
      <Alert severity="info" className="mb-4">
        You will be redirected to the payment page shortly...
      </Alert>
      <Box className="flex items-center justify-center py-8">
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default BookingStep2;

