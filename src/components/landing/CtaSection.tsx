"use client";

import { Box, Button } from "@mui/material";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nunito",
});

export function CtaSection() {
  return (
    <Box
      sx={{
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
        height: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 16,
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/assets/need-medication.png"
        alt="Need medication"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Content */}
      <Box
        className="flex flex-col gap-8 items-center relative z-10"
        sx={{ maxWidth: 600 }}
      >
        <Box className="flex flex-col gap-4 items-center text-center text-white">
          <Box
            className={`${nunito.variable} font-semibold tracking-[-0.8px]`}
            sx={{
              fontFamily: "var(--font-nunito)",
              fontSize: "48px",
              lineHeight: 1.1,
            }}
          >
            Need medication now?
          </Box>
          <Box
            className={`${nunito.variable} font-medium text-xl tracking-[-0.4px] opacity-90`}
            sx={{ fontFamily: "var(--font-nunito)" }}
          >
            Order, consult, or search — all in one place.
          </Box>
        </Box>
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
      </Box>
    </Box>
  );
}
