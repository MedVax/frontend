"use client";

import { Button, Typography } from "@mui/material";
import { Shell } from "../ui";
import { ProductBestSelling } from "../../app/(public)/products/features/ProductBestSelling";
import Link from "next/link";

export function BestSellingProducts() {
  return (
    <Shell component="section" className="flex flex-col items-center mt-10 sm:mt-25">
      <div className="w-full relative">
        <div className="flex items-center justify-between h-[76px] mb-5 sm:mb-11">
          <div className="flex flex-col gap-2">
            <Typography variant="h4" className="font-semibold!">
              Best selling products
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Some of our best selling products
            </Typography>
          </div>
          <Button
            variant="soft"
            color="primary"
            component={Link}
            href="/products"
          >
            View all
          </Button>
        </div>

        <ProductBestSelling />
      </div>
    </Shell>
  );
}
