"use client";

import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

interface PartnerLogo {
  icon: string;
  bgColor: string;
  iconColor: string;
}

const partnerLogos: PartnerLogo[] = [
  { icon: "mdi:hospital-building", bgColor: "#e0f2fe", iconColor: "#0ea5e9" },
  { icon: "mdi:medical-bag", bgColor: "#fef3c7", iconColor: "#f59e0b" },
  { icon: "mdi:pill", bgColor: "#dcfce7", iconColor: "#22c55e" },
];

export function PartnersSection() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "24px",
        py: 6,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
        mb: 8,
      }}
    >
      <Box
        className={`${dmSans.variable} font-medium text-[30px] text-black text-center tracking-[-0.4px]`}
        sx={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Our partners
      </Box>
      <Box className="flex gap-6">
        {partnerLogos.map((partner, index) => (
          <Box
            key={index}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: partner.bgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              icon={partner.icon}
              width={36}
              height={36}
              style={{ color: partner.iconColor }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
