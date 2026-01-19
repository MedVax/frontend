"use client";

import {
  Box,
  AppBar,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import { useState } from "react";
import { AltArrowDown, User, Magnifer } from "@solar-icons/react";
import {
  CartButton,
  DropdownButton,
  Link,
  Shell,
  WhatsAppButton,
} from "@/components/ui";

const categoryMenuItems = [
  { label: "Category 1", href: "#category/health-wellness" },
  { label: "Category 2", href: "#category/mother-child" },
  { label: "Category 3", href: "#category/hair" },
  { label: "Category 4", href: "#category/skin" },
  { label: "Category 5", href: "#category/toiletries" },
  { label: "Category 6", href: "#category/mens" },
  { label: "Category 7", href: "#category/gum" },
  { label: "Category 8", href: "#category/hot-details" },
];

const prescriptionMenuItems = [
  { label: "Upload Prescription", href: "/prescription/upload" },
  { label: "View Prescriptions", href: "/prescription/view" },
];

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          px: 0,
          py: 6,
          my: 0,
        }}
      >
        <Shell>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/logo.svg"
                  alt="MedVax Logo"
                  className="w-[25px] h-[29px]"
                />
                <span className="font-extrabold text-black">MedVax</span>
              </div>
              {/* Search Bar */}
              <TextField
                placeholder="Search medication"
                variant="outlined"
                size="small"
                sx={{
                  width: 420,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "99px",
                    height: 48,
                    backgroundColor: "white",
                    border: "1.3px solid #e5e7eb",
                    pr: 0.5,
                    "& fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                  display: {
                    xs: "none !important",
                    md: "flex !important",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Magnifer size={24} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: 106,
                          }}
                        >
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Right Actions */}
            <div className="sm:flex items-center gap-4 hidden">
              {/* My Account */}
              <Button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                sx={{
                  backgroundColor: "#fef1f8",
                  color: "#e91d74",
                  fontWeight: 500,
                  fontSize: 16,
                  gap: 2,
                  "&:hover": {
                    backgroundColor: "#fce7f3",
                  },
                }}
              >
                <User size={20} />
                My account
                <AltArrowDown size={16} />
              </Button>

              <CartButton count={4} />
              <WhatsAppButton />
            </div>
          </Toolbar>
        </Shell>
      </AppBar>

      {/* Navigation Bar */}
      <div
        className="bg-gray-900 hidden sm:block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Shell className="flex items-center gap-6 py-4">
          <DropdownButton
            label="Shop by category"
            items={categoryMenuItems}
            variant="dark"
          />

          <Link href="#/consultation">Consultation</Link>

          <DropdownButton
            label="Upload Prescription"
            items={prescriptionMenuItems}
            variant="dark"
          />

          <Link href="#/contact">Contact Us</Link>

          <Link href="#/about">About</Link>
        </Shell>

        <div
          className={`bg-white shadow-sm shadow-black/4 absolute left-0 w-full transition-all duration-300 ease-in-out ${
            isHovered
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <Shell className="flex items-center gap-6 py-5">
            {[
              {
                name: "Health & Wellness",
                image: "/assets/category-mother-child.png",
              },
              {
                name: "Mother & Child",
                image: "/assets/category-mother-child.png",
              },
              { name: "Hair", image: "/assets/category-mother-child.png" },
              { name: "Skin", image: "/assets/category-mother-child.png" },
              {
                name: "Toiletries",
                image: "/assets/category-mother-child.png",
              },
              { name: "Mens", image: "/assets/category-mother-child.png" },
              { name: "Gum", image: "/assets/category-mother-child.png" },
              {
                name: "Hot Details",
                image: "/assets/category-mother-child.png",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu(category.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="text-gray-600 hover:text-gray-600/80 font-medium text-base transition-colors duration-200 py-2 flex items-center gap-2">
                  {category.name} <AltArrowDown size={12} />
                </button>
                {activeMegaMenu === category.name && (
                  <div className="absolute left-0 top-full w-[591px] h-[288px] bg-white shadow-lg border-b rounded-b-xl border-gray-100 animate-fadeIn z-50 -ml-8">
                    <div className="max-w-[1200px] mx-auto px-8 py-10">
                      <div className="flex gap-12">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-6">
                            <img
                              src="/assets/logo.svg"
                              alt="MedVax Logo"
                              className="w-[13px] h-[16px]"
                            />
                            <h3 className="text-lg font-medium text-black">
                              Main Category
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, index) => (
                              <a
                                key={index}
                                href="#"
                                className="text-sm text-gray-600 hover:text-gray-600/80 transition-colors duration-200 py-1"
                              >
                                Category 1
                              </a>
                            ))}
                          </div>
                        </div>
                        <div
                          className="w-[273.68px] h-[185px] rounded-lg bg-gray-300 bg-center bg-contain bg-no-repeat"
                          style={{
                            backgroundImage: `url(${category.image})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Shell>
        </div>
      </div>
    </>
  );
}
