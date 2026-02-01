"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  Alert,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Shell } from "@/components/ui";
import {
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

  const order = data?.data;

  // If reference is provided, verify payment
  useEffect(() => {
    const reference = searchParams.get("reference");
    if (reference && orderId) {
      // Payment verification would happen via webhook, but we can show success
    }
  }, [searchParams, orderId]);

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

  if (isLoading) {
    return (
      <Shell component="section" className="my-20">
        <Box className="text-center py-12">
          <Iconify icon="solar:refresh-circle-bold-duotone" fontSize={64} className="animate-spin mb-4" />
          <Typography variant="h6">Loading order details...</Typography>
        </Box>
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
        {!order.isRecurring && order.paymentStatus === "PAID" && (
          <Paper variant="outlined" className="p-6 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
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
        )}

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
        <Dialog
          open={recurringDialogOpen}
          onClose={() => setRecurringDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Set Order as Recurring</DialogTitle>
          <DialogContent>
            <DialogContentText className="mb-4">
              Choose how often you want this order to be automatically placed.
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={recurringFrequency}
                onChange={(e) =>
                  setRecurringFrequency(e.target.value as OrderRecurringFrequency)
                }
                label="Frequency"
              >
                <MenuItem value={OrderRecurringFrequency.WEEKLY}>Weekly</MenuItem>
                <MenuItem value={OrderRecurringFrequency.MONTHLY}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRecurringDialogOpen(false)} disabled={isSettingRecurring}>
              Cancel
            </Button>
            <Button
              onClick={handleSetRecurring}
              variant="contained"
              disabled={isSettingRecurring}
            >
              {isSettingRecurring ? "Setting..." : "Set Recurring"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Shell>
  );
};

export default CheckoutSuccess;

