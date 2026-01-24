import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
