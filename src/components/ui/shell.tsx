import type { ReactNode, ElementType, HTMLAttributes } from "react";
import { Container } from "@mui/material";

interface ShellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
}

export function Shell({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ShellProps) {
  return (
    <Container className="container mx-auto" maxWidth="xl">
      {/* <Component className={`px-12 ${className}`} {...props}> */}
      {children}
      {/* </Component> */}
    </Container>
  );
}
