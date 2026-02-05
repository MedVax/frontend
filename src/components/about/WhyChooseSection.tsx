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

export function WhyChooseSection() {
    return (
        <Box className="bg-white py-16">
            <Shell>
                <Box className="flex flex-col items-center mb-12 text-center">
                    <Typography
                        variant="h3"
                        className={`${nunito.className} font-semibold mb-2`}
                        sx={{ fontSize: { xs: "28px", md: "36px" } }}
                    >
                        Why Choose
                    </Typography>
                    <Typography
                        variant="h3"
                        className={`${nunito.className} font-semibold`}
                        sx={{ fontSize: { xs: "28px", md: "36px" } }}
                    >
                        Medvax Health
                    </Typography>
                </Box>

                <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            elevation={0}
                            className="p-8 h-full flex flex-col items-start gap-4 border border-gray-100 rounded-[24px]"
                            sx={{ backgroundColor: "#FFFFFF", boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.02)" }}
                        >
                            <Box className="w-12 h-12 rounded-full bg-[#e91d74] shrink-0" />

                            <Box>
                                <Typography
                                    variant="h6"
                                    className={`${nunito.className} font-semibold mb-3`}
                                    sx={{ fontSize: "18px" }}
                                >
                                    {card.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={`${nunito.className} text-gray-500 leading-relaxed`}
                                >
                                    {card.description}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Shell>
        </Box>
    );
}
