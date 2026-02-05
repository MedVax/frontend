"use client";

import { Box } from "@mui/material";


import { AboutHero } from "@/components/about/AboutHero";
import { ProblemSection } from "@/components/about/ProblemSection";
import { WhyChooseSection } from "@/components/about/WhyChooseSection";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";

export default function AboutPage() {
    return (
        <Box className="bg-white min-h-screen w-full">
            <main>
                <AboutHero />
                <ProblemSection />
                <WhyChooseSection />
                <MissionVisionSection />
            </main>
        </Box>
    );
}
