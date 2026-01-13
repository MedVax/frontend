"use client";

import { Button } from "@mui/material";
import { Shell } from "../ui";

export function PartnerCtaSection() {
  return (
    <Shell
      as="section"
      id="partner-cta"
      className="bg-white flex flex-col gap-5 items-center justify-center"
    >
      <div className="flex flex-col gap-3 items-center text-center max-w-[444px]">
        <h2 className="font-medium text-[30px] text-black leading-tight text-balance font-dm-sans">
          Are You a Pharmacy, HMO, or Healthcare Partner?
        </h2>
        <p className="font-normal text-base text-gray-600 text-balance">
          Let Medvax power your medication access and delivery.
        </p>
      </div>
      <Button variant="contained">Partner With Medvax Health</Button>
    </Shell>
  );
}
