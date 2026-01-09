'use client';

import { Box, Button } from '@mui/material';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito',
});

export function CtaSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(243, 244, 246, 0.75)',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        height: 641,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        px: 10,
        py: 5,
        mb: 16,
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: -23.89,
          left: 0,
          width: '100%',
          height: 671,
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1344&h=671&fit=crop"
          alt="CTA Background"
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            mixBlendMode: 'multiply',
          }}
        />
      </Box>

      {/* Content */}
      <Box
        className="flex flex-col gap-8 items-center relative z-10"
        sx={{ width: 756 }}
      >
        <Box className="flex flex-col gap-4 items-center text-center text-white">
          <Box
            className={`${nunito.variable} font-semibold text-6xl tracking-[-0.8px]`}
            sx={{ fontFamily: 'var(--font-nunito)' }}
          >
            Need medication now?
          </Box>
          <Box
            className={`${nunito.variable} font-medium text-xl tracking-[-0.4px]`}
            sx={{ fontFamily: 'var(--font-nunito)' }}
          >
            Order, consult, or search — all in one place.
          </Box>
        </Box>
        <Button
          sx={{
            backgroundColor: '#e91d74',
            borderRadius: '84px',
            height: 56,
            width: 166,
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
          Get Medication
        </Button>
      </Box>
    </Box>
  );
}

