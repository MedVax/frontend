"use client";

import { Button, Typography } from "@mui/material";
import { Shell } from "../ui";

export function CtaSection() {
  return (
    <Shell component="section" id="cta">
      <div className="rounded-xl relative overflow-hidden h-[500px] flex flex-col items-center justify-center mt-20">
        <img
          src="/assets/need-medication.png"
          alt="Need medication"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="flex flex-col gap-8 items-center relative z-10 max-w-[600px]">
          <div className="flex flex-col gap-4 items-center text-center text-white">
            <Typography variant="h3" color="white" className="font-semibold!">
              Need medication now?
            </Typography>
            <Typography variant="body1" color="white" className="opacity-90">
              Order, consult, or search — all in one place.
            </Typography>
          </div>
          <Button>Get Medication</Button>
        </div>
      </div>
    </Shell>
  );
}
