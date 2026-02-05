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

                    <Typography
                        variant="h5"
                        className={`${nunito.className} font-medium`}
                        sx={{ fontSize: { xs: "20px", md: "24px" } }}
                    >
                        Delays in medication access result in:
                    </Typography>
                </Box>

                <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            elevation={0}
                            className="p-8 h-full flex flex-col items-start gap-4 border border-gray-100 rounded-[24px]"
                            sx={{ backgroundColor: "#FDFDFD" }}
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
