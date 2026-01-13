"use client";

import { Button } from "@mui/material";
import { Shell } from "../ui";

export function CtaSection() {
  return (
    <Shell id="cta" className="sm:py-10">
      <section className="rounded-xl relative overflow-hidden h-[500px] flex flex-col items-center justify-center">
        <img
          src="/assets/need-medication.png"
          alt="Need medication"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="flex flex-col gap-8 items-center relative z-10 max-w-[600px]">
          <div className="flex flex-col gap-4 items-center text-center text-white">
            <h2 className="font-semibold text-5xl leading-tight">
              Need medication now?
            </h2>
            <p className="font-medium text-xl tracking-[-0.4px] opacity-90">
              Order, consult, or search — all in one place.
            </p>
          </div>
          <Button variant="contained">Get Medication</Button>
        </div>
      </section>
    </Shell>
  );
}
