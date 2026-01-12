"use client";

import { Icon } from "@iconify/react";

const features = [
  {
    icon: "solar:rocket-2-bold",
    title: "Fast Delivery",
    description:
      "Get your medications delivered quickly, right when you need them.",
  },
  {
    icon: "solar:shield-check-bold",
    title: "Quality Service",
    description:
      "Enjoy reliable support, verified products, and a seamless healthcare experience.",
  },
  {
    icon: "solar:heart-bold",
    title: "Trusted Care",
    description:
      "Count on MedVax for safe handling, secure processes, and health solutions.",
  },
];

export function FeaturesSection() {
  return (
    <section className="flex gap-4 py-6 rounded-3xl mb-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex-1 flex gap-4 items-center p-6 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
            <Icon
              icon={feature.icon}
              width={24}
              height={24}
              className="text-[#e91d74]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="font-medium text-xl text-black font-[family-name:var(--font-nunito)]">
              {feature.title}
            </h3>
            <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-nunito)]">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
