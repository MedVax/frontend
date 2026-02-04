"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  Alert,
  Box,
  Chip,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Shell } from "@/components/ui";
import {
  orderApi,
  useGetOrderByIdQuery,
  useSetOrderRecurringMutation,
} from "@/apis/order-api";
import { OrderRecurringFrequency } from "@/types/order";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import Currency from "@/enums/currency";

const CheckoutSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const orderId = searchParams.get("orderId") || searchParams.get("reference");
  const [recurringDialogOpen, setRecurringDialogOpen] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<OrderRecurringFrequency>(
    OrderRecurringFrequency.WEEKLY
  );

  const { data, isLoading } = useGetOrderByIdQuery(
    { path: { id: orderId || "" } },
    { skip: !orderId }
  );
  const [setRecurring, { isLoading: isSettingRecurring }] = useSetOrderRecurringMutation();

  const [verifyPaymentMutation, verifyPaymentMutationResult] = orderApi.useVerifyPaymentMutation();

  const order = data?.data;

  const manuallyVerifyPayment = async () => {
    const reference = searchParams.get("reference");

    if (!reference) return;
    try {
      await verifyPaymentMutation({ path: { reference } }).unwrap();
    } catch (error: any) {
      enqueueSnackbar(error?.defaultUserMessage || error?.message || "Failed to verify payment", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    manuallyVerifyPayment();
  }, [searchParams]);

  const formatPrice = (amount: number, currencyCode: string = "NGN") => {
    const currencyObj = Currency[currencyCode as keyof typeof Currency] || Currency.NGN;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currencyObj.code,
    }).format(amount / 100);
  };

  const handleSetRecurring = async () => {
    if (!orderId) return;
    try {
      await setRecurring({
        path: { id: orderId },
        data: {
          isRecurring: true,
          recurringFrequency,
        },
      }).unwrap();
      enqueueSnackbar("Order set as recurring successfully", { variant: "success" });
      setRecurringDialogOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to set order as recurring", {
        variant: "error",
      });
    }
  };

  if (isLoading || verifyPaymentMutationResult.isLoading) {
    return (
      <Shell component="section" className="my-20">
        <Box className="text-center py-12">
          <Iconify icon="mdi:loading" fontSize={64} className="animate-spin mb-4 mx-auto" />
          <Typography variant="h6">Loading order details...</Typography>
        </Box>
      </Shell>
    );
  }

  if (verifyPaymentMutationResult.isError) {
    return (
      <Shell component="section" className="my-20">
        <Alert severity="error" className="mb-4">
          Failed to verify payment. Please try again.
        </Alert>
        <Button variant="contained" onClick={() => router.refresh()}>
          Refresh Page
        </Button>
      </Shell>
    );
  }

  if (!order) {
    return (
      <Shell component="section" className="my-20">
        <Alert severity="error" className="mb-4">
          Order not found
        </Alert>
        <Button variant="contained" component={Link} href="/dashboard/orders">
          Go to Orders
        </Button>
      </Shell>
    );
  }

  return (
    <Shell component="section" className="my-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <Box className="mb-6">
          <Iconify
            icon="solar:check-circle-bold-duotone"
            fontSize={120}
            className="text-green-500 mx-auto"
          />
        </Box>

        <Typography variant="h3" className="font-semibold mb-4">
          Order Placed Successfully!
        </Typography>

        <Typography variant="body1" color="text.secondary" className="mb-8">
          Thank you for your order. Your order has been received and is being processed.
        </Typography>

        {/* Order Details */}
        <Paper variant="outlined" className="p-6 mb-6 text-left">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="body2" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {order.id}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body2" color="text.secondary">
                Order Date
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {format(new Date(order.createdAt), "PPp")}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="h6" className="font-semibold">
                {formatPrice(order.totalAmount, order.currency)}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body2" color="text.secondary">
                Payment Status
              </Typography>
              <Chip
                label={order.paymentStatus}
                color={order.paymentStatus === "PAID" ? "success" : "warning"}
                variant="soft"
                size="small"
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body2" color="text.secondary">
                Order Status
              </Typography>
              <Chip
                label={order.orderStatus}
                color="info"
                variant="soft"
                size="small"
              />
            </div>
          </div>
        </Paper>

        {/* Recurring Order Option */}
        {/* {!order.isRecurring && order.paymentStatus === "PAID" && (
          <Paper variant="outlined" className="p-6 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Iconify icon="solar:refresh-linear" fontSize={24} className="text-blue-600" />
              <Typography variant="h6" className="font-semibold text-blue-900">
                Make this order recurring?
              </Typography>
            </div>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Set this order to automatically repeat so you never run out of your medications.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setRecurringDialogOpen(true)}
              startIcon={<Iconify icon="solar:refresh-linear" fontSize={20} />}
            >
              Set as Recurring Order
            </Button>
          </Paper>
        )} */}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="outlined"
            component={Link}
            href={`/dashboard/orders/${order.id}`}
            startIcon={<Iconify icon="solar:document-text-linear" fontSize={20} />}
          >
            View Order Details
          </Button>
          <Button
            variant="contained"
            component={Link}
            href="/dashboard/orders"
            startIcon={<Iconify icon="solar:box-broken" fontSize={20} />}
          >
            Go to Orders
          </Button>
        </div>

        {/* Recurring Order Dialog */}
        {/* <Dialog
          open={recurringDialogOpen}
          onClose={() => setRecurringDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Set Order as Recurring</DialogTitle>
          <DialogContent>
            <DialogContentText className="mb-4">
              Choose how often you want this order to be automatically placed.
            </DialogContentText>
            <TextField
              label="Frequency"
              value={recurringFrequency}
              onChange={(e) => setRecurringFrequency(e.target.value as OrderRecurringFrequency)}
              fullWidth
              select
              size="small"
            >
              <MenuItem value={OrderRecurringFrequency.WEEKLY}>Weekly</MenuItem>
              <MenuItem value={OrderRecurringFrequency.MONTHLY}>Monthly</MenuItem>
            </TextField>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRecurringDialogOpen(false)} disabled={isSettingRecurring}>
              Cancel
            </Button>
            <Button
              onClick={handleSetRecurring}
              variant="contained"
              disabled={isSettingRecurring}
              startIcon={<Iconify icon="solar:refresh-linear" fontSize={20} />}
            >
              {isSettingRecurring ? "Setting..." : "Set Recurring"}
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </Shell>
  );
};

export default CheckoutSuccess;

