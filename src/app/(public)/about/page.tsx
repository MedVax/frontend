"use client";

import { Box } from "@mui/material";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { ProblemSection } from "@/components/about/ProblemSection";
import { WhyChooseSection } from "@/components/about/WhyChooseSection";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";

export default function AboutPage() {
    return (
        <Box className="bg-white min-h-screen w-full">
            <Header />
            <main>
                <AboutHero />
                <ProblemSection />
                <WhyChooseSection />
                <MissionVisionSection />
            </main>
            <Footer />
        </Box>
    );
}
