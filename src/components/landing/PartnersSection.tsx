"use client";

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
    <section className="bg-white rounded-3xl py-6 flex flex-col gap-6 items-center mb-8">
      <h2 className="font-medium text-[30px] text-black text-center tracking-[-0.4px]">
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
    </section>
  );
}
