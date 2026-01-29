"use client";

import { useAuth } from "@/hooks/use-auth";
import ClientDashboard from "./(client)/features/ClientDashboard";
import ConsultantDashboard from "./(consultant)/features/ConsultantDashboard";

const page = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.isClient && <ClientDashboard />}{" "}
      {auth.isConsultant && <ConsultantDashboard />}
    </div>
  );
};

export default page;
