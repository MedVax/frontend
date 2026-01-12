import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
  className?: string;
}

export function Shell({ children, className = "" }: ShellProps) {
  return <div className={`px-12 ${className}`}>{children}</div>;
}
