'use client';

import { Box, Button, Container } from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
});

export function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 802,
        width: '100%',
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 25.836%, rgba(255,255,255,1) 59.875%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1440&h=802&fit=crop"
        alt="Hero background"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" className="px-12 relative z-10">
        <Box className="flex items-start pt-[175px]">
          {/* Left Content */}
          <Box className="flex flex-col gap-10 w-[456px]">
            <Box className="flex flex-col gap-6">
              {/* Trusted Badge */}
              <Box className="flex items-center gap-3">
                <Box
                  component="img"
                  src="/trusted-icon.svg"
                  alt="Trusted"
                  sx={{ width: 15.52, height: 18 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <Box
                  className={`${nunito.variable} font-medium text-base text-black`}
                  sx={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Trusted by 100k+ users
                </Box>
              </Box>

              {/* Main Heading */}
              <Box>
                <Box
                  className={`${nunito.variable} font-semibold leading-[1.03] tracking-[-3.4369px] text-black`}
                  sx={{
                    fontFamily: 'var(--font-nunito)',
                    fontSize: '68.738px',
                  }}
                >
                  E-Pharmacy & Consultation{' '}
                  <Box component="span" sx={{ fontStyle: 'italic', color: '#e91d74' }}>
                    made easy
                  </Box>
                </Box>
              </Box>

              {/* Description */}
              <Box
                className={`${nunito.variable} font-normal text-base text-[#4b5563] w-[451.748px]`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                As a full-service pharmacy We connect people and healthcare providers with quality
                medications and solutions that improve health outcomes.
              </Box>
            </Box>

            {/* CTA Buttons */}
            <Box className="flex items-start gap-3">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#e91d74',
                  borderRadius: '84px',
                  height: 56,
                  width: 150,
                  textTransform: 'none',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 500,
                  fontSize: 16,
                  '&:hover': {
                    backgroundColor: '#c2185b',
                  },
                }}
              >
                Visit Pharmacy
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  height: 56,
                  width: 171,
                  textTransform: 'none',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 500,
                  fontSize: 16,
                  color: '#030712',
                  boxShadow: '0px 0px 18px 0px rgba(0,0,0,0.04)',
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                    border: 'none',
                  },
                }}
              >
                Book Consultation
              </Button>
            </Box>
          </Box>

          {/* Right Images */}
          <Box className="flex gap-3 ml-auto">
            <Box
              sx={{
                width: 294,
                height: 472,
                borderRadius: '24px',
                backgroundColor: 'white',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=294&h=472&fit=crop"
                alt="Healthcare"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box className="flex flex-col gap-3 w-[249px] h-[470px]">
              <Box
                sx={{
                  flex: 1,
                  borderRadius: '24px',
                  backgroundColor: '#e4e4e4',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=249&h=239&fit=crop"
                  alt="Healthcare"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: '24px',
                  backgroundColor: '#e4e4e4',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=249&h=239&fit=crop"
                  alt="Healthcare"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

