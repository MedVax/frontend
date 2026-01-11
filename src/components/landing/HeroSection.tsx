"use client";

import { Box, Button, Container } from "@mui/material";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

export function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "white",
        pb: 10,
      }}
    >
      <Container maxWidth="xl" className="px-12">
        <Box className="flex items-start pt-16 gap-6">
          {/* Left Content */}
          <Box className="flex flex-col gap-10 w-[500px] pt-8">
            <Box className="flex flex-col gap-6">
              {/* Trusted Badge */}
              <Box className="flex items-center gap-3">
                <Box
                  component="img"
                  src="/assets/logo.svg"
                  alt="Trusted"
                  sx={{ width: 16, height: 18 }}
                />
                <Box
                  className={`${nunito.variable} font-medium text-base text-black`}
                  sx={{ fontFamily: "var(--font-nunito)" }}
                >
                  Trusted by 100k+ users
                </Box>
              </Box>

              {/* Main Heading */}
              <Box>
                <Box
                  className={`${nunito.variable} font-semibold leading-[1.08]`}
                  sx={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "56px",
                    letterSpacing: "-2px",
                    color: "#111827",
                  }}
                >
                  E-Pharmacy &<br />
                  Consultation{" "}
                  <Box
                    component="span"
                    sx={{
                      fontStyle: "italic",
                      color: "#e91d74",
                      fontWeight: 600,
                    }}
                  >
                    made easy
                  </Box>
                </Box>
              </Box>

              {/* Description */}
              <Box
                className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
                sx={{ fontFamily: "var(--font-nunito)", maxWidth: 451 }}
              >
                As a full-service pharmacy We connect people and healthcare
                providers with quality medications and solutions that improve
                health outcomes.
              </Box>
            </Box>

            {/* CTA Buttons */}
            <Box className="flex items-start gap-3">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e91d74",
                  borderRadius: "84px",
                  height: 56,
                  px: 4,
                  textTransform: "none",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 500,
                  fontSize: 16,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#c2185b",
                    boxShadow: "none",
                  },
                }}
              >
                Visit Pharmacy
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "999px",
                  height: 56,
                  px: 4,
                  textTransform: "none",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#030712",
                  boxShadow: "0px 0px 18px 0px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                  },
                }}
              >
                Book Consultation
              </Button>
            </Box>
          </Box>

          {/* Right Images Grid */}
          <Box className="flex gap-4 ml-auto">
            {/* Large left image - woman with baby */}
            <Box
              sx={{
                width: 294,
                height: 420,
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#f3f4f6",
              }}
            >
              <Box
                component="img"
                src="/assets/woman-baby.png"
                alt="Woman with baby"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Right column with 2 images */}
            <Box className="flex flex-col gap-4">
              {/* Top image - healthcare professional */}
              <Box
                sx={{
                  width: 249,
                  height: 200,
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "#f3f4f6",
                }}
              >
                <Box
                  component="img"
                  src="/assets/nurse-caring-for-male-patient.png"
                  alt="Healthcare professional"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              {/* Bottom image - medications/products */}
              <Box
                sx={{
                  width: 249,
                  height: 200,
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "#f3f4f6",
                }}
              >
                <Box
                  component="img"
                  src="/assets/medvax-e-pharmacy-inscription.png"
                  alt="Medications and products"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
