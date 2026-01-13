"use client";

import { Button } from "@mui/material";
import { Shell } from "../ui";

export function HealthcareSolutions() {
  return (
    <Shell as="section" className="flex flex-col items-center">
      <h2 className="font-semibold text-4xl text-black text-center">
        One-top healthcare
        <br />
        solutions provider
      </h2>

      <div className="flex gap-4 mb-4 w-full">
        <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex flex-col gap-6">
          <div className="flex flex-col items-start w-full">
            <span className="font-semibold text-base text-gray-600 mb-2">
              E-Pharmacy
            </span>
            <h3 className="font-semibold text-2xl text-black mb-2">
              Order medications with ease.
            </h3>
            <p className="font-normal text-base text-gray-600">
              Easily access verified medications, supplements, and health
              essentials with quick, reliable delivery straight to your
              doorstep.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/order-medications.svg"
              alt="Pharmacy"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Consultation Card */}
        <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex flex-col gap-6">
          <div className="flex flex-col items-start w-full">
            <span className="font-semibold text-base text-gray-600 mb-2">
              Consultation
            </span>
            <h3 className="font-semibold text-2xl text-black mb-2">
              Speak with a licensed expert anytime
            </h3>
            <p className="font-normal text-base text-gray-600">
              Connect with licensed doctors and pharmacists for real-time
              medical advice, prescription support, and follow-up guidance
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/licensed-experts.svg"
              alt="Consultation"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="bg-gray-50 rounded-3xl p-10 flex flex-col gap-6 items-center w-full">
        <div className="flex flex-col items-center gap-6 max-w-[469px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-semibold text-base text-gray-600">
              Chatbot
            </span>
            <h3 className="font-medium text-4xl text-black">
              Instant answers,
              <br />
              personalized support.
            </h3>
            <p className="font-normal text-base text-gray-600">
              Get instant, AI-powered answers to symptoms, medication questions,
              and basic health concerns, available around the clock.
            </p>
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
