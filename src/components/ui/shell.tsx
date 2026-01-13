import type { ReactNode, ElementType } from "react";
import { Container } from "@mui/material";

interface ShellProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Shell({
  children,
  className = "",
  as: Component = "div",
}: ShellProps) {
  return (
    <Container sx={{ px: "0 !important" }} maxWidth="xl">
      <Component className={`px-12 ${className}`}>{children}</Component>
    </Container>
  );
}
