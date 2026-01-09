import { Box } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      className="min-h-screen flex"
      sx={{
        background: "linear-gradient(135deg, #fef1f8 0%, #ffffff 50%, #f0fdf4 100%)",
      }}
    >
      {children}
    </Box>
  );
}

