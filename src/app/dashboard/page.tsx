"use client";

import useAuthUser from "@/hooks/use-auth";
import { Button, Typography } from "@mui/material";
import React from "react";

const page = () => {
  const authUser = useAuthUser();
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <div>
          <Typography component="span" className="text-grey-9 capitalize">
            Hi {authUser?.user?.firstName}
          </Typography>
          <Typography variant="h5" className="font-semibold mt-2">
            Welcome back
          </Typography>
        </div>

        <Button className="bg-black text-white">Book new session</Button>
      </div>
    </div>
  );
};

export default page;
