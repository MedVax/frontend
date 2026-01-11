"use client";

import { Box } from "@mui/material";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nunito",
});

const serveItems = [
  {
    title: "Individuals & Families",
    description: "Convenient, fast access to safe and verified medicines.",
    image: "/assets/who-we-serve.png",
  },
  {
    title: "Hospitals & Clinics",
    description:
      "Dependable medication fulfillment and last-mile delivery for patient care.",
    image: "/assets/hospital-clinics.png",
  },
  {
    title: "HMOs & Health Insurers",
    description:
      "Streamlined medication access for enrollees with improved efficiency, compliance, and data visibility.",
    image: "/assets/support.png",
  },
];

export function WhoWeServe() {
  return (
    <Box className="flex flex-col items-center mb-20 gap-16">
      <Box
        className={`${nunito.variable} font-semibold text-4xl text-black text-center`}
        sx={{ fontFamily: "var(--font-nunito)" }}
      >
        Who We Serve
      </Box>
      <Box className="flex gap-6 w-full">
        {serveItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              height: 480,
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Image */}
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)",
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: "absolute",
                bottom: 32,
                left: 32,
                right: 32,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                color: "white",
              }}
            >
              <Box
                className={`${nunito.variable} font-semibold text-2xl`}
                sx={{ fontFamily: "var(--font-nunito)" }}
              >
                {item.title}
              </Box>
              <Box
                className={`${nunito.variable} font-normal text-base opacity-90`}
                sx={{ fontFamily: "var(--font-nunito)" }}
              >
                {item.description}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
