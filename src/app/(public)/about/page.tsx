"use client";

import { Box } from "@mui/material";
import { AboutHero } from "@/components/about/AboutHero";
import { ProblemSection } from "@/components/about/ProblemSection";
import { WhyChooseSection } from "@/components/about/WhyChooseSection";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";
import { HealthcareSolutions } from "@/components/landing/HealthcareSolutions";
import { WhoWeServe } from "@/components/landing/WhoWeServe";
import { FAQSection } from "@/components/landing/FAQSection";

export default function AboutPage() {
    return (
        <Box className="bg-white min-h-screen w-full">
            <main className="space-y-10">
                <AboutHero />
                <WhyChooseSection />
                {/* <MissionVisionSection /> */}
                <HealthcareSolutions showOnMobile={true} />
                <WhoWeServe />
                <FAQSection />
            </main>
        </Box>
    );
}
