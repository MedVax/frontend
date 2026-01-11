"use client";

import { Box, Container, TextField, Button, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-nunito",
});

export function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="xl" className="px-12">
        <Box className="flex justify-between gap-8 mb-12">
          {/* Logo */}
          <Box className="flex items-start gap-2">
            <Box
              component="img"
              src="/assets/logo.svg"
              alt="MedVax Logo"
              sx={{ width: 25, height: 29 }}
            />
            <Box
              className={`${nunito.variable} font-extrabold text-[22px] leading-[34px] tracking-[-0.57px] text-black`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              MedVax
            </Box>
          </Box>

          {/* MedVax Links */}
          <Box className="flex flex-col gap-4">
            <Box
              className={`${nunito.variable} font-medium text-base text-black opacity-50`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              MedVax
            </Box>
            <Box className="flex flex-col gap-3">
              {[
                "Pharmacy",
                "Consultation",
                "ChatBot",
                "Contact  Us",
                "About Us",
              ].map((link) => (
                <Box
                  key={link}
                  className={`${nunito.variable} font-medium text-base text-black cursor-pointer hover:text-[#e91d74] transition-colors`}
                  sx={{ fontFamily: "var(--font-nunito)" }}
                >
                  {link}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Legal Links */}
          <Box className="flex flex-col gap-4">
            <Box
              className={`${nunito.variable} font-medium text-base text-black opacity-50`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Legal
            </Box>
            <Box className="flex flex-col gap-3">
              {[
                "Privacy Policy",
                "Terms & Condition",
                "Refund &\nDelivery Policy",
              ].map((link) => (
                <Box
                  key={link}
                  className={`${nunito.variable} font-medium text-base text-black cursor-pointer hover:text-[#e91d74] transition-colors whitespace-pre-line`}
                  sx={{ fontFamily: "var(--font-nunito)" }}
                >
                  {link}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Social Media */}
          <Box className="flex flex-col gap-4">
            <Box
              className={`${nunito.variable} font-medium text-base text-black opacity-50`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Social Media
            </Box>
            <Box className="flex gap-3 items-center">
              <Icon
                icon="ri:instagram-fill"
                width={20}
                height={20}
                className="cursor-pointer hover:opacity-70"
                style={{ color: "#e91d74" }}
              />
              <Icon
                icon="ri:twitter-x-fill"
                width={16}
                height={16}
                className="cursor-pointer hover:opacity-70"
              />
              <Icon
                icon="ic:baseline-facebook"
                width={20}
                height={20}
                className="cursor-pointer hover:opacity-70"
              />
            </Box>
          </Box>

          {/* Contact Us */}
          <Box className="flex flex-col gap-4">
            <Box
              className={`${nunito.variable} font-medium text-base text-black opacity-50`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Contact Us
            </Box>
            <Box
              className={`${nunito.variable} font-medium text-base text-black`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              +234 812 383 4240
            </Box>
          </Box>

          {/* Newsletter */}
          <Box className="flex flex-col gap-4 w-[280px]">
            <Box
              className={`${nunito.variable} font-medium text-base text-black opacity-50`}
              sx={{ fontFamily: "var(--font-nunito)" }}
            >
              Subscribe to our Newsletter
            </Box>
            <TextField
              placeholder="Enter email to sign up"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "99px",
                  height: 48,
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
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
                "& .MuiInputBase-input": {
                  fontSize: 14,
                },
              }}
            />
            <Button
              fullWidth
              sx={{
                backgroundColor: "#e91d74",
                borderRadius: "84px",
                height: 48,
                textTransform: "none",
                fontFamily: "var(--font-nunito)",
                fontWeight: 500,
                fontSize: 16,
                color: "white",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#c2185b",
                },
              }}
            >
              Join newsletter
            </Button>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: "#e5e7eb" }} />

        {/* Copyright */}
        <Box className="flex justify-start pt-6">
          <Box
            className={`${nunito.variable} font-normal text-base text-black`}
            sx={{ fontFamily: "var(--font-nunito)" }}
          >
            © MexdVax 2025 | All Rights Reserved
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
