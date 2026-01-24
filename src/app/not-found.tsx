"use client";

import { Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { Shell } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <Shell component="main" className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center gap-6">
          {/* 404 Number with Icon */}
          <div className="relative">
            <div className="text-[120px] sm:text-[180px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pink-400 leading-none">
              404
            </div>
            <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8">
              <Icon
                icon="solar:file-remove-bold-duotone"
                width={64}
                height={64}
                className="text-gray-300"
              />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <Typography
              variant="h3"
              className="font-bold text-gray-900"
              component="h1"
            >
              Page Not Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="max-w-md mx-auto"
            >
              Oops! The page you&apos;re looking for seems to have wandered off.
              It might have been moved, deleted, or never existed.
            </Typography>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              startIcon={<Icon icon="solar:home-smile-bold-duotone" />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "99px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Go Home
            </Button>
            <Button
              component={Link}
              href="/products"
              variant="outlined"
              size="large"
              startIcon={<Icon icon="solar:shop-bold-duotone" />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "99px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Browse Products
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-8 border-t border-gray-200 w-full">
            <Typography variant="body2" color="text.secondary" className="mb-4">
              You might be looking for:
            </Typography>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  label: "Pharmacy",
                  href: "/products",
                  icon: "solar:pharmacy-bold-duotone",
                },
                {
                  label: "Consultation",
                  href: "/consultation",
                  icon: "solar:medical-kit-bold-duotone",
                },
                {
                  label: "About Us",
                  href: "/about",
                  icon: "solar:info-circle-bold-duotone",
                },
                {
                  label: "Contact",
                  href: "/contact",
                  icon: "solar:phone-calling-bold-duotone",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                >
                  <Icon icon={link.icon} width={18} height={18} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
}
