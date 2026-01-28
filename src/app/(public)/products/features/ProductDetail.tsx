"use client";
import React, { useState, useMemo } from "react";
import { Shell } from "../../../../components/ui";
import Image from "next/image";
import clsx from "clsx";
import {
  Button,
  Chip,
  IconButton,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import ProductDetailAccreditation from "./ProductDetailAccreditation";
import ProductDetailInfo from "./ProductDetailInfo";
import { ProductRelatedItem } from "./ProductRelatedItem";
import productApi from "@/apis/product-api";
import { useAddCartItemMutation, useGetCartQuery } from "@/apis/cart-api";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useCheckFavoriteQuery,
} from "@/apis/favorite-api";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";

interface ProductDetailProps {
  id: string;
}

const ProductDetail = ({ id }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const isAuthenticated = authUser?.isAuthenticated;

  const [addCartItem, { isLoading: isAddingToCart }] = useAddCartItemMutation();
  const { data: cartData } = useGetCartQuery();

  // Favorite functionality
  const { data: favoriteCheck } = useCheckFavoriteQuery(
    { path: { productId: id } },
    { skip: !isAuthenticated || !id }
  );
  const isFavorite = favoriteCheck?.data || false;
  const [addFavorite, { isLoading: isAddingFavorite }] =
    useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemovingFavorite }] =
    useRemoveFavoriteMutation();

  const { data, isLoading, error } = productApi.useGetProductByIdQuery({
    path: { id },
  });

  const product = useMemo(() => {
    if (!data?.data) return null;
    return data.data;
  }, [data]);

  // Calculate how many of this product are already in the cart
  const cartQuantity = useMemo(() => {
    if (!product || !cartData?.data?.items) return 0;
    return (
      cartData.data.items.find((item) => item.productId === product.id)
        ?.quantity || 0
    );
  }, [product, cartData]);

  // Calculate available stock (total stock minus what's already in cart)
  const availableStock = useMemo(() => {
    if (!product) return 0;
    return Math.max(0, product.stockQuantity - cartQuantity);
  }, [product, cartQuantity]);

  const formattedPrice = useMemo(() => {
    if (!product) return null;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: product.currency || "NGN",
    }).format(product.price / 100);
  }, [product]);

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    // Use available stock (stockQuantity - cartQuantity) as the max
    const maxQuantity = availableStock || 1;
    setQuantity(Math.max(1, Math.min(newQuantity, maxQuantity)));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.stockQuantity <= 0) {
      enqueueSnackbar("Product is out of stock", { variant: "warning" });
      return;
    }

    if (availableStock <= 0) {
      enqueueSnackbar(
        `All available stock (${product.stockQuantity}) is already in your cart`,
        { variant: "warning" }
      );
      return;
    }

    if (quantity > availableStock) {
      enqueueSnackbar(
        `Only ${availableStock} ${
          availableStock === 1 ? "item" : "items"
        } available (${cartQuantity} already in cart)`,
        { variant: "warning" }
      );
      return;
    }

    try {
      await addCartItem({
        data: {
          productId: product.id,
          quantity,
        },
      }).unwrap();
      enqueueSnackbar(
        `${quantity} ${quantity === 1 ? "item" : "items"} added to cart`,
        { variant: "success" }
      );
      setQuantity(1); // Reset quantity after adding
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to add product to cart";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Please sign in to add favorites", { variant: "info" });
      return;
    }

    if (!product) return;

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

  if (isLoading) {
    return (
      <Shell component="section" className="sm:my-20 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton variant="rectangular" height={400} />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="100%" height={60} />
            <Skeleton variant="rectangular" width="60%" height={200} />
          </div>
        </div>
      </Shell>
    );
  }

  if (error || !product) {
    return (
      <Shell component="section" className="sm:my-20 my-10">
        <Alert severity="error" className="mb-4">
          {error
            ? "Failed to load product. Please try again later."
            : "Product not found."}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          startIcon={<Icon icon="solar:refresh-bold-duotone" />}
        >
          Retry
        </Button>
      </Shell>
    );
  }
  const displayImages =
    product.images && product.images.length > 0
      ? product.images
      : ["/assets/dummy-product.png"];

  return (
    <Shell component="section" className="sm:my-20 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden sm:max-h-[400px] max-h-[200px] sm:max-w-[500px] max-w-[300px]">
            <Image
              src={displayImages[selectedImageIndex]}
              alt={product.name}
              width={500}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
          {displayImages.length > 1 && (
            <div className="max-w-[500px] overflow-x-scroll scrollbar-hidden">
              <div className="flex flex-row gap-2 w-full">
                {displayImages.map((image, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "bg-gray-100 rounded-lg overflow-hidden w-[100px] sm:w-[100px] sm:h-[100px] h-[50px] sm:min-w-[100px] sm:min-h-[100px] min-w-[50px] min-h-[50px] cursor-pointer",
                      selectedImageIndex === index && "border-2 border-primary"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <Typography variant="h1" className="text-2xl font-bold">
            {product.name}
          </Typography>
          {product.description && (
            <Typography variant="body1" className="text-sm text-gray-500 mt-2">
              {product.description}
            </Typography>
          )}

          <div className="flex flex-row flex-wrap gap-2 mt-3">
            <Chip
              label={product.stockQuantity > 0 ? `In Stock` : `Out of Stock`}
              color={product.stockQuantity > 0 ? `success` : `error`}
              variant="soft"
            />

            {product.category && (
              <Chip
                label={product.category.name}
                color="secondary"
                variant="soft"
              />
            )}

            {product.brand && (
              <Chip
                label={product.brand.name}
                color="secondary"
                variant="soft"
              />
            )}

            <Chip
              label={`SKU: ${product.sku}`}
              color="secondary"
              variant="soft"
            />
          </div>

          {product.dosages && product.dosages.length > 0 && (
            <div className="flex flex-col gap-2 mt-8">
              <Typography variant="subtitle2" className="font-semibold">
                Dosages
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
                {product.dosages.map((dosage) => (
                  <Chip
                    key={dosage}
                    label={dosage}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
          )}

          {product.packageSizes && product.packageSizes.length > 0 && (
            <div className="flex flex-col gap-2 mt-8">
              <Typography variant="subtitle2" className="font-semibold">
                Package Sizes
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
                {product.packageSizes.map((packageSize) => (
                  <Chip
                    key={packageSize}
                    label={packageSize}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-8">
            <Typography variant="subtitle2" className="font-semibold">
              Quantity
            </Typography>
            <div className="flex items-center gap-2">
              <IconButton
                color="secondary"
                variant="soft"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Icon icon="mdi:minus" />
              </IconButton>
              <Typography variant="h6" className="min-w-[2rem] text-center">
                {quantity}
              </Typography>
              <IconButton
                color="secondary"
                variant="soft"
                onClick={() => handleQuantityChange(1)}
                disabled={availableStock <= 0 || quantity >= availableStock}
              >
                <Icon icon="mdi:plus" />
              </IconButton>
            </div>
            {product.stockQuantity > 0 && (
              <Typography variant="caption" color="text.secondary">
                {availableStock > 0 ? (
                  <>
                    {availableStock} available in stock
                    {cartQuantity > 0 && ` (${cartQuantity} already in cart)`}
                  </>
                ) : (
                  <>
                    All {product.stockQuantity} items are already in your cart
                  </>
                )}
              </Typography>
            )}
          </div>

          <Typography variant="h2" className="text-2xl font-bold mt-8">
            {formattedPrice || "N/A"}
          </Typography>

          <div className="flex sm:flex-row flex-col py-1 gap-2 mt-8 sticky bottom-0">
            <Button
              fullWidth
              startIcon={<Icon icon="mdi:cart" />}
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={
                isAddingToCart ||
                product.stockQuantity <= 0 ||
                availableStock <= 0 ||
                quantity > availableStock
              }
            >
              {isAddingToCart
                ? "Adding..."
                : availableStock <= 0
                ? "All Stock in Cart"
                : "Add to Cart"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="text-nowrap"
              onClick={handleToggleFavorite}
              disabled={isAddingFavorite || isRemovingFavorite}
              startIcon={
                <Icon
                  icon={isFavorite ? "solar:heart-bold" : "solar:heart-outline"}
                />
              }
            >
              {isAddingFavorite || isRemovingFavorite
                ? "Loading..."
                : isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20" />

      <ProductDetailAccreditation />

      <div className="md:mt-10 mt-5" />

      <ProductDetailInfo
        product={{
          description: product.description,
          howToUse: product.howToUse,
          ingredients: product.ingredients,
          pharmacyAdvise: product.pharmacyAdvise,
          specification: product.specification,
        }}
      />

      <div className="md:mt-10 mt-5" />

      <ProductRelatedItem productId={product.id} limit={8} />
    </Shell>
  );
};

export default ProductDetail;
