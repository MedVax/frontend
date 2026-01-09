'use client';

import { Box } from '@mui/material';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito',
});

const serveItems = [
  {
    title: 'Individuals & Families',
    description: 'Convenient, fast access to safe and verified medicines.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=416&h=519&fit=crop',
  },
  {
    title: 'Hospitals & Clinics',
    description:
      'Dependable medication fulfillment and last-mile delivery for patient care.',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=416&h=519&fit=crop',
  },
  {
    title: 'HMOs & Health Insurers',
    description:
      'Streamlined medication access for enrollees with improved efficiency, compliance, and data visibility.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=416&h=519&fit=crop',
  },
];

export function WhoWeServe() {
  return (
    <Box className="flex flex-col items-center mb-20 gap-20">
      <Box
        className={`${nunito.variable} font-semibold text-4xl text-black text-center`}
        sx={{ fontFamily: 'var(--font-nunito)' }}
      >
        Who We Serve
      </Box>
      <Box className="flex gap-[22px]">
        {serveItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: 416,
              height: 519,
              borderRadius: '24px',
              backgroundColor: 'rgba(243, 244, 246, 0.75)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Image with Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: -11.89,
                left: -16,
                width: 443,
                height: 543,
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 1.581%, rgba(0,0,0,1) 100%)',
                  mixBlendMode: 'multiply',
                }}
              />
            </Box>

            {/* Content */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '32.89px',
                left: '32px',
                right: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                color: 'white',
              }}
            >
              <Box
                className={`${nunito.variable} font-semibold text-3xl`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                {item.title}
              </Box>
              <Box
                className={`${nunito.variable} font-normal text-lg`}
                sx={{ fontFamily: 'var(--font-nunito)' }}
              >
                {item.description}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

