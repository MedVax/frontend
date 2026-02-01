"use client";

import {
  Breadcrumbs,
  Drawer,
  IconButton,
  List,
  useMediaQuery,
} from "@mui/material";
import Link, { LinkProps } from "next/link";
import React from "react";
import clsx from "clsx";
import { Icon as Iconify } from "@iconify/react";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import useSideMenu from "@/hooks/use-side-menu";
import useAuthUser from "@/hooks/use-auth";

export const DashboardSidebar = () => {
  const { isSideMenu, toggleSideMenu } = useSideMenu();
  const isMediumScreen = useMediaQuery("(max-width: 640px)");

  return (
    <div>
      {" "}
      {isMediumScreen ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={isSideMenu}
          onClose={toggleSideMenu}
        >
          <div className="py-4 px-6 relative">
            <IconButton
              onClick={toggleSideMenu}
              className="absolute top-4 right-4"
            >
              <Iconify icon="material-symbols:close" />
            </IconButton>
            <SideBar />
          </div>
        </Drawer>
      ) : (
        <div className="w-[200px]">
          <SideBar />
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  const pathname = usePathname();
  const { toggleSideMenu } = useSideMenu();
  const authUser = useAuthUser();
  const isConsultant = authUser?.user?.activeProfile?.type === "CONSULTANT";

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments[segments.length - 1];
  const breadcrumbText =
    breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
  const breadcrumbs = [
    <Link key="1" className="text-black" color="inherit" href="/dashboard">
      Home
    </Link>,
    <Typography key="2" sx={{ color: "text.secondary" }}>
      {breadcrumbText}
    </Typography>,
  ];
  return (
    <div className="w-full w-[200px]">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h5" className="font-semibold mt-2" noWrap>
        Dashboard
      </Typography>
      <List className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden space-y-3 mt-10">
        {NAV_LINKS.filter((link) => {
          // Show availability only for consultants
          if (link.href === "/dashboard/availability") {
            return isConsultant;
          }
          // Show assign consultant only for clients
          if (link.clientOnly) {
            return !isConsultant;
          }
          return true;
        }).map(({ icon, ...linkProps }, index) => {
          return (
            <Link
              key={index}
              onClick={() => toggleSideMenu()}
              {...linkProps}
              className={clsx(
                "flex items-center justify-start text-left gap-2 px-[12px] py-[12px] rounded-lg no-underline",
                pathname === linkProps.href
                  ? "bg-[#FEF1F8] text-primary-main"
                  : "text-grey-9"
              )}
            >
              <div
                className={clsx("rounded-lg flex justify-center items-center")}
              >
                {icon && <Iconify className="text-xl" icon={icon} />}
              </div>
              <Typography component="span" className="font-medium">
                {linkProps.children}
              </Typography>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

export default DashboardSidebar;

const NAV_LINKS = [
  {
    icon: "fluent:data-pie-16-regular",
    children: "Dashboard",
    href: "/dashboard",
  },
  {
    children: "Bookings",
    href: "/dashboard/bookings",
    icon: "solar:calendar-outline",
  },
  {
    children: "Availability",
    href: "/dashboard/availability",
    icon: "solar:calendar-mark-outline",
  },
  {
    children: "My Orders",
    href: "/dashboard/orders",
    icon: "solar:box-broken",
  },
  {
    children: "My Addresses",
    href: "/dashboard/addresses",
    icon: "fluent:location-16-regular",
  },
  {
    children: "My Watchlist",
    href: "/dashboard/watchlist",
    icon: "solar:heart-angle-outline",
  },
  {
    children: "Assign Consultant",
    href: "/dashboard/consultants",
    icon: "solar:user-plus-outline",
    clientOnly: true,
  },
  {
    children: "Security",
    href: "/dashboard/security",
    icon: "solar:lock-linear",
  },
  {
    children: "My profile",
    href: "/dashboard/profile",
    icon: "solar:user-outline",
  },

] as ({ icon?: string; activeIcon?: string; children: string; clientOnly?: boolean } & LinkProps)[];
