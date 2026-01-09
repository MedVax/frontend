'use client';

import { Box, Card, CardContent, Avatar } from '@mui/material';
import { Icon } from '@iconify/react';
import { Nunito, DM_Sans } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-nunito',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
});

const testimonials = [
  {
    name: 'Epho Eugene',
    review:
      'This is personal review. I had some challenges and issues and I was worried and talking to the team here and there and to my....',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Totos Dinero',
    review:
      'Digitalpurse is the best card platform so far with it\'s anonymity made more comfortable to use to avoid restriction which made....',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Ken boogey',
    review:
      'Very good option to use if you don\'t want your card details out there, easy to use also but still have some kinks they can work out',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Mark Gyasi',
    review:
      'Takes few minutes to get your card done Their customer services is on point. They will resolve your issue perfectly...',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Dolly Naa',
    review:
      'Very excellent customer service, after payment my card wasn\'t added, I contacted customer service and they provided....',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Augustine Ezekiel',
    review:
      'Fast verification and good customer support that helps resolve issues effortlessly. I love what they are doing.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

export function TestimonialsSection() {
  return (
    <Box className="flex flex-col gap-2.5 mb-16">
      <Box
        className="flex gap-[13px] overflow-x-auto"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 376,
              borderRadius: '24px',
              border: '1px solid #e4e4e4',
              boxShadow: '0px 4px 25px 0px rgba(0,0,0,0.07)',
            }}
          >
            <CardContent className="p-4">
              <Box className="flex flex-col gap-3">
                {/* User Info */}
                <Box className="flex items-center gap-1.5">
                  <Avatar
                    sx={{
                      width: 22,
                      height: 22,
                      backgroundColor: '#e5e7eb',
                      fontSize: 11,
                    }}
                  >
                    <Icon
                      icon="material-symbols:group"
                      width={11}
                      height={11}
                      style={{ color: '#4b5563' }}
                    />
                  </Avatar>
                  <Box
                    className={`${dmSans.variable} font-medium text-sm text-black`}
                    sx={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {testimonial.name}
                  </Box>
                </Box>

                {/* Review Text */}
                <Box
                  className={`${dmSans.variable} font-normal text-base text-[#4b5563]`}
                  sx={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {testimonial.review}
                </Box>

                {/* Rating Stars */}
                <Box className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="material-symbols:star"
                      width={16}
                      height={16}
                      style={{ color: '#fbbf24' }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

