"use client";

import { Box, Button } from "@mui/material";
import { DM_Sans, Nunito } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nunito",
});

export function PartnerCtaSection() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: 8,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        mb: 10,
      }}
    >
      <Box className="flex flex-col gap-3 items-center text-center max-w-[444px]">
        <Box
          className={`${dmSans.variable} font-medium text-[30px] text-black tracking-[-0.4px] leading-tight`}
          sx={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Are You a Pharmacy, HMO, or
          <br />
          Healthcare Partner?
        </Box>
        <Box
          className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
          sx={{ fontFamily: "var(--font-nunito)" }}
        >
          Let Medvax power your medication access and delivery.
        </Box>
      </Box>
      <Button
        sx={{
          backgroundColor: "transparent",
          border: "2px solid #e91d74",
          borderRadius: "84px",
          height: 48,
          px: 5,
          textTransform: "none",
          fontFamily: "var(--font-nunito)",
          fontWeight: 500,
          fontSize: 16,
          color: "#e91d74",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#e91d74",
            color: "white",
          },
        }}
      >
        Partner With Medvax Health
      </Button>
    </Box>
  );
}
