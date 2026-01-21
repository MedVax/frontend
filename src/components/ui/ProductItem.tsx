"use client";

import { Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { Cart, CartPlus, Heart } from "@solar-icons/react";
import React from "react";
import Image from "next/image";

interface ProductItemProps {
  product: {
    image: string;
    name: string;
    description: string;
    price: string;
    isOutOfStock: boolean;
    favorite: boolean;
    isLoading: boolean;
  };
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      {product.isLoading ? (
        <ProductLoader />
      ) : (
        <Card variant="outlined" className="bg-white! p-0!">
          <CardContent className="bg-none! p-3!">
            {/* Product Image */}
            <div className="relative w-full rounded-2xl bg-gray-50 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="h-[200px] w-full object-contain"
                width={180}
                height={200}
                // priority
                // loading="lazy"
              />
              {/* Wishlist Button */}
              <IconButton
                variant="soft"
                color="primary"
                className="absolute! top-4 right-4"
              >
                <Heart
                  size={20}
                  weight={product.favorite ? "Bold" : "Outline"}
                  className="text-primary"
                />
              </IconButton>
              {/* Add to Cart Button */}
              <IconButton
                variant="soft"
                color="primary"
                className="absolute! bottom-4 right-4"
              >
                <CartPlus weight="Bold" size={20} className="text-primary" />
              </IconButton>

              {/* Out of Stock Badge */}
              {product.isOutOfStock && (
                <Chip
                  label="Out of Stock"
                  color="primary"
                  variant="soft"
                  className="absolute! top-4 left-4"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-2 text-left mt-4">
              <div>
                <Typography className="font-semibold!">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
              </div>
              <Typography variant="h6" className="font-bold!">
                {product.price}
              </Typography>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

const ProductLoader = () => {
  return (
    <Card variant="outlined" className="bg-white! p-0!">
      <CardContent className="bg-none! p-3!">
        <div className="relative w-full rounded-2xl bg-gray-50 overflow-hidden">
          <div className="h-[200px] w-full bg-gray-50 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 text-left mt-4">
          <div className="h-[20px] w-full bg-gray-50 animate-pulse" />
          <div className="h-[20px] w-full bg-gray-50 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};
