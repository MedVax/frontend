"use client";

import { TextField, Button, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import { Shell } from "../ui";

export function Footer() {
  return (
    <Shell
      id="footer"
      component="section"
      className="bg-gray-50 pt-12 pb-8 rounded-3xl mb-8"
    >
      <div className="flex sm:flex-row flex-col justify-between gap-8 mb-12">
        {/* Logo */}
        <div className="flex items-start gap-2">
          <img
            src="/assets/logo.svg"
            alt="MedVax Logo"
            className="w-[25px] h-[29px]"
          />
          <span className="font-extrabold text-[22px] leading-[34px] tracking-[-0.57px] text-black">
            MedVax
          </span>
        </div>

        {/* MedVax Links */}
        <div className="flex flex-col gap-4">
          <span className="font-medium text-base text-gray-950/50">MedVax</span>
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
                className="font-medium text-base text-gray-950 hover:text-primary-500 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-4">
          <span className="font-medium text-base text-gray-950/50">Legal</span>
          <div className="flex flex-col gap-3">
            {[
              "Privacy Policy",
              "Terms & Condition",
              "Refund &\nDelivery Policy",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="font-medium text-base text-gray-950 hover:text-primary-500 transition-colors whitespace-pre-line"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-4">
          <span className="font-medium text-base text-gray-950/50">
            Social Media
          </span>
          <div className="flex gap-3 items-center">
            <Icon
              icon="ri:instagram-fill"
              width={20}
              height={20}
              className="cursor-pointer hover:opacity-70 text-[#E1306C]"
            />
            <Icon
              icon="ri:twitter-x-fill"
              width={16}
              height={16}
              className="cursor-pointer hover:opacity-70 text-[#000000]"
            />
            <Icon
              icon="ic:baseline-facebook"
              width={20}
              height={20}
              className="cursor-pointer hover:opacity-70 text-[#1877F2]"
            />
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col gap-4">
          <span className="font-medium text-base text-gray-950/50">
            Contact Us
          </span>
          <span className="font-medium text-base text-black">
            +234 812 383 4240
          </span>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <span className="font-medium text-base text-black/50">
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
                // border: "1px solid #e5e7eb",
              },
            }}
          />
          <Button variant="contained">Join newsletter</Button>
        </div>
      </div>

      <Divider sx={{ borderColor: "#e5e7eb" }} />

      <div className="flex justify-start pt-6">
        <span className="font-normal text-base text-black">
          © MexdVax {new Date().getFullYear()} | All Rights Reserved
        </span>
      </div>
    </Shell>
  );
}
