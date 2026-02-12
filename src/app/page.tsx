"use client";

import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BestSellingProducts } from "@/components/landing/BestSellingProducts";
import { HealthcareSolutions } from "@/components/landing/HealthcareSolutions";
import { WhoWeServe } from "@/components/landing/WhoWeServe";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { BlogCarousel } from "@/components/landing/BlogCarousel";
import { CtaSection } from "@/components/landing/CtaSection";
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
      <TestimonialsSection />
      {/* <BlogCarousel /> */}
      <CtaSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
