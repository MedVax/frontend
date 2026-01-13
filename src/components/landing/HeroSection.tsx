"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { Shell } from "../ui";

export function HeroSection() {
  return (
    <Shell as="section" className="px-32 hero" id="hero">
      <div className="flex items-start pt-16 gap-6">
        <div className="flex flex-col gap-10 w-[500px] pt-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.svg"
                alt="Trusted"
                className="w-4 h-[18px]"
              />
              <span className="font-medium text-base text-black">
                Trusted by 100k+ users
              </span>
            </div>

            <div>
              <h1 className="font-semibold leading-[103%] text-[56px] tracking-[-2px] text-gray-900 text-balance">
                E-Pharmacy & Consultation{" "}
                <span className="italic text-[#e91d74]">made easy</span>
              </h1>
            </div>

            <Typography variant="caption">
              <p className="font-normal text-base text-gray-600 max-w-[451px]">
                As a full-service pharmacy We connect people and healthcare
                providers with quality medications and solutions that improve
                health outcomes.
              </p>
            </Typography>
          </div>

          <div className="flex items-start gap-3">
            <Button variant="contained">Visit Pharmacy</Button>
            <Button variant="white" sx={{ boxShadow: "0px 0px 18px 0px #0000000A" }}>
              Book Consultation
            </Button>
          </div>
        </div>

        <div className="flex gap-4 ml-auto">
          <div className="w-[294px] h-[420px] rounded-xl overflow-hidden bg-gray-100">
            <img
              src="/assets/woman-baby.png"
              alt="Woman with baby"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-[249px] h-[200px] rounded-xl overflow-hidden bg-gray-100">
              <img
                src="/assets/nurse-caring-for-male-patient.png"
                alt="Healthcare professional"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[249px] h-[200px] rounded-xl overflow-hidden bg-gray-100">
              <img
                src="/assets/medvax-e-pharmacy-inscription.png"
                alt="Medications and products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
