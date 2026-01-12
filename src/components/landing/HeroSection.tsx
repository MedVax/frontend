"use client";

import { Box, Button, Container } from "@mui/material";

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
        <div className="flex items-start pt-16 gap-6">
          {/* Left Content */}
          <div className="flex flex-col gap-10 w-[500px] pt-8">
            <div className="flex flex-col gap-6">
              {/* Trusted Badge */}
              <div className="flex items-center gap-3">
                <img
                  src="/assets/logo.svg"
                  alt="Trusted"
                  className="w-4 h-[18px]"
                />
                <span className="font-medium text-base text-black font-[family-name:var(--font-nunito)]">
                  Trusted by 100k+ users
                </span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="font-semibold leading-[1.08] text-[56px] tracking-[-2px] text-gray-900 font-[family-name:var(--font-nunito)]">
                  E-Pharmacy &<br />
                  Consultation{" "}
                  <span className="italic text-[#e91d74]">made easy</span>
                </h1>
              </div>

              {/* Description */}
              <p className="font-normal text-base text-gray-600 max-w-[451px] font-[family-name:var(--font-nunito)]">
                As a full-service pharmacy We connect people and healthcare
                providers with quality medications and solutions that improve
                health outcomes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-start gap-3">
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
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="flex gap-4 ml-auto">
            {/* Large left image - woman with baby */}
            <div className="w-[294px] h-[420px] rounded-3xl overflow-hidden bg-gray-100">
              <img
                src="/assets/woman-baby.png"
                alt="Woman with baby"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right column with 2 images */}
            <div className="flex flex-col gap-4">
              {/* Top image - healthcare professional */}
              <div className="w-[249px] h-[200px] rounded-3xl overflow-hidden bg-gray-100">
                <img
                  src="/assets/nurse-caring-for-male-patient.png"
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom image - medications/products */}
              <div className="w-[249px] h-[200px] rounded-3xl overflow-hidden bg-gray-100">
                <img
                  src="/assets/medvax-e-pharmacy-inscription.png"
                  alt="Medications and products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
