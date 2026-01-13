"use client";

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
    <Shell id="partners" className="bg-white rounded-3xl py-6 flex flex-col gap-6 items-center">
      <h2 className="font-medium text-[30px] text-black text-center font-dm-sans">
        Our partners
      </h2>
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
