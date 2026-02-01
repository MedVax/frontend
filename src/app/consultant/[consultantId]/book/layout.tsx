import React from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Shell } from "@/components/ui";

// Layout without sidebar for booking pages
const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Shell component="section" className="sm:my-20 my-10">
        {children}
      </Shell>
      <Footer />
    </div>
  );
};

export default BookingLayout;

