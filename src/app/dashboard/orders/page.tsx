"use client";

import React, { useState, useMemo } from "react";
import {
    Button,
    Paper,
    Tab,
    Tabs,
    Typography,
    Chip,
    Pagination,
    Skeleton,
    Alert,
    Box,
} from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Icon as Iconify } from "@iconify/react";
import { useGetOrdersQuery } from "@/apis/order-api";
import { Order, OrderItem, OrderStatus, PaymentStatus, PrescriptionStatus } from "@/types/order";
import currency from "currency.js";

const Orders = () => {
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setPage(1); // Reset to first page when switching tabs
    };

    const tabs = [
        { title: "Ongoing/Delivered", paymentStatus: [PaymentStatus.PAID] },
        { title: "Cancelled/Returned", orderStatus: [OrderStatus.CANCELED, OrderStatus.FAILED_PAYMENT, OrderStatus.FAILED_PAYMENT] },
        { title: "Recurring", isRecurring: true, isRecurringActive: true },
    ];

    const currentTab = tabs[value];

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="orders tabs">
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.title} />
                ))}
            </Tabs>
            <div className="mt-10">
                <OrdersList
                    orderStatus={currentTab.orderStatus}
                    paymentStatus={currentTab?.paymentStatus}
                    isRecurring={currentTab.isRecurring}
                    isRecurringActive={currentTab.isRecurringActive}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

interface OrdersListProps {
    orderStatus?: OrderStatus[];
    paymentStatus?: PaymentStatus[];
    isRecurring?: boolean;
    isRecurringActive?: boolean;
    prescriptionStatus?: PrescriptionStatus[];
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const OrdersList = ({
    orderStatus,
    paymentStatus,
    isRecurring,
    isRecurringActive,
    prescriptionStatus,
    page,
    limit,
    onPageChange,
}: OrdersListProps) => {
    const skip = (page - 1) * limit;

    const { data, isFetching, error } = useGetOrdersQuery({
        params: {
            skip,
            take: limit,
            ...(isRecurring ? { isRecurring: true } : {}),
            ...(orderStatus ? { orderStatus } : {}),
            ...(paymentStatus ? { paymentStatus } : {}),
            ...(isRecurringActive ? { isRecurringActive: true } : {}),
            ...(prescriptionStatus ? { prescriptionStatus } : {}),
        },
    });


    const orders = data?.data?.data ?? []

    const pagination = data?.data;

    if (isFetching) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={150} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error" className="mb-4">
                Failed to load orders. Please try again later.
            </Alert>
        );
    }

    if (orders.length === 0) {
        return (
            <Paper variant="outlined" className="p-8 text-center bg-white!">
                <Iconify icon="solar:box-broken" fontSize={64} className="text-gray-400 mb-4 mx-auto" />
                <Typography variant="h6" className="mb-2">
                    No orders found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {isRecurring
                        ? "You don't have any recurring orders yet."
                        : "Your orders will appear here."}
                </Typography>
            </Paper>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}

            {pagination && pagination.totalRecords > limit && (
                <Box className="flex justify-center mt-6">
                    <Pagination
                        count={pagination.pages}
                        page={page}
                        onChange={(_, newPage) => onPageChange(newPage)}
                        color="primary"
                    />
                </Box>
            )}
        </div>
    );
};

interface OrderCardProps {
    order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const isRecurring = order.isRecurring && order.isRecurringActive;
    const firstItem = order.items?.[0];
    const productImage =
        firstItem?.product?.images && firstItem.product.images.length > 0
            ? firstItem.product.images[0]
            : "/assets/dummy-product.png";

    const getStatusColor = (status: string) => {
        switch (status) {
            case OrderStatus.DELIVERED:
            case OrderStatus.COMPLETED:
                return "success";
            case OrderStatus.CANCELED:
                return "error";
            case OrderStatus.PENDING:
                return "warning";
            default:
                return "info";
        }
    };

    const formatPrice = (amount: number) => {
        return currency(amount / 100).format({ symbol: "₦" });
    };

    return (
        <Paper variant="outlined" className="space-y-4 bg-white! p-4 flex flex-row gap-4 flex-wrap">
            {firstItem && (
                <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                        src={productImage}
                        alt={firstItem.product.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <Typography variant="h6" className="font-semibold">
                        Order {order.id.slice(0, 8)}
                    </Typography>
                    {isRecurring && (
                        <Chip
                            icon={<Iconify icon="solar:refresh-linear" fontSize={16} />}
                            label="Recurring"
                            color="info"
                            variant="soft"
                            size="small"
                        />
                    )}
                    <Chip
                        label={order.orderStatus}
                        color={getStatusColor(order.orderStatus)}
                        variant="soft"
                        size="small"
                    />
                </div>

                <div>
                    {order.items?.slice(0, 3).map((item: OrderItem, index: number) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                            {item.product.name} x{item.quantity}
                        </Typography>
                    ))}
                    {order.items && order.items.length > 3 && (
                        <Typography variant="body2" color="text.secondary">
                            +{order.items.length - 3} more item(s)
                        </Typography>
                    )}
                </div>

                {!isRecurring && (
                    <Typography variant="body2" className="font-semibold" color="text.secondary">
                        on - {format(new Date(order.createdAt), "PPp")}
                    </Typography>
                )}

                {isRecurring && order.nextRunDate && (
                    <div className="flex items-center gap-2 mt-2">
                        <Iconify icon="solar:calendar-linear" fontSize={16} className="text-blue-600" />
                        <Typography variant="body2" className="text-blue-600 font-semibold">
                            Next: {format(new Date(order.nextRunDate), "PPp")}
                        </Typography>
                    </div>
                )}

                <Typography variant="h6" className="font-semibold mt-2">
                    Total: {formatPrice(order.totalAmount)}
                </Typography>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
                <Button variant="soft" color="secondary" disabled>
                    {order.orderStatus}
                </Button>
                <Button component={Link} href={`/dashboard/orders/${order.id}`} variant="outlined">
                    View Details
                </Button>
            </div>
        </Paper>
    );
};

export default Orders;
