"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Shell } from "@/components/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
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
                  {this.state.error?.message ||
                    "We encountered an unexpected error. Please try again."}
                </Typography>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  onClick={this.handleReset}
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
            </div>
          </Shell>
        </div>
      );
    }

    return this.props.children;
  }
}

