"use client";

import { Box, Typography, Button, Card } from "@mui/material";
import { Shell } from "@/components/ui/shell";
import { Nunito } from "next/font/google";
import { Icon } from "@iconify/react";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

const CHATBOT_URL = "https://ada.medvaxhealth.com";

export function ChatbotSection() {
  const handleChatNow = () => {
    window.open(CHATBOT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Box className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16">
      <Shell>
        <Box className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left side - Icon and visual */}
          <Box className="flex-1 flex justify-center md:justify-start">
            <Box
              className="relative"
              sx={{
                width: { xs: "200px", md: "280px" },
                height: { xs: "200px", md: "280px" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
                  position: "relative",
                }}
              >
                <Icon
                  icon="mdi:robot"
                  width={120}
                  height={120}
                  style={{ color: "white" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Icon
                    icon="mdi:sparkles"
                    width={32}
                    height={32}
                    style={{ color: "#667eea" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right side - Content */}
          <Box className="flex-1">
            <Card
              elevation={0}
              className="p-8 border border-gray-100 rounded-2xl"
              sx={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box className="flex flex-col gap-6">
                <Box>
                  <Typography
                    variant="h4"
                    className={`${nunito.className} font-bold mb-3`}
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Meet Ada, Your AI Health Assistant
                  </Typography>
                  <Typography
                    variant="body1"
                    className={`${nunito.className} text-gray-600 leading-relaxed`}
                    sx={{ fontSize: { xs: "14px", md: "16px" } }}
                  >
                    At MedVax, we're revolutionizing healthcare accessibility
                    through innovative technology. Ada is our intelligent AI
                    chatbot designed to provide you with instant, reliable
                    health information and support, 24/7.
                  </Typography>
                </Box>

                <Box className="space-y-4">
                  <Box className="flex items-start gap-3">
                    <Box
                      className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1"
                    >
                      <Icon
                        icon="mdi:clock-outline"
                        width={18}
                        height={18}
                        className="text-indigo-600"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        className={`${nunito.className} font-semibold mb-1`}
                        sx={{ fontSize: "16px" }}
                      >
                        24/7 Availability
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`${nunito.className} text-gray-500`}
                      >
                        Get instant answers to your health questions anytime,
                        anywhere. No waiting, no appointments needed.
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-start gap-3">
                    <Box
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1"
                    >
                      <Icon
                        icon="mdi:pill"
                        width={18}
                        height={18}
                        className="text-purple-600"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        className={`${nunito.className} font-semibold mb-1`}
                        sx={{ fontSize: "16px" }}
                      >
                        Medication Information
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`${nunito.className} text-gray-500`}
                      >
                        Learn about medications, dosages, side effects, and
                        interactions. Make informed decisions about your health.
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-start gap-3">
                    <Box
                      className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-1"
                    >
                      <Icon
                        icon="mdi:account-heart-outline"
                        width={18}
                        height={18}
                        className="text-pink-600"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        className={`${nunito.className} font-semibold mb-1`}
                        sx={{ fontSize: "16px" }}
                      >
                        Personalized Recommendations
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`${nunito.className} text-gray-500`}
                      >
                        Receive tailored health advice based on your questions
                        and needs. Ada helps you navigate your healthcare journey
                        with confidence.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="pt-4">
                  <Button
                    onClick={handleChatNow}
                    variant="contained"
                    size="large"
                    startIcon={
                      <Icon
                        icon="mdi:chat-outline"
                        width={20}
                        height={20}
                        style={{ color: "white" }}
                      />
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: 600,
                      textTransform: "none",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "16px",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Chat with Ada Now
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Shell>
    </Box>
  );
}
