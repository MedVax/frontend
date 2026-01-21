"use client";

import { Button, Typography } from "@mui/material";
import { Shell } from "../ui";

export function HealthcareSolutions() {
  return (
    <Shell component="section" className="flex flex-col items-center mt-20">
      <Typography variant="h4" className="font-semibold! text-center">
        One-top healthcare
        <br />
        solutions provider
      </Typography>

      <div className="flex sm:flex-row flex-col gap-4 mb-4 w-full mt-10">
        <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex flex-col gap-6">
          <div className="flex flex-col items-start w-full space-y-2">
            <Typography
              variant="body1"
              color="primary"
              className="font-semibold!"
            >
              E-Pharmacy
            </Typography>
            <Typography variant="h6" className="font-semibold!">
              Order medications with ease.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Easily access verified medications, supplements, and health
              essentials with quick, reliable delivery straight to your
              doorstep.
            </Typography>
          </div>

          <div className="flex justify-center">
            <img
              src="/assets/order-medications.svg"
              alt="Pharmacy"
              className="w-full h-full max-h-[300px] object-fit rounded-full"
            />
          </div>
        </div>

        {/* Consultation Card */}
        <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex flex-col gap-4">
          <div className="flex flex-col items-start w-full space-y-2">
            <Typography
              variant="body1"
              color="primary"
              className="font-semibold!"
            >
              Consultation
            </Typography>
            <Typography variant="h6" className="font-semibold!">
              Speak with a licensed expert anytime
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Connect with licensed doctors and pharmacists for real-time
              medical advice, prescription support, and follow-up guidance
            </Typography>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/licensed-experts.svg"
              alt="Consultation"
              className="w-full h-full max-h-[300px] object-fit rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="bg-gray-50 rounded-3xl flex flex-col gap-6 items-center w-full">
        <div className="flex flex-col items-center gap-6 max-w-[469px] p-10">
          <div className="flex flex-col items-center gap-4 text-center space-y-2">
            <Typography
              variant="body1"
              color="primary"
              className="font-semibold!"
            >
              Chatbot
            </Typography>
            <Typography variant="h5" className="font-semibold!">
              Instant answers,
              <br />
              personalized support.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="max-w-[400px]"
            >
              Get instant, AI-powered answers to symptoms, medication questions,
              and basic health concerns, available around the clock.
            </Typography>
          </div>
          <Button
            sx={{
              background: "linear-gradient(180deg, #f472b6 0%, #db2777 100%)",
              borderRadius: "84px",
              height: 56,
              width: 187,
              textTransform: "none",
              fontFamily: "var(--font-nunito)",
              fontWeight: 500,
              fontSize: 16,
              color: "white",
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(180deg, #ec4899 0%, #be185d 100%)",
              },
            }}
          >
            Chat with us
          </Button>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center w-full">
          <img
            src="/assets/support.svg"
            alt="Support"
            className="w-full max-w-sm h-auto"
          />
        </div>
      </div>
    </Shell>
  );
}
