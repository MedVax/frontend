"use client";

import React, { useState, useMemo } from "react";
import {
  Typography,
  Button,
  Box,
  Alert,
  Skeleton,
  IconButton,
  ButtonBase,
  Divider,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, startOfDay } from "date-fns";
import clsx from "clsx";

import { useGetConsultantByIdQuery } from "@/apis/consultant-api";
import { useGetConsultantAvailabilitySlotsQuery } from "@/apis/availability-api";
import { useGetClientProfileQuery } from "@/apis/client-api";
import useAuthUser from "@/hooks/use-auth";
import { SessionType, useScheduleSessionsMutation } from "@/apis/session-api";
import AvailabilityBottomSheet from "./AvailabilityBottomSheet";
import BookingSummary from "./BookingSummary";
import { useMediaQuery } from "@mui/material";

interface BookingStep1Props {
  consultantId?: string;
  onNext: (data: any) => void;
}


const BookingStep1 = (props: BookingStep1Props) => {
  const { consultantId, onNext } = props;
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const clientProfileId = authUser?.user?.activeProfile?.userProfileClient;
  const { data: clientData } = useGetClientProfileQuery(
    { path: { id: clientProfileId || "" } },
    { skip: !clientProfileId }
  );

  // Get assigned consultant if no consultantId provided
  const assignedConsultantId = clientData?.data?.userProfileConsultant?.id;
  const finalConsultantId = consultantId || assignedConsultantId;

  const { data: consultantData, isLoading: consultantLoading } = useGetConsultantByIdQuery(
    { path: { id: finalConsultantId || "" } },
    { skip: !finalConsultantId }
  );

  const { data: availabilityData, isLoading: availabilityLoading } =
    useGetConsultantAvailabilitySlotsQuery(
      {
        params: {
          consultantId: finalConsultantId || "",
          date: format(currentMonth, "yyyy-MM-dd"),
        },
      },
      { skip: !finalConsultantId }
    );

  const [scheduleSessions, { isLoading }] = useScheduleSessionsMutation();


  const consultant = consultantData?.data;
  const availabilitySlots = availabilityData?.data || [];

  const validationSchema = Yup.object({
    consultationNote: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      consultationNote: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {

        const result = await scheduleSessions({
          data: {
            consultantId: finalConsultantId || "",
            clientId: clientProfileId || "",
            dates: selectedTimeSlots,
            sessionType: SessionType.CONSULTATION,
            clientTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            redirectUrl: `${window.location.origin}/consultant/${consultantId}/book/success`,
            paidBy: "CLIENT",
            note: values.consultationNote,
          },
        }).unwrap();

        onNext({
          ...result
        });
      } catch (error: unknown) {
        const err = error as { defaultUserMessage?: string; message?: string };
        enqueueSnackbar(err?.defaultUserMessage || err?.message || "Failed to schedule sessions", { variant: "error" });
      }
    },
  });

  const handleDateSelect = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const dayAvailability = availabilitySlots.find(
      (day) => day.date === dateStr && day.slots.some((slot) => slot.isAvailable)
    );

    if (!dayAvailability) {
      enqueueSnackbar("No available slots for this date", { variant: "warning" });
      return;
    }

    if (isMobile) {
      setShowBottomSheet(true);
      // Store the date for bottom sheet
      (window as any).__selectedDateForBooking = dateStr;
    } else {
      // Desktop: show time slots inline
      if (selectedDate === dateStr) {
        setSelectedDate(null);
      } else {
        setSelectedDate(dateStr);
      }
    }
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== timeSlot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
    }
  };


  const handleRemoveSession = (dateStr: string) => {
    setSelectedDate(null);
    setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== dateStr));
  };

  // Calendar days with proper alignment
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const firstDayOfWeek = start.getDay();

    // Add empty cells for days before the first day of the month
    const emptyDays = Array(firstDayOfWeek).fill(null);
    return [...emptyDays, ...days];
  }, [currentMonth]);

  const totalAmount = consultant?.rate
    ? consultant.rate * (selectedTimeSlots.length)
    : 0;

  if (consultantLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  if (!consultant) {
    return (
      <Alert severity="error">
        Consultant not found. Please select a consultant first.
      </Alert>
    );
  }

  const user = consultant.userProfile?.user;
  const consultantName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Consultant";

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Left Column - Date/Time Selection */}
        <div className="sm:w-1/2 w-full flex-1">
          <Typography variant="h6" className="font-semibold">
            Select date & time
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-6">
            Kindly pick a date and time
          </Typography>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <IconButton
                size="small"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                  )
                }
              >
                <Iconify icon="solar:alt-arrow-left-outline" />
              </IconButton>
              <Typography variant="body1" className="font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </Typography>
              <IconButton
                size="small"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                  )
                }
              >
                <Iconify icon="solar:alt-arrow-right-outline" />
              </IconButton>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                <Typography
                  key={idx}
                  variant="caption"
                  className="text-center font-semibold text-gray-500"
                >
                  {day}
                </Typography>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => {
                if (!day) {
                  return <div key={`empty-${idx}`} />;
                }
                const dateStr = format(day, "yyyy-MM-dd");
                const dayAvailability = availabilitySlots.find(
                  (d) => d.date === dateStr
                );
                const hasAvailableSlots =
                  dayAvailability?.slots.some((slot) => slot.isAvailable) || false;
                const isSelected = selectedDate === dateStr;
                const isPast = day < startOfDay(new Date());
                const isDisabled = !hasAvailableSlots || isPast;

                return (
                  <div key={dateStr}>
                    <ButtonBase
                      disabled={isDisabled}
                      onClick={() => handleDateSelect(day)}
                      className={clsx(
                        isSelected
                          ? "bg-primary-main text-white"
                          : hasAvailableSlots && !isPast
                            ? "hover:bg-primary-light hover:text-white text-black cursor-pointer"
                            : "cursor-not-allowed opacity-40",
                        "flex items-center justify-center w-[28px]! h-[28px]! rounded-full sm:w-[36px]! sm:h-[36px]! transition-all"
                      )}
                      sx={{
                        '&:disabled': {
                          opacity: 0.3,
                          cursor: 'not-allowed',
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        className={clsx(
                          "font-semibold",
                          isDisabled && "text-gray-400"
                        )}
                      >
                        {format(day, "d")}
                      </Typography>
                    </ButtonBase>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots (Desktop) */}
          {!isMobile && selectedDate && (
            <div className="space-y-4 mb-6">
              {selectedDate && (() => {
                const dayAvailability = availabilitySlots.find(
                  (d) => d.date === selectedDate
                );
                const availableSlots = dayAvailability?.slots.filter(
                  (slot) => slot.isAvailable
                ) || [];

                if (availableSlots.length === 0) {
                  return (
                    <Typography variant="body2" color="text.secondary" className="text-center py-4">
                      No available time slots for this date
                    </Typography>
                  );
                }

                return (
                  <div key={selectedDate}>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => {
                        const slotTime = format(parseISO(slot.time), "h:mm a");
                        const isSelected = selectedTimeSlots.includes(slot.time);

                        return (
                          <Button
                            key={slot.time}
                            size="small"
                            shape="square"
                            variant={isSelected ? "contained" : "outlined"}
                            color={isSelected ? "primary" : "secondary"}
                            onClick={() => handleTimeSlotSelect(slot.time)}
                            className={isSelected ? "bg-primary-main" : ""}
                          >
                            {slotTime}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Consultation Note */}
          {/* <Box className="mb-6">
            <Typography variant="body2" className="mb-2 font-medium">
              Consultation note
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Drop a note for your consultant"
              name="consultationNote"
              {...getFormikTextFieldProps(formik, "consultationNote")}
            />
          </Box> */}
        </div>

        <Divider orientation="vertical" flexItem />

        {/* Right Column - Summary */}
        <div className="sm:w-1/2 w-full">
          <BookingSummary
            consultant={consultant}
            consultantName={consultantName}
            selectedDate={selectedDate}
            selectedTimeSlots={selectedTimeSlots}
            totalAmount={totalAmount}
            onRemoveSession={handleRemoveSession}
          />
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <AvailabilityBottomSheet
          open={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          availabilitySlots={availabilitySlots}
          selectedTimeSlots={selectedTimeSlots}
          selectedDate={
            (window as any).__selectedDateForBooking
              ? parseISO((window as any).__selectedDateForBooking)
              : null
          }
          onTimeSlotSelect={(dateStr, timeSlot) => {
            if (selectedDate === dateStr) {
              setSelectedDate(null);
            } else {
              setSelectedDate(dateStr);
            }
            handleTimeSlotSelect(timeSlot);
            setShowBottomSheet(false);
          }}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-20">
        <Button variant="outlined" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => formik.handleSubmit()}
          disabled={selectedTimeSlots.length === 0}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default BookingStep1;

