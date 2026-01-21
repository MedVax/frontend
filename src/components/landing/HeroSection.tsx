"use client";

import { Button, Typography } from "@mui/material";
import { Shell } from "../ui";

export function HeroSection() {
  return (
    <div
      className="hero flex items-center justify-center sm:h-[calc(100vh-250px)] sm:min-h-[500px] sm:max-h-[1200px]"
      id="hero"
    >
      <Shell component="section" className="my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <div className="w-[500px]">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center sm:justify-start gap-2 w-full">
                  <img
                    src="/assets/logo.svg"
                    alt="Trusted"
                    className="w-4 h-[14px]"
                  />
                  <Typography variant="body1">
                    Trusted by 100k+ users
                  </Typography>
                </div>

                <div>
                  <Typography
                    variant="h2"
                    className="font-semibold! leading-[103%]  text-center sm:text-left"
                  >
                    E-Pharmacy & <br /> Consultation{" "}
                  </Typography>
                  <Typography
                    variant="h2"
                    color="primary"
                    className="font-semibold! text-black leading-[103%] tracking-[-2px] text-center sm:text-left"
                  >
                    made easy
                  </Typography>
                </div>

                <Typography
                  color="text.secondary"
                  className="max-w-[451px] text-center sm:text-left"
                >
                  As a full-service pharmacy We connect people and healthcare
                  providers with quality medications and solutions that improve
                  health outcomes.
                </Typography>
              </div>

              <div className="flex items-start justify-center sm:justify-start gap-3 mt-10">
                <Button variant="contained">Visit Pharmacy</Button>
                <Button
                  variant="white"
                  sx={{ boxShadow: "0px 0px 18px 0px #0000000A" }}
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-h-[450px]">
            <div className="row-span-2 w-full h-full rounded-xl overflow-hidden bg-gray-100">
              <img
                src="/assets/woman-baby.png"
                alt="Woman with baby"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
              <img
                src="/assets/nurse-caring-for-male-patient.png"
                alt="Healthcare professional"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
              <img
                src="/assets/medvax-e-pharmacy-inscription.png"
                alt="Medications and products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
}
