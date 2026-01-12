"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { Button, Menu, MenuItem, SxProps, Theme } from "@mui/material";
import { AltArrowDown } from "@solar-icons/react";

interface DropdownMenuItem {
  label: string;
  href: string;
}

interface DropdownButtonProps {
  label: string;
  items: DropdownMenuItem[];
  variant?: "light" | "dark";
  icon?: ReactNode;
  sx?: SxProps<Theme>;
}

export function DropdownButton({
  label,
  items,
  variant = "dark",
  icon,
  sx,
}: DropdownButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const baseStyles: SxProps<Theme> =
    variant === "dark"
      ? {
          color: "white",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "-0.4px",
          // borderRadius: "12px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }
      : {
          color: "#4b5563",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "-0.4px",
          // borderRadius: "12px",
          "&:hover": {
            backgroundColor: "rgba(233, 29, 116, 0.1)",
          },
        };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={
          icon ?? (
            <AltArrowDown
              size={12}
              color={variant === "dark" ? "white" : undefined}
            />
          )
        }
        sx={{ ...baseStyles, ...sx }}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <MenuItem onClick={handleClose}>
              <span className="text-sm font-medium text-gray-600">
                {item.label}
              </span>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
}
