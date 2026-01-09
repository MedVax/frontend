'use client';

import { Box, Container, TextField, Button, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-nunito',
});

export function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f9fafb',
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="xl" className="px-12">
        <Box className="flex items-start justify-between mb-12">
          {/* Logo and MedVax Column */}
          <Box className="flex gap-16">
            {/* Logo */}
            <Box className="flex items-center gap-2">
              <Box
                component="img"
                src="/logo.svg"
                alt="MedVax Logo"
                sx={{ width: 25.13, height: 29.15 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <Box
                className={`${nunito.variable} font-extrabold text-[22.851px] leading-[34.277px] tracking-[-0.5713px] text-black`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                MedVax
              </Box>
            </Box>

            {/* MedVax Links */}
            <Box className="flex flex-col gap-4">
              <Box
                className={`${nunito.variable} font-medium text-base text-black opacity-50`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                MedVax
              </Box>
              <Box className="flex flex-col gap-3">
                {['Pharmacy', 'Consultation', 'ChatBot', 'Contact Us', 'About Us'].map(
                  (link) => (
                    <Box
                      key={link}
                      className={`${nunito.variable} font-medium text-base text-black cursor-pointer hover:text-[#e91d74] transition-colors`}
                      sx={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {link}
                    </Box>
                  ),
                )}
              </Box>
            </Box>

            {/* Legal Links */}
            <Box className="flex flex-col gap-4">
              <Box
                className={`${nunito.variable} font-medium text-base text-black opacity-50`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                Legal
              </Box>
              <Box className="flex flex-col gap-3">
                {[
                  'Privacy Policy',
                  'Terms & Condition',
                  'Refund & Delivery Policy',
                ].map((link) => (
                  <Box
                    key={link}
                    className={`${nunito.variable} font-medium text-base text-black cursor-pointer hover:text-[#e91d74] transition-colors`}
                    sx={{ fontFamily: 'var(--font-nunito)' }}
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
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                Social Media
              </Box>
              <Box className="flex gap-[15px]">
                <Icon
                  icon="ri:instagram-fill"
                  width={24}
                  height={24}
                  className="cursor-pointer hover:opacity-70"
                />
                <Icon
                  icon="mdi:twitter"
                  width={14}
                  height={14}
                  className="cursor-pointer hover:opacity-70"
                />
                <Icon
                  icon="ic:baseline-facebook"
                  width={24}
                  height={24}
                  className="cursor-pointer hover:opacity-70"
                />
              </Box>
            </Box>

            {/* Contact Us */}
            <Box className="flex flex-col gap-4">
              <Box
                className={`${nunito.variable} font-medium text-base text-black opacity-50`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                Contact Us
              </Box>
              <Box
                className={`${nunito.variable} font-medium text-base text-black`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                +234 812 383 4240
              </Box>
            </Box>

            {/* Newsletter */}
            <Box className="flex flex-col gap-4 w-[305px]">
              <Box
                className={`${nunito.variable} font-medium text-base text-black opacity-50`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                Subscribe to our Newsletter
              </Box>
              <TextField
                placeholder="Enter email to sign up"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '99px',
                    height: 48,
                    backgroundColor: 'white',
                    border: '1.3px solid #e5e7eb',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
              <Button
                fullWidth
                sx={{
                  backgroundColor: '#e91d74',
                  borderRadius: '84px',
                  height: 48,
                  textTransform: 'none',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 500,
                  fontSize: 16,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#c2185b',
                  },
                }}
              >
                Join newsletter
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: '#d1d5db' }} />

        {/* Copyright */}
        <Box className="flex justify-center">
          <Box
            className={`${nunito.variable} font-normal text-lg text-black`}
            sx={{ fontFamily: 'var(--font-nunito)' }}
          >
            © MexdVax 2025 | All Rights Reserved
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

