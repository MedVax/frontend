"use client";

import { ReactNode, Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Box, CircularProgress } from "@mui/material";
import { ReduxProvider } from "./ReduxProvider";
import { SnackbarCloseButton } from "@/common/snackbar-close-button";
import { ThemeProvider } from "./ThemeProvider";
import { ErrorBoundary } from "../ErrorBoundary";

interface AppProvidersProps {
  children: ReactNode;
}

function LoadingFallback() {
  return (
    <Box
      className="flex items-center justify-center min-h-screen"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <CircularProgress size={40} sx={{ color: "#e91d74" }} />
    </Box>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            autoHideDuration={4000}
            action={(snackbarKey) => (
              <SnackbarCloseButton snackbarKey={snackbarKey} />
            )}
          >
            <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
          </SnackbarProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
