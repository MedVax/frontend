'use client';

import { Box } from '@mui/material';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
});

export function PartnersSection() {
  const partnerLogos = [
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=111&h=111&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=111&h=111&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=111&h=111&fit=crop',
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '24px',
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        alignItems: 'center',
        mb: 16,
      }}
    >
      <Box
        className={`${dmSans.variable} font-medium text-[30px] text-black text-center tracking-[-0.4px]`}
        sx={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Our partners
      </Box>
      <Box className="flex gap-7">
        {partnerLogos.map((logo, index) => (
          <Box
            key={index}
            sx={{
              width: 111,
              height: 111,
              borderRadius: '1108.89px',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.08,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt={`Partner ${index + 1}`}
              sx={{
                width: 79.52,
                height: 79.52,
                borderRadius: '999px',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

