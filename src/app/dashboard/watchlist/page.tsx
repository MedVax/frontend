"use client";

import React from "react";
import {
  Paper,
  Typography,
  Skeleton,
  Grid,
  IconButton,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/apis/favorite-api";
import { useSnackbar } from "notistack";
import { ProductItem } from "@/components/ui/ProductItem";
import Image from "next/image";

const Watchlist = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetFavoritesQuery({
    params: { skip: 0, take: 50, orderBy: "createdAt" },
  });

  const [removeFavorite] = useRemoveFavoriteMutation();

  const favorites = data?.data?.data || [];
  const total = data?.data?.meta?.total || 0;

  const handleRemoveFavorite = async (productId: string) => {
    try {
      await removeFavorite({ path: { productId } }).unwrap();
      enqueueSnackbar("Removed from watchlist", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to remove item", {
        variant: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={60} />
        <Grid container spacing={3}>
          {[...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <Typography variant="h5" className="font-semibold">
          My Watchlist
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          {total} {total === 1 ? "item" : "items"} saved
        </Typography>
      </div>

      {favorites.length === 0 ? (
        <Paper variant="outlined" className="p-8 text-center bg-white!">
          <Iconify icon="solar:heart-angle-outline" fontSize={64} className="text-gray-400 mb-4 mx-auto" />
          <Typography variant="h6" className="mb-2">
            Your watchlist is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start adding products to your watchlist to save them for later
          </Typography>
        </Paper>
      ) : (
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
                <Paper variant="outlined" className="p-4 relative group bg-white!">
                  <IconButton
                    className="absolute top-2 right-2 z-10 bg-white shadow-md"
                    onClick={() => handleRemoveFavorite(product.id)}
                    size="small"
                  >
                    <Iconify icon="solar:heart-bold" className="text-red-500" fontSize={20} />
                  </IconButton>
                  <div className="mb-3">
                    <Image
                      src={productImage}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <Typography variant="h6" className="font-semibold line-clamp-2 mb-1">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="mb-2">
                    {product.sku}
                  </Typography>
                  <Typography variant="h6" className="font-semibold text-primary">
                    {formattedPrice}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Watchlist;

