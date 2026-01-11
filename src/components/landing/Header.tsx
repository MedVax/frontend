"use client";

import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

export function Header() {
  const [categoryAnchor, setCategoryAnchor] = useState<null | HTMLElement>(
    null
  );
  const [prescriptionAnchor, setPrescriptionAnchor] =
    useState<null | HTMLElement>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchor(event.currentTarget);
    setCategoryMenuOpen(true);
  };

  const handleCategoryClose = () => {
    setCategoryAnchor(null);
    setCategoryMenuOpen(false);
  };

  const handlePrescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    setPrescriptionAnchor(event.currentTarget);
  };

  const handlePrescriptionClose = () => {
    setPrescriptionAnchor(null);
  };

  return (
    <>
      {/* Main Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          height: 96,
        }}
      >
        <Container maxWidth="xl" className="px-12">
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
            {/* Logo */}
            <Box className="flex items-center gap-2">
              <Box
                component="img"
                src="/assets/logo.svg"
                alt="MedVax Logo"
                sx={{ width: 25.13, height: 29.15 }}
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <Box
                className={`${nunito.variable} font-extrabold text-[22.851px] leading-[34.277px] tracking-[-0.5713px] text-black`}
                sx={{ fontFamily: "var(--font-nunito)" }}
              >
                MedVax
              </Box>
            </Box>

            {/* Search Bar */}
            <Box className="flex items-center gap-2">
              <TextField
                placeholder="Search medication"
                variant="outlined"
                size="small"
                sx={{
                  width: 313,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "99px",
                    height: 48,
                    backgroundColor: "white",
                    border: "1.3px solid #e5e7eb",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="material-symbols:search"
                        width={24}
                        height={24}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e91d74",
                  borderRadius: "84px",
                  height: 48,
                  minWidth: 106,
                  px: 2,
                  textTransform: "none",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 500,
                  fontSize: 16,
                  "&:hover": {
                    backgroundColor: "#c2185b",
                  },
                }}
              >
                Search
              </Button>
            </Box>

            {/* Right Actions */}
            <Box className="flex items-center gap-4">
              {/* My Account */}
              <Button
                className="flex items-center gap-2 px-4 py-2.5 rounded-[99px]"
                sx={{
                  backgroundColor: "#fef1f8",
                  color: "#e91d74",
                  textTransform: "none",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 500,
                  fontSize: 16,
                  "&:hover": {
                    backgroundColor: "#fce7f3",
                  },
                }}
              >
                <Icon
                  icon="material-symbols:shopping-cart-outline"
                  width={20}
                  height={20}
                />
                My account
                <Icon
                  icon="material-symbols:arrow-drop-down"
                  width={16}
                  height={16}
                />
              </Button>

              {/* Cart */}
              <IconButton
                sx={{
                  position: "relative",
                  width: 48,
                  height: 48,
                  borderRadius: "99px",
                  p: 1.25,
                }}
              >
                <Icon
                  icon="material-symbols:shopping-cart-outline"
                  width={24}
                  height={24}
                />
                <Badge
                  badgeContent={4}
                  sx={{
                    position: "absolute",
                    top: 7,
                    right: 7,
                    "& .MuiBadge-badge": {
                      backgroundColor: "#e91d74",
                      color: "white",
                      fontSize: 12,
                      fontWeight: 700,
                      minWidth: 16,
                      height: 16,
                      padding: "0 4px",
                    },
                  }}
                />
              </IconButton>

              {/* WhatsApp */}
              <IconButton
                sx={{
                  backgroundColor: "#dcfce7",
                  width: 48,
                  height: 48,
                  borderRadius: "99px",
                  "&:hover": {
                    backgroundColor: "#bbf7d0",
                  },
                }}
              >
                <Icon icon="ic:outline-whatsapp" width={24} height={24} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Navigation Bar */}
      <Box
        sx={{
          backgroundColor: "#111827",
          borderBottom: categoryMenuOpen ? "1px solid white" : "none",
          boxShadow: categoryMenuOpen
            ? "0px 6px 17px 0px rgba(0,0,0,0.04)"
            : "none",
        }}
      >
        <Container maxWidth="xl" className="px-12">
          <Box className="flex items-center gap-6 py-4">
            <Button
              onClick={handleCategoryClick}
              endIcon={
                <Icon
                  icon="material-symbols:arrow-drop-down"
                  width={12}
                  height={12}
                />
              }
              sx={{
                color: "white",
                textTransform: "none",
                fontFamily: "var(--font-nunito)",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-0.4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Shop by category
            </Button>

            <Button
              sx={{
                color: "white",
                textTransform: "none",
                fontFamily: "var(--font-nunito)",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-0.4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Consultation
            </Button>

            <Button
              onClick={handlePrescriptionClick}
              endIcon={
                <Icon
                  icon="material-symbols:arrow-drop-down"
                  width={12}
                  height={12}
                />
              }
              sx={{
                color: "white",
                textTransform: "none",
                fontFamily: "var(--font-nunito)",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-0.4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Upload Prescription
            </Button>

            <Button
              sx={{
                color: "white",
                textTransform: "none",
                fontFamily: "var(--font-nunito)",
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
                textTransform: "none",
                fontFamily: "var(--font-nunito)",
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
          </Box>

          {/* Category Dropdown Menu */}
          {categoryMenuOpen && (
            <Box
              sx={{
                backgroundColor: "white",
                borderTop: "1px solid white",
                height: 67,
                boxShadow: "0px 6px 17px 0px rgba(0,0,0,0.04)",
              }}
            >
              <Box className="flex items-center gap-6 px-12 py-6">
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
                  <Button
                    key={category}
                    endIcon={
                      <Icon
                        icon="material-symbols:arrow-drop-down"
                        width={12}
                        height={12}
                      />
                    }
                    sx={{
                      color: "#4b5563",
                      textTransform: "none",
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 500,
                      fontSize: 16,
                      letterSpacing: "-0.4px",
                      "&:hover": {
                        backgroundColor: "rgba(233, 29, 116, 0.1)",
                      },
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Container>

        {/* Dropdown Menus */}
        <Menu
          anchorEl={categoryAnchor}
          open={Boolean(categoryAnchor)}
          onClose={handleCategoryClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem onClick={handleCategoryClose}>Health & Wellness</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Mother & Child</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Hair</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Skin</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Toiletries</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Mens</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Gum</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Hot Details</MenuItem>
        </Menu>

        <Menu
          anchorEl={prescriptionAnchor}
          open={Boolean(prescriptionAnchor)}
          onClose={handlePrescriptionClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem onClick={handlePrescriptionClose}>
            Upload Prescription
          </MenuItem>
          <MenuItem onClick={handlePrescriptionClose}>
            View Prescriptions
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
