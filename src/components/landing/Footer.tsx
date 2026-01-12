"use client";

import { Container, TextField, Button, Divider } from "@mui/material";
import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-8 pb-6">
      <Container maxWidth="xl" className="px-12">
        <div className="flex justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="flex items-start gap-2">
            <img
              src="/assets/logo.svg"
              alt="MedVax Logo"
              className="w-[25px] h-[29px]"
            />
            <span className="font-extrabold text-[22px] leading-[34px] tracking-[-0.57px] text-black font-[family-name:var(--font-nunito)]">
              MedVax
            </span>
          </div>

          {/* MedVax Links */}
          <div className="flex flex-col gap-4">
            <span className="font-medium text-base text-black/50 font-[family-name:var(--font-nunito)]">
              MedVax
            </span>
            <div className="flex flex-col gap-3">
              {[
                "Pharmacy",
                "Consultation",
                "ChatBot",
                "Contact  Us",
                "About Us",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-medium text-base text-black hover:text-[#e91d74] transition-colors font-[family-name:var(--font-nunito)]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <span className="font-medium text-base text-black/50 font-[family-name:var(--font-nunito)]">
              Legal
            </span>
            <div className="flex flex-col gap-3">
              {[
                "Privacy Policy",
                "Terms & Condition",
                "Refund &\nDelivery Policy",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-medium text-base text-black hover:text-[#e91d74] transition-colors whitespace-pre-line font-[family-name:var(--font-nunito)]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <span className="font-medium text-base text-black/50 font-[family-name:var(--font-nunito)]">
              Social Media
            </span>
            <div className="flex gap-3 items-center">
              <Icon
                icon="ri:instagram-fill"
                width={20}
                height={20}
                className="cursor-pointer hover:opacity-70 text-[#e91d74]"
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
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-4">
            <span className="font-medium text-base text-black/50 font-[family-name:var(--font-nunito)]">
              Contact Us
            </span>
            <span className="font-medium text-base text-black font-[family-name:var(--font-nunito)]">
              +234 812 383 4240
            </span>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4 w-[280px]">
            <span className="font-medium text-base text-black/50 font-[family-name:var(--font-nunito)]">
              Subscribe to our Newsletter
            </span>
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
          </div>
        </div>

        {/* Divider */}
        <Divider sx={{ borderColor: "#e5e7eb" }} />

        {/* Copyright */}
        <div className="flex justify-start pt-6">
          <span className="font-normal text-base text-black font-[family-name:var(--font-nunito)]">
            © MexdVax 2025 | All Rights Reserved
          </span>
        </div>
      </Container>
    </footer>
  );
}
