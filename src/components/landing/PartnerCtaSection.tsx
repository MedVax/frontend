"use client";

import { Button } from "@mui/material";

export function PartnerCtaSection() {
  return (
    <section className="bg-white py-8 flex flex-col gap-5 items-center justify-center mb-10">
      <div className="flex flex-col gap-3 items-center text-center max-w-[444px]">
        <h2 className="font-medium text-[30px] text-black tracking-[-0.4px] leading-tight font-[family-name:var(--font-dm-sans)]">
          Are You a Pharmacy, HMO, or
          <br />
          Healthcare Partner?
        </h2>
        <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-nunito)]">
          Let Medvax power your medication access and delivery.
        </p>
      </div>
      <Button
        sx={{
          backgroundColor: "transparent",
          border: "2px solid #e91d74",
          borderRadius: "84px",
          height: 48,
          px: 5,
          textTransform: "none",
          fontFamily: "var(--font-nunito)",
          fontWeight: 500,
          fontSize: 16,
          color: "#e91d74",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#e91d74",
            color: "white",
          },
        }}
      >
        Partner With Medvax Health
      </Button>
    </section>
  );
}
