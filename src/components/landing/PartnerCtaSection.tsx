"use client";

import { Button, Typography } from "@mui/material";
import { Shell } from "../ui";
import Link from "next/link";

export function PartnerCtaSection() {
  return (
    <Shell
      component="section"
      id="partner-cta"
      className="bg-white flex flex-col gap-5 items-center justify-center mt-20 py-25"
    >
      <div className="flex flex-col gap-3 items-center text-center max-w-[444px]">
        <Typography variant="h4" color="black" className="font-semibold!">
          Are You a Pharmacy, HMO, or Healthcare Partner?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="text-balance"
        >
          Let Medvax power your medication access and delivery.
        </Typography>
      </div>
      <Button component={Link} href="/contact">Partner With Medvax Health</Button>
    </Shell>
  );
}
