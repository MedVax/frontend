"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { CartPlus, Heart } from "@solar-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: {
    id?: string;
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
  const router = useRouter();
  return (
    <>
      {product.isLoading ? (
        <ProductLoader />
      ) : (
        <Card variant="outlined" className="bg-white! p-0!">
          <CardActionArea
            onClick={() => router.push(`/products/${product.id}`)}
            className="bg-none! p-3!"
          >
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
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("wishlist");
                }}
              >
                <Heart
                  size={20}
                  weight={product.favorite ? "Bold" : "Outline"}
                  className="text-primary"
                />
              </IconButton>
              {/* Add to Cart Button */}
              <IconButton
                variant="contained"
                color="primary"
                className="absolute! bottom-4 right-4"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("wishlist");
                }}
                size="large"
              >
                <CartPlus weight="Bold" size={20} className="text-white" />
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
          </CardActionArea>
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
