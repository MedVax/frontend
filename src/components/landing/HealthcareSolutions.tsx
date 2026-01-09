'use client';

import { Box, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito',
});

export function HealthcareSolutions() {
  return (
    <Box className="flex flex-col items-center mb-16">
      <Box
        className={`${nunito.variable} font-semibold text-4xl text-black text-center mb-12`}
        sx={{ fontFamily: 'var(--font-nunito)' }}
      >
        One-top healthcare solutions provider
      </Box>

      {/* E-Pharmacy and Consultation */}
      <Box className="flex gap-4 mb-4">
        {/* E-Pharmacy Card */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f9fafb',
            borderRadius: '24px',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <Box className="flex flex-col items-start w-full">
            <Box
              className={`${nunito.variable} font-semibold text-base text-[#e91d74] mb-2`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              E-Pharmacy
            </Box>
            <Box
              className={`${nunito.variable} font-semibold text-2xl text-black mb-2`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Order medications with ease.
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Easily access verified medications, supplements, and health essentials with quick,
              reliable delivery straight to your doorstep.
            </Box>
          </Box>
          <Box
            sx={{
              width: 262,
              height: 262,
              borderRadius: '9999px',
              backgroundColor: '#e3dfda',
              border: '8px solid white',
              boxShadow: '3px 4px 63px -1px rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=262&h=262&fit=crop"
              alt="Pharmacy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '9999px',
              }}
            />
          </Box>
        </Box>

        {/* Consultation Card */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f9fafb',
            borderRadius: '24px',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 7.25,
            alignItems: 'center',
          }}
        >
          <Box className="flex flex-col items-start w-full">
            <Box
              className={`${nunito.variable} font-semibold text-base text-[#e91d74] mb-2`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Consultation
            </Box>
            <Box
              className={`${nunito.variable} font-semibold text-2xl text-black mb-2`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Speak with a licensed expert anytime
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Connect with licensed doctors and pharmacists for real-time medical advice,
              prescription support, and follow-up guidance
            </Box>
          </Box>
          <Box
            sx={{
              width: 262,
              height: 262,
              borderRadius: '999px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=262&h=262&fit=crop"
              alt="Consultation"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '999px',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Chatbot Section */}
      <Box
        sx={{
          backgroundColor: '#f9fafb',
          borderRadius: '24px',
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box className="flex flex-col items-center gap-6 w-[469px]">
          <Box className="flex flex-col items-center gap-4 text-center">
            <Box
              className={`${nunito.variable} font-semibold text-base text-[#e91d74]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Chatbot
            </Box>
            <Box
              className={`${nunito.variable} font-medium text-4xl text-black tracking-[-0.8px]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Instant answers, personalized support.
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Get instant, AI-powered answers to symptoms, medication questions, and basic health
              concerns, available around the clock.
            </Box>
          </Box>
          <Button
            sx={{
              background: 'linear-gradient(180deg, #f472b6 0%, #db2777 100%)',
              borderRadius: '84px',
              height: 56,
              width: 187,
              textTransform: 'none',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 500,
              fontSize: 16,
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(180deg, #ec4899 0%, #be185d 100%)',
              },
            }}
          >
            Chat with us
          </Button>
        </Box>
        <Box
          sx={{
            width: 374,
            height: 446,
            position: 'relative',
            borderRadius: '48px 48px 0 0',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=374&h=446&fit=crop"
            alt="Chatbot"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '48px 48px 0 0',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

