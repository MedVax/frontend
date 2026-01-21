import type { ReactNode, ElementType, HTMLAttributes } from "react";
import { Container, ContainerProps } from "@mui/material";
import clsx from "clsx";

interface ShellProps extends ContainerProps {
  children: ReactNode;
  as?: ElementType;
}

export function Shell({ children, className = "", ...props }: ShellProps) {
  return (
    <Container
      className={clsx("container mx-auto", className)}
      maxWidth="xl"
      {...props}
    >
      {children}
    </Container>
  );
}
