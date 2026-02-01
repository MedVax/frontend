"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Paper, Typography, Button, Stepper, Step, StepLabel, Box } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import BookingStep1 from "./features/BookingStep1";
import BookingStep2 from "./features/BookingStep2";
import useAuthUser from "@/hooks/use-auth";
import { Alert } from "@mui/material";
import Link from "next/link";
import BackButton from "@/libs/mui/back-button ";

const steps = ["Book appointment", "Payment", "Confirmation/Note"];

const BookConsultantPage = () => {
  const router = useRouter();
  const params = useParams();
  const authUser = useAuthUser();
  const consultantId = params?.consultantId as string;
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState<any>(null);

  const isClient = authUser?.user?.activeProfile?.type === "CLIENT";

  if (!isClient) {
    return (
      <div className="space-y-6">
        <Alert severity="error">
          This page is only accessible to clients.{" "}
          <Link href="/dashboard" className="underline">
            Go to Dashboard
          </Link>
        </Alert>
      </div>
    );
  }

  const handleNext = (data?: any) => {
    if (data) {
      setBookingData(data);
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    // Redirect to notes page after successful payment
    router.push(`/consultant/${consultantId}/book/notes?sessionIds=${bookingData?.sessionIds?.join(",")}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <BackButton variant="contained" color="primary" onClick={() => router.push("/dashboard")} />

        <Stepper activeStep={activeStep} alternativeLabel className="flex-1">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={({ active, completed }) => (
                  <Box
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${active || completed
                      ? "bg-primary-main text-white"
                      : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {completed ? (
                      <Iconify icon="solar:check-circle-bold" fontSize={24} />
                    ) : (
                      <Iconify
                        icon={
                          index === 0
                            ? "solar:calendar-outline"
                            : index === 1
                              ? "solar:wallet-money-outline"
                              : "solar:document-text-outline"
                        }
                        fontSize={24}
                      />
                    )}
                  </Box>
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div></div>
      </div>


      {/* Step Content */}
      <div className="p-6 bg-white! max-w-4xl w-full mx-auto">
        {activeStep === 0 && (
          <BookingStep1
            consultantId={consultantId}
            onNext={handleNext}
          />
        )}
        {activeStep === 1 && (
          <BookingStep2
            bookingData={bookingData}
            onBack={handleBack}
            onComplete={handleComplete}
            consultantId={consultantId}
          />
        )}
      </div>
    </div>
  );
};

export default BookConsultantPage;

