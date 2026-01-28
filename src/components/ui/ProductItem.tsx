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
import { useSnackbar } from "notistack";
import { useAddCartItemMutation, useGetCartQuery } from "@/apis/cart-api";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useCheckFavoriteQuery,
} from "@/apis/favorite-api";
import { Product } from "@/types/product";
import useAuthUser from "@/hooks/use-auth";

interface ProductItemProps {
  product: Product & {
    image: string;
    price: string;
    isOutOfStock: boolean;
    favorite: boolean;
    isLoading: boolean;
  };
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const isAuthenticated = authUser?.isAuthenticated;

  const [addCartItem, { isLoading: isAddingToCart }] = useAddCartItemMutation();
  const { data: cartData } = useGetCartQuery();

  // Favorite functionality
  const { data: favoriteCheck } = useCheckFavoriteQuery(
    { path: { productId: product.id } },
    { skip: !isAuthenticated || !product.id }
  );
  const isFavorite = favoriteCheck?.data || false;
  const [addFavorite, { isLoading: isAddingFavorite }] =
    useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemovingFavorite }] =
    useRemoveFavoriteMutation();

  // Calculate how many of this product are already in the cart
  const cartQuantity =
    cartData?.data?.items?.find((item) => item.productId === product.id)
      ?.quantity || 0;

  // Check if all available stock is already in cart
  const isStockFullyInCart =
    product.stockQuantity > 0 && cartQuantity >= product.stockQuantity;
  const isOutOfStock = product.stockQuantity <= 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!product.id) {
      enqueueSnackbar("Product ID is missing", { variant: "error" });
      return;
    }

    if (isOutOfStock) {
      enqueueSnackbar("Product is out of stock", { variant: "warning" });
      return;
    }

    if (isStockFullyInCart) {
      enqueueSnackbar(
        `All available stock (${product.stockQuantity}) is already in your cart`,
        { variant: "warning" }
      );
      return;
    }

    try {
      await addCartItem({
        data: {
          productId: product.id,
          quantity: 1,
        },
      }).unwrap();
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to add product to cart";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      enqueueSnackbar("Please sign in to add favorites", { variant: "info" });
      return;
    }

    if (!product.id) {
      enqueueSnackbar("Product ID is missing", { variant: "error" });
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite({ path: { productId: product.id } }).unwrap();
        enqueueSnackbar("Removed from favorites", { variant: "success" });
      } else {
        await addFavorite({
          data: { productId: product.id },
        }).unwrap();
        enqueueSnackbar("Added to favorites", { variant: "success" });
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to update favorite";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <>
      {product.isLoading ? (
        <ProductLoader />
      ) : (
        <Card variant="outlined" className="bg-white! p-0!">
          <CardActionArea
            disableRipple
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
                onClick={handleToggleFavorite}
                disabled={isAddingFavorite || isRemovingFavorite}
              >
                <Heart
                  size={20}
                  weight={isFavorite ? "Bold" : "Outline"}
                  className="text-primary"
                />
              </IconButton>
              {/* Add to Cart Button */}
              <IconButton
                variant="contained"
                color="primary"
                className="absolute! bottom-4 right-4"
                onClick={handleAddToCart}
                disabled={isAddingToCart || isOutOfStock || isStockFullyInCart}
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
                <Typography className="font-semibold!" noWrap>
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
