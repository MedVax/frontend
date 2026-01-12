"use client";

import { Icon } from "@iconify/react";

interface PartnerLogo {
  icon: string;
  bgColor: string;
  iconColor: string;
}

const partnerLogos: PartnerLogo[] = [
  {
    icon: "mdi:hospital-building",
    bgColor: "bg-sky-100",
    iconColor: "#0ea5e9",
  },
  { icon: "mdi:medical-bag", bgColor: "bg-amber-100", iconColor: "#f59e0b" },
  { icon: "mdi:pill", bgColor: "bg-green-100", iconColor: "#22c55e" },
];

export function PartnersSection() {
  return (
    <section className="bg-white rounded-3xl py-6 flex flex-col gap-6 items-center mb-8">
      <h2 className="font-medium text-[30px] text-black text-center tracking-[-0.4px] font-[family-name:var(--font-dm-sans)]">
        Our partners
      </h2>
      <div className="flex gap-6">
        {partnerLogos.map((partner, index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-full ${partner.bgColor} flex items-center justify-center`}
          >
            <Icon
              icon={partner.icon}
              width={36}
              height={36}
              style={{ color: partner.iconColor }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
