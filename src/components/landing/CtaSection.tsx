"use client";

import { Button } from "@mui/material";

export function CtaSection() {
  return (
    <section className="rounded-3xl relative overflow-hidden h-[500px] flex flex-col items-center justify-center mb-16">
      {/* Background Image */}
      <img
        src="/assets/need-medication.png"
        alt="Need medication"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="flex flex-col gap-8 items-center relative z-10 max-w-[600px]">
        <div className="flex flex-col gap-4 items-center text-center text-white">
          <h2 className="font-semibold text-5xl tracking-[-0.8px] leading-tight font-[family-name:var(--font-nunito)]">
            Need medication now?
          </h2>
          <p className="font-medium text-xl tracking-[-0.4px] opacity-90 font-[family-name:var(--font-nunito)]">
            Order, consult, or search — all in one place.
          </p>
        </div>
        <Button
          sx={{
            backgroundColor: "#e91d74",
            borderRadius: "84px",
            height: 56,
            px: 5,
            textTransform: "none",
            fontFamily: "var(--font-nunito)",
            fontWeight: 500,
            fontSize: 16,
            color: "white",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#c2185b",
            },
          }}
        >
          Get Medication
        </Button>
      </div>
    </section>
  );
}
