"use client";

import React, { useState } from "react";
import {
    Paper,
    Typography,
    Button,
    Divider,
    Chip,
    Icon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Alert,
    Skeleton,
} from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User } from "@solar-icons/react";
import { Icon as Iconify } from "@iconify/react";
import {
    OrderStatus,
    PaymentStatus,
    PrescriptionStatus,
    OrderRecurringFrequency,
} from "@/types/order";
import Currency from "@/enums/currency";
import { useCancelRecurringOrderMutation, useGetOrderByIdQuery } from "@/apis/order-api";

const OrderDetails = () => {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id as string;
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelRecurringOrder, { isLoading: isCancelling }] = useCancelRecurringOrderMutation();

    const { data, isLoading, error } = useGetOrderByIdQuery(
        { path: { id: orderId } },
        { skip: !orderId }
    );

    const order = data?.data;

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={100} />
                ))}
            </div>
        );
    }

    if (error || !order) {
        return (
            <Alert severity="error">
                Failed to load order details. <Button onClick={() => router.push("/dashboard/orders")}>Go back</Button>
            </Alert>
        );
    }


    const formatPrice = (amount: number, currencyCode: string = "NGN") => {
        const currency = Currency[currencyCode as keyof typeof Currency] || Currency.NGN;
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: currency.code,
        }).format(amount / 100);
    };

    const getStatusColor = (
        status: OrderStatus | PaymentStatus | PrescriptionStatus | OrderRecurringFrequency
    ) => {
        const statusMap: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
            [OrderStatus.COMPLETED]: "success",
            [OrderStatus.DELIVERED]: "success",
            [OrderStatus.ACCEPTED]: "info",
            [OrderStatus.PROCESSING]: "info",
            [OrderStatus.READY_FOR_DISPATCH]: "info",
            [OrderStatus.IN_TRANSIT]: "info",
            [OrderStatus.CANCELED]: "error",
            [OrderStatus.FAILED_PAYMENT]: "error",
            [PaymentStatus.PAID]: "success",
            [PaymentStatus.FAILED]: "error",
            [PaymentStatus.REFUNDED]: "info",
            [PaymentStatus.PARTIALLY_REFUNDED]: "warning",
            [PrescriptionStatus.APPROVED]: "success",
            [PrescriptionStatus.REJECTED]: "error",
            [OrderRecurringFrequency.DAILY]: "info",
            [OrderRecurringFrequency.WEEKLY]: "info",
            [OrderRecurringFrequency.MONTHLY]: "info",
        };
        // Handle PENDING separately to avoid conflicts
        if (
            status === OrderStatus.PENDING ||
            status === PaymentStatus.PENDING ||
            status === PrescriptionStatus.PENDING
        ) {
            return "warning";
        }
        return statusMap[status] || "default";
    };

    const getStatusLabel = (
        status: OrderStatus | PaymentStatus | PrescriptionStatus | OrderRecurringFrequency
    ) => {
        return status
            .split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ");
    };

    const handleCancelRecurringOrder = async () => {
        try {
            await cancelRecurringOrder({ path: { id: orderId } }).unwrap();
            setCancelDialogOpen(false);
            // Update local state - in real app, this would be handled by cache invalidation
            // For dummy data, we'll just show a success message
        } catch (error) {
            console.error("Failed to cancel recurring order:", error);
        }
    };


    const deliveryAddress = order.deliveryAddress
        ? {
            addressLine1: order.deliveryAddress.addressLine1,
            addressLine2: order.deliveryAddress.addressLine2,
            city: order.deliveryAddress.city,
            state: order.deliveryAddress.state,
            postalCode: order.deliveryAddress.postalCode,
            country: order.deliveryAddress.country,
        }
        : order.guestAddressLine1
            ? {
                addressLine1: order.guestAddressLine1,
                addressLine2: order.guestAddressLine2,
                city: order.guestCity,
                state: order.guestState,
                postalCode: order.guestPostalCode,
                country: order.guestCountry,
            }
            : null;

    const customerName = order.user
        ? `${order.user.firstName} ${order.user.lastName}`
        : `${order.guestFirstName} ${order.guestLastName}`;

    const customerEmail = order.user?.email || order.guestEmail;
    const customerPhone = order.guestPhone;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outlined"
                        startIcon={<Icon><ArrowLeft /></Icon>}
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                    <div>
                        <Typography variant="h4" className="font-semibold">
                            Order Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Order ID: {order.id}
                        </Typography>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {order.isRecurring && order.isRecurringActive && (
                        <Chip
                            icon={<Iconify icon="solar:refresh-linear" fontSize={18} />}
                            label="Recurring Order"
                            color="info"
                            variant="soft"
                        />
                    )}
                    <Chip
                        label={`Order: ${getStatusLabel(order.orderStatus)}`}
                        color={getStatusColor(order.orderStatus)}
                        variant="soft"
                    />
                    <Chip
                        label={`Payment: ${getStatusLabel(order.paymentStatus)}`}
                        color={getStatusColor(order.paymentStatus)}
                        variant="soft"
                    />
                </div>
            </div>

            {/* Recurring Order Banner */}
            {order.isRecurring && order.isRecurringActive && (
                <Paper
                    variant="outlined"
                    className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-3">
                            <Iconify
                                icon="solar:refresh-linear"
                                fontSize={32}
                                className="text-blue-600 mt-1"
                            />
                            <div>
                                <Typography variant="h6" className="font-semibold text-blue-900">
                                    Recurring Order Active
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="mt-1">
                                    This order is set to automatically repeat every{" "}
                                    <span className="font-semibold">
                                        {getStatusLabel(order.recurringFrequency || OrderRecurringFrequency.WEEKLY).toLowerCase()}
                                    </span>
                                </Typography>
                                {order.nextRunDate && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <Iconify icon="solar:calendar-linear" fontSize={18} className="text-blue-600" />
                                        <Typography variant="body2" className="font-semibold text-blue-900">
                                            Next order scheduled for: {format(new Date(order.nextRunDate), "PPp")}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setCancelDialogOpen(true)}
                            startIcon={<Iconify icon="solar:close-circle-linear" fontSize={20} />}
                        >
                            Cancel Recurring Order
                        </Button>
                    </div>
                </Paper>
            )}

            {order.isRecurring && !order.isRecurringActive && (
                <Alert severity="info" className="mb-4">
                    This recurring order has been cancelled and will not repeat automatically.
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <Paper variant="outlined" className="p-6 bg-white!">
                        <Typography variant="h6" className="font-semibold mb-4">
                            Order Items ({order.items.length})
                        </Typography>
                        <Divider className="mb-4" />
                        <div className="space-y-4">
                            {order.items.map((item) => {
                                const productImage =
                                    item.product.images && item.product.images.length > 0
                                        ? item.product.images[0]
                                        : "/assets/dummy-product.png";
                                const itemTotal = item.unitPrice * item.quantity;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                                    >
                                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <Image
                                                src={productImage}
                                                alt={item.product.name}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Typography variant="h6" className="font-semibold">
                                                {item.product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                SKU: {item.product.sku}
                                            </Typography>
                                            {item.product.category && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Category: {item.product.category.name}
                                                </Typography>
                                            )}
                                            <div className="mt-2 flex items-center gap-4 flex-wrap">
                                                <Typography variant="body2">
                                                    Quantity: <span className="font-semibold">{item.quantity}</span>
                                                </Typography>
                                                <Typography variant="body2">
                                                    Unit Price:{" "}
                                                    <span className="font-semibold">
                                                        {formatPrice(item.unitPrice, order.currency)}
                                                    </span>
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Typography variant="h6" className="font-semibold">
                                                {formatPrice(itemTotal, order.currency)}
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Paper>

                    {/* Prescriptions */}
                    {order.prescriptions && order.prescriptions.length > 0 && (
                        <Paper variant="outlined" className="p-6 bg-white!">
                            <Typography variant="h6" className="font-semibold mb-4">
                                Prescriptions ({order.prescriptions.length})
                            </Typography>
                            <Divider className="mb-4" />
                            <div className="space-y-4">
                                {order.prescriptions.map((prescription) => (
                                    <div
                                        key={prescription.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <Typography variant="body1" className="font-semibold">
                                                Prescription #{prescription.id.slice(0, 8)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Status: {getStatusLabel(prescription.status)}
                                            </Typography>
                                        </div>
                                        <Chip
                                            label={getStatusLabel(prescription.status)}
                                            color={getStatusColor(prescription.status)}
                                            variant="soft"
                                            size="small"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <Paper variant="outlined" className="p-6 bg-white!">
                        <Typography variant="h6" className="font-semibold mb-4">
                            Order Summary
                        </Typography>
                        <Divider className="mb-4" />
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Typography variant="body2" color="text.secondary">
                                    Order Date
                                </Typography>
                                <Typography variant="body2" className="font-semibold">
                                    {format(new Date(order.createdAt), "PPp")}
                                </Typography>
                            </div>
                            {order.updatedAt !== order.createdAt && (
                                <div className="flex justify-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Last Updated
                                    </Typography>
                                    <Typography variant="body2" className="font-semibold">
                                        {format(new Date(order.updatedAt), "PPp")}
                                    </Typography>
                                </div>
                            )}
                            {order.paymentReference && (
                                <div className="flex justify-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Payment Reference
                                    </Typography>
                                    <Typography variant="body2" className="font-semibold">
                                        {order.paymentReference}
                                    </Typography>
                                </div>
                            )}
                            {order.paymentProvider && (
                                <div className="flex justify-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Payment Provider
                                    </Typography>
                                    <Typography variant="body2" className="font-semibold capitalize">
                                        {order.paymentProvider}
                                    </Typography>
                                </div>
                            )}
                            {order.isRecurring && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Iconify icon="solar:refresh-linear" fontSize={20} className="text-blue-600" />
                                        <Typography variant="body2" className="font-semibold text-blue-900">
                                            Recurring Order {order.isRecurringActive ? "(Active)" : "(Cancelled)"}
                                        </Typography>
                                    </div>
                                    {order.recurringFrequency && (
                                        <Typography variant="body2" color="text.secondary" className="mb-1">
                                            Frequency: {getStatusLabel(order.recurringFrequency)}
                                        </Typography>
                                    )}
                                    {order.recurringDate && (
                                        <Typography variant="body2" color="text.secondary" className="mb-1">
                                            Started: {format(new Date(order.recurringDate), "PPp")}
                                        </Typography>
                                    )}
                                    {order.nextRunDate && order.isRecurringActive && (
                                        <Typography variant="body2" className="font-semibold text-blue-900">
                                            Next Order: {format(new Date(order.nextRunDate), "PPp")}
                                        </Typography>
                                    )}
                                </div>
                            )}
                            <Divider className="my-4" />
                            <div className="flex justify-between">
                                <Typography variant="h6" className="font-semibold">
                                    Total Amount
                                </Typography>
                                <Typography variant="h6" className="font-semibold">
                                    {formatPrice(order.totalAmount, order.currency)}
                                </Typography>
                            </div>
                        </div>
                    </Paper>

                    {/* Customer Information */}
                    <Paper variant="outlined" className="p-6 bg-white!">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon fontSize="small"><User /></Icon>
                            <Typography variant="h6" className="font-semibold">
                                Customer Information
                            </Typography>
                        </div>
                        <Divider className="mb-4" />
                        <div className="space-y-3">
                            <div>
                                <Typography variant="body2" color="text.secondary">
                                    Name
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {customerName}
                                </Typography>
                            </div>
                            {customerEmail && (
                                <div className="flex items-center gap-2">
                                    <Iconify icon="solar:letter-linear" fontSize={18} />
                                    <Typography variant="body2">{customerEmail}</Typography>
                                </div>
                            )}
                            {customerPhone && (
                                <div className="flex items-center gap-2">
                                    <Iconify icon="solar:phone-calling-linear" fontSize={18} />
                                    <Typography variant="body2">{customerPhone}</Typography>
                                </div>
                            )}
                        </div>
                    </Paper>

                    {/* Delivery Address */}
                    {deliveryAddress && (
                        <Paper variant="outlined" className="p-6 bg-white!">
                            <div className="flex items-center gap-2 mb-4">
                                <Iconify icon="solar:map-point-linear" fontSize={20} />
                                <Typography variant="h6" className="font-semibold">
                                    Delivery Address
                                </Typography>
                            </div>
                            <Divider className="mb-4" />
                            <div className="space-y-1">
                                <Typography variant="body2">
                                    {deliveryAddress.addressLine1}
                                </Typography>
                                {deliveryAddress.addressLine2 && (
                                    <Typography variant="body2">
                                        {deliveryAddress.addressLine2}
                                    </Typography>
                                )}
                                <Typography variant="body2">
                                    {deliveryAddress.city}, {deliveryAddress.state}
                                </Typography>
                                {deliveryAddress.postalCode && (
                                    <Typography variant="body2">
                                        {deliveryAddress.postalCode}
                                    </Typography>
                                )}
                                <Typography variant="body2" className="font-semibold">
                                    {deliveryAddress.country}
                                </Typography>
                            </div>
                        </Paper>
                    )}

                    {/* Order Notes */}
                    {order.notes && (
                        <Paper variant="outlined" className="p-6 bg-white!">
                            <div className="flex items-center gap-2 mb-4">
                                <Iconify icon="solar:document-text-linear" fontSize={20} />
                                <Typography variant="h6" className="font-semibold">
                                    Order Notes
                                </Typography>
                            </div>
                            <Divider className="mb-4" />
                            <Typography variant="body2">{order.notes}</Typography>
                        </Paper>
                    )}
                </div>
            </div>

            {/* Cancel Recurring Order Dialog */}
            <Dialog
                open={cancelDialogOpen}
                onClose={() => setCancelDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Cancel Recurring Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this recurring order? This will stop all future
                        automatic orders from being placed. The current order will remain unchanged, but no
                        new orders will be created automatically.
                    </DialogContentText>
                    {order.nextRunDate && (
                        <Alert severity="warning" className="mt-3">
                            The next scheduled order is on {format(new Date(order.nextRunDate), "PPp")}.
                            Cancelling will prevent this and all future orders.
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialogOpen(false)} disabled={isCancelling}>
                        Keep Recurring Order
                    </Button>
                    <Button
                        onClick={handleCancelRecurringOrder}
                        color="error"
                        variant="contained"
                        disabled={isCancelling}
                    >
                        {isCancelling ? "Cancelling..." : "Cancel Recurring Order"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderDetails;
