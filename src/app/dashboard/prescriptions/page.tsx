"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import PatientPrescriptionForm from "./features/PatientPrescriptionForm";
import DoctorPrescriptionForm from "./features/DoctorPrescriptionForm";
import { PrescriptionType } from "@/apis/prescription-api";

const PrescriptionsPage = () => {
  const [tab, setTab] = useState(0);
  const [prescriberType, setPrescriberType] = useState<PrescriptionType>(
    PrescriptionType.PATIENT
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setPrescriberType(
      newValue === 0 ? PrescriptionType.PATIENT : PrescriptionType.DOCTOR
    );
  };

  return (
    <div className="space-y-6">
      <Typography variant="h4" className="font-semibold">
        Upload Prescription
      </Typography>

      <Paper variant="outlined" className="p-6 bg-white!">
        <Tabs value={tab} onChange={handleTabChange} className="mb-6">
          <Tab
            label="Patient Prescription"
            icon={<Iconify icon="solar:user-outline" fontSize={20} />}
            iconPosition="start"
          />
          <Tab
            label="Doctor Prescription"
            icon={<Iconify icon="solar:user-doctor-outline" fontSize={20} />}
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ mt: 4 }}>
          {tab === 0 ? (
            <PatientPrescriptionForm />
          ) : (
            <DoctorPrescriptionForm />
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default PrescriptionsPage;

