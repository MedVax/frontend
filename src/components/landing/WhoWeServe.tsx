"use client";

import { Shell } from "../ui";

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
        image: "/assets/who-we-serve.png",
  },
];

export function WhoWeServe() {
  return (
    <Shell
      as="section"
      id="who-we-serve"
      className="flex flex-col items-center gap-20"
    >
      <h2 className="font-semibold text-4xl text-black text-center">
        Who We Serve
      </h2>
      <div className="flex gap-6 w-full">
        {serveItems.map((item, index) => (
          <div
            key={index}
            className="flex-1 h-[480px] rounded-xl relative overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80" />

            <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-1.5 text-white">
              <h3 className="font-semibold text-2xl">{item.title}</h3>
              <p className="font-normal text-base opacity-90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
