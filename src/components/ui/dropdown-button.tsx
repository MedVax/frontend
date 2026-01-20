"use client";

import { useState, ReactNode, PropsWithChildren } from "react";
import Link from "next/link";
import { ButtonBase, ButtonBaseProps, Menu, MenuItem } from "@mui/material";
import { AltArrowDown } from "@solar-icons/react";
import clsx from "clsx";

interface DropdownMenuItem {
  label: string;
  href: string;
}

interface DropdownButtonProps extends ButtonBaseProps {
  label: string;
  items?: DropdownMenuItem[];
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function DropdownButton({
  label,
  items,
  icon,
  className,
  ...props
}: PropsWithChildren<DropdownButtonProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        component="button"
        onClick={handleClick}
        disableRipple
        className={clsx(
          "flex items-center gap-1 font-medium text-white! whitespace-nowrap",
          className
        )}
        {...props}
      >
        {label} {icon ?? <AltArrowDown size={18} color="common.white" />}
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {items?.map((item) => (
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
