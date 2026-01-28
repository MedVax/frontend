"use client";

import { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Shell } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <Shell component="main" className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Error Icon */}
          <div className="relative">
            <Icon
              icon="solar:danger-triangle-bold-duotone"
              width={120}
              height={120}
              className="text-error-main"
            />
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <Typography
              variant="h3"
              className="font-bold text-gray-900"
              component="h1"
            >
              Something went wrong!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="max-w-md mx-auto"
            >
              {error.message ||
                "We encountered an unexpected error. Please try again."}
            </Typography>
            {error.digest && (
              <Typography
                variant="caption"
                color="text.secondary"
                className="font-mono text-xs"
              >
                Error ID: {error.digest}
              </Typography>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              onClick={reset}
              variant="contained"
              size="large"
              startIcon={<Icon icon="solar:refresh-bold-duotone" />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "99px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Try Again
            </Button>
            <Button
              component={Link}
              href="/"
              variant="outlined"
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
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-8 border-t border-gray-200 w-full">
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Need help?
            </Typography>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  label: "Contact Support",
                  href: "/contact",
                  icon: "solar:phone-calling-bold-duotone",
                },
                {
                  label: "Browse Products",
                  href: "/products",
                  icon: "solar:shop-bold-duotone",
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

