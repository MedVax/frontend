import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import React from "react";
import { DashboardSidebar } from "./features/DashboardSidebar";
import { Shell } from "@/components/ui";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Shell
        component="section"
        className="sm:my-20 my-10 flex flex-col sm:flex-row gap-10"
      >
        <DashboardSidebar />
        <div className="sm:w-[calc(100%-200px)] w-full">{children}</div>
      </Shell>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
