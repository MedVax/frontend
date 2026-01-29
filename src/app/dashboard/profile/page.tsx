"use client";

import React from "react";
import useAuthUser from "@/hooks/use-auth";
import ClientProfile from "./features/ClientProfile";
import ConsultantProfile from "./features/ConsultantProfile";
import { Skeleton } from "@mui/material";

const Profile = () => {
  const authUser = useAuthUser();
  const isConsultant = authUser?.user?.activeProfile?.type === "CONSULTANT";
  const isClient = authUser?.user?.activeProfile?.type === "CLIENT";

  if (!authUser) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  return (
    <div>
      {isConsultant && <ConsultantProfile />}
      {isClient && <ClientProfile />}
      {!isConsultant && !isClient && (
        <div className="text-center py-8">
          <p>No profile type detected. Please contact support.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
