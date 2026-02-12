"use client";

import { Box, Card, Typography } from "@mui/material";
import { Shell } from "@/components/ui/shell";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-nunito",
});

const cards = [
    {
        title: "Poor treatment outcomes",
        description: "Built and overseen by licensed pharmacists who prioritize patient safety.",
    },
    {
        title: "Pharmacist-Led Platform",
        description: "Built and overseen by licensed pharmacists who prioritize patient safety.",
    },
    {
        title: "Verified Supply Chain",
        description: "We partner only with trusted, licensed pharmacies to reduce counterfeit medication risks.",
    },
    {
        title: "Speed With Responsibility",
        description: "Fast delivery without compromising ethical and regulatory standards.",
    },
];

export function ProblemSection() {
    return (
        <Box className="bg-white py-16">
            <Shell>
                <Box className="flex flex-col items-center mb-16 text-center">
                    <Typography
                        variant="h3"
                        className={`${nunito.className} font-semibold mb-4`}
                        sx={{ fontSize: { xs: "28px", md: "36px" } }}
                    >
                        Why Medvax Health?
                    </Typography>

                    <Typography
                        variant="body2"
                        className={`${nunito.className} text-gray-500 max-w-[400px] mb-10 leading-relaxed`}
                        align="center"
                    >
                        Across Africa, people can order food, on-demand and get it delivered in minutes. yet still struggle to access essential medication in time.
                    </Typography>
                </Box>
            </Shell>
        </Box>
    );
}
