"use client";

import React, { Fragment } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { format, parseISO } from "date-fns";
import { Consultant } from "@/apis/consultant-api";
import currency from "currency.js";

interface BookingSummaryProps {
  consultant: Consultant;
  consultantName: string;
  selectedDate: string | null;
  selectedTimeSlots: string[];
  totalAmount: number;
  onRemoveSession: (dateStr: string) => void;
}

const BookingSummary = ({
  consultant,
  consultantName,
  selectedTimeSlots,
  totalAmount,
  onRemoveSession,
}: BookingSummaryProps) => {
  const user = consultant.userProfile?.user;
  const avatar = user?.avatar;
  const rate = consultant.rate || 0;

  const priceInfo = [
    {
      label: "Total Sessions:",
      icon: "solar:calendar-outline",
      value: selectedTimeSlots.length + " Session" + (selectedTimeSlots.length !== 1 ? "s" : ""),
    },
    {
      label: "Per Session:",
      icon: "solar:wallet-money-outline",
      value: currency(rate).format({ symbol: "₦" }),
    },
    {
      label: "Total amount:",
      icon: "solar:calendar-mark-outline",
      value: currency(totalAmount).format({ symbol: "₦" }),
    },
  ];

  return (
    <div className="sticky top-50 h-full">
      <Typography variant="h6" className="font-semibold mb-4">
        Summary details
      </Typography>

      {/* Consultant Info */}
      <div className="flex items-center gap-3 mb-6">
        <Avatar src={avatar || undefined} sx={{ width: 50, height: 50 }}>
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </Avatar>
        <div>
          <Typography variant="subtitle1" className="font-semibold capitalize">
            {consultantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {consultant.jobTitle || "Consultant"}
          </Typography>
        </div>
      </div>


      {/* Session Summary */}
      <Box className="space-y-3 mb-4 flex flex-row justify-between gap-3">
        {priceInfo.map((info, index) => (
          <div className="flex flex-col items-center" key={info.label}>
            <div className="flex items-center gap-1">
              <Iconify icon={info.icon} fontSize={12} className="text-primary-main" />
              <Typography variant="caption">{info.label}</Typography>
            </div>
            <Typography variant="body2" className="font-bold">
              {info.value}
            </Typography>
          </div>
        ))}
      </Box>


      {/* Booked Sessions */}
      <div className="max-h-[350px] overflow-y-auto scrollbar-hidden">
        {selectedTimeSlots?.length > 0 && (
          <div className="space-y-3">
            {selectedTimeSlots.map((selectedTimeSlot) => (
              <Paper key={selectedTimeSlot} variant="outlined" className="p-[24px] rounded-[16px] bg-gray-50 border-dashed flex items-center justify-between bg-white">
                {[
                  {
                    label: "Date",
                    icon: "solar:calendar-outline",
                    value: format(parseISO(selectedTimeSlot), "MMM d, yyyy"),
                  },
                  {
                    label: "Time",
                    icon: "solar:clock-circle-outline",
                    value: format(parseISO(selectedTimeSlot), "h:mm a"),
                  },
                ].map((item) => (
                  <Fragment key={item.label} >
                    <div className="flex items-center gap-2">
                      <Iconify icon={item.icon} fontSize={16} />
                      <div className="flex flex-col">
                        <Typography variant="body1" className="font-medium text-gray-500">{item.label}</Typography>
                        <Typography variant="body2" className="font-semibold">{item.value}</Typography>
                      </div>
                    </div>
                  </Fragment>
                ))}


                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onRemoveSession(selectedTimeSlot)}
                >
                  <Iconify icon="mdi:trash-can" fontSize={18} />
                </IconButton>
              </Paper>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingSummary;

