'use client';

import { Box, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito',
});

const features = [
  {
    icon: 'material-symbols:rocket-launch-outline',
    title: 'Fast Delivery',
    description: 'Get your medications delivered quickly, right when you need them.',
  },
  {
    icon: 'material-symbols:verified-user-outline',
    title: 'Quality Service',
    description:
      'Enjoy reliable support, verified products, and a seamless healthcare experience.',
  },
  {
    icon: 'material-symbols:favorite-outline',
    title: 'Trusted Care',
    description:
      'Count on MedVax for safe handling, secure processes, and health solutions.',
  },
];

export function FeaturesSection() {
  return (
    <Box className="flex gap-4 p-6 rounded-[24px] mb-16">
      {features.map((feature, index) => (
        <Box
          key={index}
          className="flex-1 flex gap-4 items-center p-6 rounded-[24px]"
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '99px',
              backgroundColor: 'rgba(233, 29, 116, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon
              icon={feature.icon}
              width={24}
              height={24}
              style={{ color: '#e91d74' }}
            />
          </Box>
          <Box className="flex-1 flex flex-col gap-2">
            <Box
              className={`${nunito.variable} font-medium text-xl text-black`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              {feature.title}
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              {feature.description}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

