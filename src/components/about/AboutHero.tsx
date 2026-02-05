"use client";

import { Box, Container, Typography } from "@mui/material";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-nunito",
});

export function AboutHero() {
    return (
        <Box className="w-full bg-white py-20 sm:py-28">
            <Container maxWidth="md">
                <Box className="flex flex-col items-center gap-4 text-center">
                    <Typography
                        variant="h2"
                        className={`${nunito.className} font-semibold text-black mb-2`}
                        sx={{ fontSize: { xs: "32px", md: "48px" } }}
                    >
                        About MedVax
                    </Typography>
                    <Typography
                        variant="body1"
                        className={`${nunito.className} text-gray-600 max-w-[600px] leading-relaxed`}
                        sx={{ fontSize: { xs: "16px", md: "18px" } }}
                    >
                        MedVax is a technology-driven medication delivery and pharmacy logistics platform built to improve quality medicines quality, safety, and reponsibility.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
