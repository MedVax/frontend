"use client";

import { Box, Card, Typography } from "@mui/material";
import { Shell } from "@/components/ui/shell";
import { Nunito } from "next/font/google";
import { Icon } from "@iconify/react";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-nunito",
});

export function MissionVisionSection() {
    return (
        <Box className="bg-white py-16 pb-28">
            <Shell>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mission Card */}
                    <Card
                        elevation={0}
                        className="flex flex-col items-center text-center p-12 rounded-xl border border-gray-100"
                        sx={{ backgroundColor: "#FAFAFA" }}
                    >
                        <Box className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                            <Icon icon="solar:rocket-linear" className="text-[#e91d74] text-4xl" width={32} />
                        </Box>

                        <Typography
                            variant="h5"
                            className={`${nunito.className} font-semibold mb-4`}
                        >
                            Our Mission
                        </Typography>

                        <Typography
                            variant="body1"
                            className={`${nunito.className} text-gray-500 max-w-[400px] leading-relaxed`}
                        >
                            To use technology, pharmacy expertise, and logistics to ensure timely access to safe medication for everyone, everywhere.
                        </Typography>
                    </Card>

                    {/* Vision Card */}
                    <Card
                        elevation={0}
                        className="flex flex-col items-center text-center p-12 rounded-xl border border-gray-100"
                        sx={{ backgroundColor: "#FAFAFA" }}
                    >
                        <Box className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                            <Icon icon="solar:eye-linear" className="text-[#e91d74] text-4xl" width={32} />
                        </Box>

                        <Typography
                            variant="h5"
                            className={`${nunito.className} font-semibold mb-4`}
                        >
                            Our Vision
                        </Typography>

                        <Typography
                            variant="body1"
                            className={`${nunito.className} text-gray-500 max-w-[400px] leading-relaxed`}
                        >
                            To become Africa's most trusted medication delivery and pharmacy logistics platform.
                        </Typography>
                    </Card>
                </Box>
            </Shell>
        </Box>
    );
}
