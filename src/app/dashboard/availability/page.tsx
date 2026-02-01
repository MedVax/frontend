"use client";

import React, { useState, useMemo } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Grid,
  Alert,
  Skeleton,
  Divider,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
} from "@/apis/availability-api";
import {
  TimeInterval,
  WeeklyAvailability,
  CustomAvailabilityItem,
} from "@/types/availability";
import { useSnackbar } from "notistack";
import { format, addDays, startOfWeek } from "date-fns";

const DAYS_OF_WEEK = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const;

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const Availability = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetAvailabilityQuery({});
  const [updateAvailability, { isLoading: isUpdating }] = useUpdateAvailabilityMutation();

  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [weekly, setWeekly] = useState<WeeklyAvailability>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedStartHour, setSelectedStartHour] = useState<number>(9);
  const [selectedEndHour, setSelectedEndHour] = useState<number>(17);

  const availability = data?.data;

  React.useEffect(() => {
    if (availability) {
      setTimezone(availability.timezone || "Africa/Lagos");
      setWeekly(availability.weekly || {});
    }
  }, [availability]);

  const handleAddTimeSlot = (day: string) => {
    if (selectedStartHour >= selectedEndHour) {
      enqueueSnackbar("Start time must be before end time", { variant: "error" });
      return;
    }

    const dayKey = day.toLowerCase() as keyof WeeklyAvailability;
    const existingSlots = weekly[dayKey] || [];
    
    // Check for overlaps
    const hasOverlap = existingSlots.some(
      (slot) =>
        (selectedStartHour >= slot.start && selectedStartHour < slot.end) ||
        (selectedEndHour > slot.start && selectedEndHour <= slot.end) ||
        (selectedStartHour <= slot.start && selectedEndHour >= slot.end)
    );

    if (hasOverlap) {
      enqueueSnackbar("Time slots cannot overlap", { variant: "error" });
      return;
    }

    setWeekly({
      ...weekly,
      [dayKey]: [...existingSlots, { start: selectedStartHour, end: selectedEndHour }],
    });
  };

  const handleRemoveTimeSlot = (day: string, index: number) => {
    const dayKey = day.toLowerCase() as keyof WeeklyAvailability;
    const existingSlots = weekly[dayKey] || [];
    setWeekly({
      ...weekly,
      [dayKey]: existingSlots.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      await updateAvailability({
        data: {
          timezone,
          weekly,
        },
      }).unwrap();
      enqueueSnackbar("Availability updated successfully", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to update availability", {
        variant: "error",
      });
    }
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" className="font-semibold">
            Availability Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-2">
            Set your weekly availability schedule
          </Typography>
        </div>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isUpdating}
          startIcon={<Iconify icon="solar:check-circle-linear" fontSize={20} />}
        >
          {isUpdating ? "Saving..." : "Save Availability"}
        </Button>
      </div>

      <Paper variant="outlined" className="p-6 bg-white!">
        <div className="mb-6">
          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              label="Timezone"
            >
              <MenuItem value="Africa/Lagos">Africa/Lagos (WAT)</MenuItem>
              <MenuItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</MenuItem>
              <MenuItem value="Africa/Cairo">Africa/Cairo (EET)</MenuItem>
              <MenuItem value="America/New_York">America/New_York (EST)</MenuItem>
              <MenuItem value="Europe/London">Europe/London (GMT)</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Divider className="mb-6" />

        <div className="space-y-6">
          {DAYS_OF_WEEK.map((day) => {
            const dayKey = day.key as keyof WeeklyAvailability;
            const slots = weekly[dayKey] || [];
            const isSelected = selectedDay === day.key;

            return (
              <div key={day.key} className="border-b border-gray-200 pb-4 last:border-0">
                <Typography variant="h6" className="font-semibold mb-4">
                  {day.label}
                </Typography>

                {slots.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {slots.map((slot, index) => (
                      <Chip
                        key={index}
                        label={`${formatHour(slot.start)} - ${formatHour(slot.end)}`}
                        onDelete={() => handleRemoveTimeSlot(day.key, index)}
                        color="primary"
                        variant="soft"
                      />
                    ))}
                  </div>
                )}

                {isSelected ? (
                  <div className="flex items-center gap-4 flex-wrap">
                    <FormControl>
                      <InputLabel>Start Time</InputLabel>
                      <Select
                        value={selectedStartHour}
                        onChange={(e) => setSelectedStartHour(e.target.value as number)}
                        label="Start Time"
                      >
                        {HOURS.map((hour) => (
                          <MenuItem key={hour} value={hour}>
                            {formatHour(hour)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <InputLabel>End Time</InputLabel>
                      <Select
                        value={selectedEndHour}
                        onChange={(e) => setSelectedEndHour(e.target.value as number)}
                        label="End Time"
                      >
                        {HOURS.map((hour) => (
                          <MenuItem key={hour} value={hour}>
                            {formatHour(hour)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      variant="contained"
                      onClick={() => {
                        handleAddTimeSlot(day.key);
                        setSelectedDay(null);
                      }}
                    >
                      Add
                    </Button>
                    <Button variant="outlined" onClick={() => setSelectedDay(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<Iconify icon="solar:add-circle-linear" fontSize={20} />}
                    onClick={() => setSelectedDay(day.key)}
                  >
                    Add Time Slot
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </Paper>

      <Alert severity="info">
        Your availability will be visible to clients when they book sessions. Make sure to keep
        it updated regularly.
      </Alert>
    </div>
  );
};

export default Availability;

