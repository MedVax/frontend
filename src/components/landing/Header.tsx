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
import { AltArrowDown, User, Magnifer } from "@solar-icons/react";
import {
  CartButton,
  DropdownButton,
  Shell,
  WhatsAppButton,
} from "@/components/ui";
import Link from "next/link";

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
  return (
    <>
      {/* Main Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          px: 12,
          height: 96,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "96px !important",
              height: 96,
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
            <div className="flex items-center gap-4">
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
        </Container>
      </AppBar>

      {/* Navigation Bar */}
      <Box
        sx={{
          backgroundColor: "#111827",
        }}
      >
        <Container sx={{ px: "0 !important" }} maxWidth="xl">
          <Shell className="flex items-center gap-6 py-4">
            <DropdownButton
              label="Shop by category"
              items={categoryMenuItems}
              variant="dark"
            />

            <Link href="/consultation">
              <Button
                variant="text"
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Consultation
              </Button>
            </Link>

            <DropdownButton
              label="Upload Prescription"
              items={prescriptionMenuItems}
              variant="dark"
            />

            <Button
              sx={{
                color: "white",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-0.4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Contact Us
            </Button>

            <Button
              sx={{
                color: "white",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-0.4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              About
            </Button>
          </Shell>

          {/* Category Dropdown Menu */}
          <div className="bg-white shadow-sm">
            <Shell className="flex items-center gap-6 py-5">
              {[
                "Health & Wellness",
                "Mother & Child",
                "Hair",
                "Skin",
                "Toiletries",
                "Mens",
                "Gum",
                "Hot Details",
              ].map((category) => (
                <DropdownButton
                variant="light"
                  key={category}
                  label={category}
                  items={[
                    { label: "Subcategory 1", href: "#" },
                    { label: "Subcategory 2", href: "#" },
                  ]}
                />
              ))}
            </Shell>
          </div>
        </Container>
      </Box>
    </>
  );
}
