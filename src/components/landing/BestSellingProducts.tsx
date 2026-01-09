'use client';

import { useState } from 'react';
import { Box, Button, IconButton, Card, CardContent } from '@mui/material';
import { Icon } from '@iconify/react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
});

const products = [
  {
    id: 1,
    name: 'Skineal Cream',
    description:
      'SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.',
    price: 'N12,000.00',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop',
    isOutOfStock: false,
  },
  {
    id: 2,
    name: 'Skineal Cream',
    description:
      'SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.',
    price: 'N12,000.00',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop',
    isOutOfStock: true,
  },
  {
    id: 3,
    name: 'Skineal Cream',
    description:
      'SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.',
    price: 'N12,000.00',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop',
    isOutOfStock: false,
  },
  {
    id: 4,
    name: 'Skineal Cream',
    description:
      'SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.',
    price: 'N12,000.00',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop',
    isOutOfStock: false,
  },
];

export function BestSellingProducts() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('products-carousel');
    if (container) {
      const scrollAmount = 341; // width of card + gap
      const newPosition =
        direction === 'left'
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <Box className="flex flex-col items-center mb-16">
      <Box className="h-[530.892px] w-full relative">
        {/* Header */}
        <Box className="flex items-center justify-between h-[76px] mb-11">
          <Box className="flex flex-col gap-3">
            <Box
              className={`${nunito.variable} font-semibold text-4xl text-black`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Best selling products
            </Box>
            <Box
              className={`${nunito.variable} font-normal text-base text-[#4b5563]`}
              sx={{ fontFamily: 'var(--font-nunito)' }}
            >
              Some of our best selling products
            </Box>
          </Box>
          <Button
            sx={{
              backgroundColor: '#fef1f8',
              borderRadius: '99px',
              height: 40,
              px: 2,
              textTransform: 'none',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 500,
              fontSize: 16,
              color: '#e91d74',
              '&:hover': {
                backgroundColor: '#fce7f3',
              },
            }}
          >
            View all
          </Button>
        </Box>

        {/* Products Carousel */}
        <Box className="relative">
          <Box
            id="products-carousel"
            className="flex gap-6 overflow-x-auto scroll-smooth"
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  minWidth: 317,
                  borderRadius: '24px',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none',
                }}
              >
                <CardContent className="p-4">
                  {/* Product Image */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 259,
                      borderRadius: '16px',
                      backgroundColor: '#f9fafb',
                      mb: 3.25,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* Wishlist Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 56,
                        height: 56,
                        backgroundColor: '#fce7f3',
                        borderRadius: '99px',
                        '&:hover': {
                          backgroundColor: '#f9d0e5',
                        },
                      }}
                    >
                      <Icon
                        icon="material-symbols:favorite"
                        width={32}
                        height={32}
                        style={{ color: '#e91d74' }}
                      />
                    </IconButton>
                    {/* Add to Cart Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        width: 56,
                        height: 56,
                        background: 'linear-gradient(90deg, #e91d74 0%, #e91d74 100%)',
                        borderRadius: '99px',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #c2185b 0%, #c2185b 100%)',
                        },
                      }}
                    >
                      <Icon
                        icon="material-symbols:add-shopping-cart"
                        width={32}
                        height={32}
                        style={{ color: 'white' }}
                      />
                    </IconButton>
                    {/* Out of Stock Badge */}
                    {product.isOutOfStock && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          backgroundColor: '#fee2e2',
                          borderRadius: '99px',
                          px: 1.5,
                          py: 1,
                        }}
                      >
                        <Box
                          className={`${nunito.variable} font-medium text-sm text-[#ef4444]`}
                          sx={{ fontFamily: 'var(--font-nunito)' }}
                        >
                          Out of Stock
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Product Info */}
                  <Box className="flex flex-col gap-4 text-left">
                    <Box className="flex flex-col gap-1">
                      <Box
                        className={`${nunito.variable} font-medium text-lg text-black`}
                        sx={{ fontFamily: 'var(--font-nunito)' }}
                      >
                        {product.name}
                      </Box>
                      <Box
                        className={`${nunito.variable} font-normal text-sm text-[#4b5563] line-clamp-2`}
                        sx={{
                          fontFamily: 'var(--font-nunito)',
                          height: '24.892px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {product.description}
                      </Box>
                    </Box>
                    <Box
                      className={`${nunito.variable} font-bold text-xl text-black`}
                      sx={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {product.price}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={() => handleScroll('left')}
            sx={{
              position: 'absolute',
              left: -24,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 56,
              height: 56,
              backgroundColor: 'white',
              borderRadius: '99px',
              border: '1px solid #ededed',
              boxShadow: '0px 6px 17px 0px rgba(0,0,0,0.06)',
              '&:hover': {
                backgroundColor: '#f9fafb',
              },
            }}
          >
            <Icon
              icon="material-symbols:arrow-back"
              width={24}
              height={24}
              style={{ color: '#6b7280' }}
            />
          </IconButton>
          <IconButton
            onClick={() => handleScroll('right')}
            sx={{
              position: 'absolute',
              right: -24,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 56,
              height: 56,
              backgroundColor: 'white',
              borderRadius: '99px',
              border: '1px solid #ededed',
              boxShadow: '0px 6px 17px 0px rgba(0,0,0,0.06)',
              '&:hover': {
                backgroundColor: '#f9fafb',
              },
            }}
          >
            <Icon
              icon="material-symbols:arrow-forward"
              width={24}
              height={24}
              style={{ color: '#6b7280' }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

