"use client";

import { Typography } from "@mui/material";
import { Shell } from "../ui";

interface PartnerLogo {
  src: string;
}

const partnerLogos: PartnerLogo[] = [
  {
    src: "/assets/republic-rwanda.svg",
  },
  {
    src: "/assets/icfp-2025.svg",
  },
  {
    src: "/assets/unfpa.svg",
  },
];

export function PartnersSection() {
  return (
    <Shell
      id="partners"
      className="bg-white rounded-3xl flex flex-col gap-6 items-center mt-20"
    >
      <Typography variant="h4" className="font-semibold! text-center">
        Our partners
      </Typography>
      <div className="flex gap-6">
        {partnerLogos.map((partner, index) => (
          <div
            key={index}
            className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <img src={partner.src} alt={`partner ${index}`} />
          </div>
        ))}
      </div>
    </Shell>
  );
}
