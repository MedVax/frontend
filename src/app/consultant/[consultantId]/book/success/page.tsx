"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Paper, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useSnackbar } from "notistack";
import { sessionApi } from "@/apis/session-api";

const BookingSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const consultantId = params?.consultantId as string;
  const reference = searchParams.get("reference");

  const [verifySessionPaymentMutation] = sessionApi.useVerifySessionPaymentMutation();

  async function verifySessionPayment(reference: string) {
    enqueueSnackbar("Payment successful! Redirecting to notes...", {
      variant: "success",
    });

    try {
      const result = await verifySessionPaymentMutation({
        path: { reference },
      }).unwrap()

      const sessionIds = result.data?.map((session: any) => session.id);

      setTimeout(() => {
        if (sessionIds.length > 0) {
          router.push(`/consultant/${consultantId}/book/notes?sessionIds=${sessionIds.join(",")}`);
        } else {
          router.push(`/consultant/${consultantId}/book/notes`);
        }
      }, 2000);
    } catch (error) {
      const err = error as { defaultUserMessage?: string; message?: string };
      enqueueSnackbar(err?.defaultUserMessage || err?.message || "Failed to verify session payment", {
        variant: "error",
      });
    }
  }

  useEffect(() => {
    verifySessionPayment(reference || "");
  }, [reference]);

  return (
    <div className="space-y-6">
      <Paper variant="outlined" className="p-8 text-center bg-white! mx-auto max-w-md">
        <Iconify
          icon="solar:check-circle-bold"
          fontSize={64}
          className="text-green-500 mb-4 mx-auto"
        />
        <Typography variant="h4" className="font-semibold mb-2">
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" className="mb-6">
          Your booking has been confirmed. You will be redirected to add session notes.
        </Typography>
        {/* <Button
          variant="contained"
          component={Link}
          href={`/consultant/${consultantId}/book/notes?sessionIds=${selectedSessionIds.join(",")}`}
        >
          Go to Session Notes
        </Button> */}
      </Paper>
    </div>
  );
};

export default BookingSuccessPage;

