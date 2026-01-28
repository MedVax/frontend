"use client";

import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BestSellingProducts } from "@/components/landing/BestSellingProducts";
import { HealthcareSolutions } from "@/components/landing/HealthcareSolutions";
import { WhoWeServe } from "@/components/landing/WhoWeServe";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { PartnerCtaSection } from "@/components/landing/PartnerCtaSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white w-full space-y-10">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BestSellingProducts />
      <HealthcareSolutions />
      <WhoWeServe />
      <PartnersSection />
      <CtaSection />
      <PartnerCtaSection />
      <Footer />
    </div>
  );
}
