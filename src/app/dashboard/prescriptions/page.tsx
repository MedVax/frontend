"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import PatientPrescriptionForm from "./features/PatientPrescriptionForm";
import DoctorPrescriptionForm from "./features/DoctorPrescriptionForm";
import PrescriptionList from "./features/PrescriptionList";
import { PrescriptionType } from "@/apis/prescription-api";

const PrescriptionsPage = () => {
  const [mainTab, setMainTab] = useState(0); // 0: My Prescriptions, 1: Upload New
  const [uploadTab, setUploadTab] = useState(0); // 0: Patient, 1: Doctor

  const handleMainTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setMainTab(newValue);
  };

  const handleUploadTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setUploadTab(newValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h4" className="font-semibold">
          Prescriptions
        </Typography>
        {mainTab === 0 && (
          <button
            onClick={() => setMainTab(1)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Iconify icon="solar:upload-minimalistic-linear" className="text-lg" />
            Upload New
          </button>
        )}
      </div>

      <Paper variant="outlined" className="p-1 bg-white!">
        <Tabs value={mainTab} onChange={handleMainTabChange} className="border-b">
          <Tab
            label="My Prescriptions"
            icon={<Iconify icon="solar:document-medicine-linear" fontSize={20} />}
            iconPosition="start"
          />
          <Tab
            label="Upload New"
            icon={<Iconify icon="solar:upload-track-linear" fontSize={20} />}
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {mainTab === 0 ? (
            <PrescriptionList />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 flex flex-col items-center">
                <Typography variant="h6" className="mb-1">Select Upload Type</Typography>
                <p className="text-gray-500 text-sm">Are you a patient or a doctor?</p>
              </div>

              <Paper elevation={0} className="bg-gray-50 p-1 rounded-xl mb-8 flex justify-center max-w-md mx-auto">
                <Tabs
                  value={uploadTab}
                  onChange={handleUploadTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  sx={{
                    '& .MuiTabs-indicator': { display: 'none' },
                    '& .MuiTab-root': {
                      borderRadius: '8px',
                      zIndex: 1,
                      minWidth: 120,
                      textTransform: 'none',
                      transition: 'all 0.2s',
                      '&.Mui-selected': {
                        bgcolor: 'white',
                        boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                        fontWeight: 'bold'
                      }
                    }
                  }}
                >
                  <Tab label="Patient" />
                  <Tab label="Doctor" />
                </Tabs>
              </Paper>

              {uploadTab === 0 ? (
                <PatientPrescriptionForm />
              ) : (
                <DoctorPrescriptionForm />
              )}
            </div>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default PrescriptionsPage;

