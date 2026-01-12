import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
}

export function Link({ children, className = "", ...props }: LinkProps) {
  return (
    <NextLink
      {...props}
      className={`inline-flex items-center justify-center px-2 py-3 rounded-full text-base font-medium text-white transition-colors hover:bg-white/10 tracking-[-0.4px] ${className}`}
    >
      {children}
    </NextLink>
  );
}
