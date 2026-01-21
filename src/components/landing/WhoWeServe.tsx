"use client";

import { Typography } from "@mui/material";
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
    <Shell component="section" id="who-we-serve" className="mt-20">
      <Typography variant="h4" className="font-semibold! text-center">
        Who We Serve
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8">
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

            <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-1 text-white">
              <Typography variant="h5" color="white" className="font-semibold!">
                {item.title}
              </Typography>
              <Typography variant="body1" color="white" className="opacity-90">
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
