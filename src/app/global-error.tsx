"use client";

import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "var(--font-nunito), sans-serif",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #f9fafb, #ffffff)",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          {/* Error Icon */}
          <div style={{ marginBottom: "2rem" }}>
            <Icon
              icon="solar:danger-triangle-bold-duotone"
              width={120}
              height={120}
              style={{ color: "#ef4444" }}
            />
          </div>

          {/* Error Message */}
          <div style={{ marginBottom: "2rem" }}>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#111827",
              }}
            >
              Application Error
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#6b7280",
                marginBottom: "0.5rem",
              }}
            >
              {error.message ||
                "A critical error occurred. Please refresh the page."}
            </Typography>
            {error.digest && (
              <Typography
                variant="caption"
                style={{
                  color: "#9ca3af",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                }}
              >
                Error ID: {error.digest}
              </Typography>
            )}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button
              onClick={reset}
              variant="contained"
              size="large"
              startIcon={<Icon icon="solar:refresh-bold-duotone" />}
              style={{
                padding: "0.75rem 2rem",
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
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "99px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Go Home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

