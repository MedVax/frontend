"use client";

import { Box, Button } from "@mui/material";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nunito",
});

export function HealthcareSolutions() {
  return (
    <Box className="flex flex-col items-center mb-16">
      <Box
        className={`${nunito.variable} font-semibold text-4xl text-black text-center mb-12`}
        sx={{ fontFamily: "var(--font-nunito)" }}
      >
        One-top healthcare
        <br />
        solutions provider
      </Box>

      {/* E-Pharmacy and Consultation */}
      <Box className="flex gap-4 mb-4 w-full">
        {/* E-Pharmacy Card */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f9fafb",
            borderRadius: "24px",
            p: 5,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <Box className="flex flex-col items-start w-full">
            <Box
              className={`${nunito.variable} font-semibold text-base text-[#e91d74] mb-2`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              E-Pharmacy
            </Box>
            <Box
              className={`${nunito.variable} font-semibold text-2xl text-black mb-2`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Order medications with ease.
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Easily access verified medications, supplements, and health
              essentials with quick, reliable delivery straight to your
              doorstep.
            </Box>
          </Box>
          <Box className="flex justify-center">
            <Box
              sx={{
                width: 262,
                height: 262,
                borderRadius: "9999px",
                backgroundColor: "#e3dfda",
                border: "8px solid white",
                boxShadow: "3px 4px 63px -1px rgba(0,0,0,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="/assets/order-medications.png"
                alt="Pharmacy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "9999px",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Consultation Card */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f9fafb",
            borderRadius: "24px",
            p: 5,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <Box className="flex flex-col items-start w-full">
            <Box
              className={`${nunito.variable} font-semibold text-base text-[#e91d74] mb-2`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Consultation
            </Box>
            <Box
              className={`${nunito.variable} font-semibold text-2xl text-black mb-2`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Speak with a licensed expert anytime
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Connect with licensed doctors and pharmacists for real-time
              medical advice, prescription support, and follow-up guidance
            </Box>
          </Box>
          <Box className="flex justify-center">
            <Box
              sx={{
                width: 262,
                height: 262,
                borderRadius: "999px",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#e3dfda",
                border: "8px solid white",
                boxShadow: "3px 4px 63px -1px rgba(0,0,0,0.06)",
              }}
            >
              <Box
                component="img"
                src="/assets/licensed-experts.png"
                alt="Consultation"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "999px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Chatbot Section */}
      <Box
        sx={{
          backgroundColor: "#f9fafb",
          borderRadius: "24px",
          p: 5,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box className="flex flex-col items-center gap-6 max-w-[469px]">
          <Box className="flex flex-col items-center gap-4 text-center">
            <Box
              className={`${nunito.variable} font-semibold text-base text-[#e91d74]`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Chatbot
            </Box>
            <Box
              className={`${nunito.variable} font-medium text-4xl text-black tracking-[-0.8px]`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Instant answers,
              <br />
              personalized support.
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Get instant, AI-powered answers to symptoms, medication questions,
              and basic health concerns, available around the clock.
            </Box>
          </Box>
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
        </Box>

        {/* Phone Mockup */}
        <Box
          sx={{
            width: 280,
            height: 400,
            position: "relative",
            backgroundColor: "#f3f4f6",
            borderRadius: "40px",
            border: "8px solid #1f2937",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Phone notch */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 24,
              backgroundColor: "#1f2937",
              borderRadius: "0 0 16px 16px",
              zIndex: 10,
            }}
          />

          {/* Chat UI */}
          <Box sx={{ p: 2, pt: 4, height: "100%", backgroundColor: "white" }}>
            {/* Bot message */}
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: "16px 16px 16px 4px",
                  p: 1.5,
                  maxWidth: "80%",
                  fontSize: 12,
                }}
              >
                Hello! How can I assist you today?
              </Box>
              <Box sx={{ fontSize: 10, color: "#9ca3af", mt: 0.5 }}>9:41</Box>
            </Box>

            {/* User message */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
                  color: "white",
                  borderRadius: "16px 16px 4px 16px",
                  p: 1.5,
                  maxWidth: "80%",
                  fontSize: 12,
                }}
              >
                Hi, I need to speak with a doctor
              </Box>
              <Box sx={{ fontSize: 10, color: "#9ca3af", mt: 0.5 }}>9:42</Box>
            </Box>

            {/* Bot response */}
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: "16px 16px 16px 4px",
                  p: 1.5,
                  maxWidth: "80%",
                  fontSize: 12,
                }}
              >
                Sure, I can help with that.
                <br />
                <br />
                Please briefly describe your symptoms.
              </Box>
              <Box sx={{ fontSize: 10, color: "#9ca3af", mt: 0.5 }}>9:42</Box>
            </Box>

            {/* User message */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
                  color: "white",
                  borderRadius: "16px 16px 4px 16px",
                  p: 1.5,
                  maxWidth: "80%",
                  fontSize: 12,
                }}
              >
                I've had a cough and sore throat since yesterday
              </Box>
              <Box sx={{ fontSize: 10, color: "#9ca3af", mt: 0.5 }}>9:43</Box>
            </Box>

            {/* Bot response */}
            <Box>
              <Box
                sx={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: "16px 16px 16px 4px",
                  p: 1.5,
                  maxWidth: "80%",
                  fontSize: 12,
                }}
              >
                I will connect you with a doctor. One moment please
              </Box>
              <Box sx={{ fontSize: 10, color: "#9ca3af", mt: 0.5 }}>9:44</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
