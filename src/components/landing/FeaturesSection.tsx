"use client";

import { Icon } from "@iconify/react";
import { Shell } from "../ui";
import { Typography } from "@mui/material";

const features = [
  {
    icon: "solar:rocket-linear",
    title: "Fast Delivery",
    description:
      "Get your medications delivered quickly, right when you need them.",
  },
  {
    icon: "solar:shield-check-broken",
    title: "Quality Service",
    description:
      "Enjoy reliable support, verified products, and a seamless healthcare experience.",
  },
  {
    icon: "solar:hand-heart-linear",
    title: "Trusted Care",
    description:
      "Count on MedVax for safe handling, secure processes, and health solutions.",
  },
];

export function FeaturesSection() {
  return (
    <Shell
      component="section"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:py-6"
      id="features"
    >
      {features.map((feature, index) => (
        <div key={index} className="flex-1 flex gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
            <Icon
              icon={feature.icon}
              width={24}
              height={24}
              className="text-[#e91d74]"
            />
          </div>
          <div>
            <Typography variant="h6" className="font-medium">
              {feature.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {feature.description}
            </Typography>
          </div>
        </div>
      ))}
    </Shell>
  );
}
