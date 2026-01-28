"use client";

import { Shell } from "@/components/ui";
import React, { useState } from "react";
import {
  Typography,
  Skeleton,
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  Grid,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/apis/favorite-api";
import { useSnackbar } from "notistack";
import { ProductItem } from "@/components/ui/ProductItem";

const FavoritesPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const limit = 20;
  const skip = (page - 1) * limit;

  const { data, isLoading, error } = useGetFavoritesQuery({
    params: { skip, take: limit, orderBy: "createdAt" },
  });

  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation();

  const favorites = data?.data?.data || [];
  const total = data?.data?.meta?.total || 0;
  const totalPages = data?.data?.meta?.totalPages || 0;

  const handleRemoveFavorite = async (productId: string) => {
    try {
      await removeFavorite({ path: { productId } }).unwrap();
      enqueueSnackbar("Removed from favorites", { variant: "success" });
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to remove favorite";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  if (isLoading) {
    return (
      <Shell component="section" className="my-20">
        <div className="mb-8">
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} className="mt-2" />
        </div>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell component="section" className="my-20">
        <Alert severity="error" className="mb-4">
          Failed to load favorites. Please try again later.
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

  return (
    <Shell component="section" className="my-20">
      <div className="mb-8">
        <Typography variant="h4" className="font-bold!">
          My Favorites
        </Typography>
        <Typography variant="body2" className="text-gray-500! mt-2">
          {total} {total === 1 ? "item" : "items"} saved
        </Typography>
      </div>

      {favorites.length === 0 ? (
        <Box className="text-center py-12 mt-10">
          <Icon
            icon="solar:heart-broken-bold-duotone"
            width={80}
            height={80}
            className="text-gray-400 mx-auto mb-4"
          />
          <Typography variant="h6" className="mb-4">
            No favorites yet
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-6">
            Start adding products to your favorites to see them here
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href="/products"
            startIcon={<Icon icon="mdi:shopping" />}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {favorites.map((favorite) => {
              const product = favorite.product;
              const productImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/assets/dummy-product.png";

              const formattedPrice = new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: product.currency || "NGN",
              }).format(product.price / 100);

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
                  <Card variant="outlined" className="p-0 bg-white relative">
                    <IconButton
                      className="absolute! top-2 right-2 z-10"
                      color="error"
                      onClick={() => handleRemoveFavorite(product.id)}
                      disabled={isRemoving}
                      size="small"
                    >
                      <Icon icon="solar:trash-bin-trash-bold-duotone" />
                    </IconButton>
                    <ProductItem
                      product={{
                        ...product,
                        isLoading: false,
                        favorite: true,
                        image: productImage,
                        isOutOfStock: product.stockQuantity <= 0,
                        description: product.description || "",
                        price: formattedPrice,
                      }}
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                startIcon={<Icon icon="mdi:chevron-left" />}
              >
                Previous
              </Button>
              <Typography variant="body2" className="flex items-center px-4">
                Page {page} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                endIcon={<Icon icon="mdi:chevron-right" />}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Shell>
  );
};

export default FavoritesPage;
