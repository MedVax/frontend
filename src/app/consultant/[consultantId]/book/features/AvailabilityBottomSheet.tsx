"use client";

import React from "react";
import {
  Drawer,
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { format, parseISO } from "date-fns";
import { DayAvailability } from "types/availability";

interface AvailabilityBottomSheetProps {
  open: boolean;
  onClose: () => void;
  availabilitySlots: DayAvailability[];
  selectedDate: Date | null;
  onTimeSlotSelect: (dateStr: string, timeSlot: string) => void;
  selectedTimeSlots: string[];
}

const AvailabilityBottomSheet = ({
  open,
  onClose,
  availabilitySlots,
  selectedDate,
  onTimeSlotSelect,
  selectedTimeSlots,
}: AvailabilityBottomSheetProps) => {
  if (!selectedDate) return null;

  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const dayAvailability = availabilitySlots.find((d) => d.date === dateStr);
  const availableSlots =
    dayAvailability?.slots.filter((slot) => slot.isAvailable) || [];

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: "80vh",
        },
      }}
    >
      <Box className="p-4">
        {/* Header */}
        <Box className="flex items-center justify-between mb-1">
          <Typography variant="h6" className="font-semibold">
            Select Time Slot
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="solar:close-circle-outline" fontSize={24} />
          </IconButton>
        </Box>

        {/* Date Display */}
        <Box className="mb-4">
          <Typography variant="body2" color="text.secondary" className="mb-2">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </Typography>
          <Divider />
        </Box>

        {/* Time Slots */}
        <Box className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pb-4">
          {availableSlots.length === 0 ? (
            <Typography variant="body2" color="text.secondary" className="col-span-2 text-center py-4">
              No available slots for this date
            </Typography>
          ) : (
            availableSlots.map((slot) => {
              console.log({ slot })
              const slotTime = format(parseISO(slot.time), "h:mm a");
              const isSelected = selectedTimeSlots.includes(slot.time);
              return (
                <Button
                  key={slot.time}
                  variant="outlined"
                  shape="square"
                  fullWidth
                  size="small"
                  color={isSelected ? "primary" : "secondary"}
                  onClick={() => {
                    onTimeSlotSelect(dateStr, slot.time);
                  }}
                  className="py-3"
                >
                  {slotTime}
                </Button>
              );
            })
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AvailabilityBottomSheet;

