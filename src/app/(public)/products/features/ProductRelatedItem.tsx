"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, IconButton, Typography, Skeleton } from "@mui/material";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductItem } from "../../../../components/ui/ProductItem";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  useGetRelatedProductsQuery,
  useGetBestSellingProductsQuery,
} from "@/apis/product-api";
import { Product } from "@/types/product";

interface ProductRelatedItemProps {
  productId?: string;
  limit?: number;
}

export function ProductRelatedItem({
  productId,
  limit = 10,
}: ProductRelatedItemProps) {
  const router = useRouter();

  // Fetch related products if productId is provided, otherwise fetch best selling
  const { data: relatedData, isLoading: isLoadingRelated } =
    useGetRelatedProductsQuery(
      { path: { id: productId! }, params: { limit } },
      { skip: !productId }
    );

  const { data: bestSellingData, isLoading: isLoadingBestSelling } =
    useGetBestSellingProductsQuery(
      { params: { limit } },
      { skip: !!productId }
    );

  const isLoading = productId ? isLoadingRelated : isLoadingBestSelling;
  const products: Product[] = productId
    ? relatedData?.data || []
    : bestSellingData?.data || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 4,
    breakpoints: {
      "(max-width: 768px)": { slidesToScroll: 1 },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    // Set initial state
    const updateState = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateState();
    emblaApi.on("select", updateState);
    emblaApi.on("reInit", updateState);

    return () => {
      emblaApi.off("select", updateState);
      emblaApi.off("reInit", updateState);
    };
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center gap-2">
          <Typography variant="h5" className="font-semibold!">
            {productId
              ? "Products related to this item"
              : "Best Selling Products"}
          </Typography>
          <Button
            onClick={() => router.push("/products")}
            variant="soft"
            color="secondary"
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={300} />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        <Typography variant="h5" className="font-semibold!">
          {productId
            ? "Products related to this item"
            : "Best Selling Products"}
        </Typography>

        <div>
          <Button
            onClick={() => router.push("/products")}
            variant="soft"
            color="secondary"
          >
            View all
          </Button>
        </div>
      </div>

      <div className="relative mt-5">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product) => {
              const productImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/assets/dummy-product.png";

              const formattedPrice = new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: product.currency || "NGN",
              }).format(product.price);

              return (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(25%-18px)]"
                >
                  <ProductItem
                    product={{
                      ...product,
                      isLoading: false,
                      favorite: false,
                      image: productImage,
                      isOutOfStock: product.stockQuantity <= 0,
                      description: product.description || "",
                      price: formattedPrice,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <IconButton
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          variant="soft"
          color="inherit"
          className={clsx(
            "absolute! sm:-left-5 left-0 top-1/2 -translate-y-1/2",
            !canScrollPrev && "hidden!"
          )}
        >
          <Icon
            icon="ic:baseline-navigate-before"
            width={24}
            height={24}
            className="text-gray-500"
          />
        </IconButton>
        <IconButton
          onClick={scrollNext}
          disabled={!canScrollNext}
          variant="soft"
          color="inherit"
          className={clsx(
            "absolute! sm:-right-5 right-0 top-1/2 -translate-y-1/2",
            !canScrollNext && "hidden!"
          )}
        >
          <Icon
            icon="ic:baseline-navigate-next"
            width={24}
            height={24}
            className="text-gray-500"
          />
        </IconButton>
      </div>
    </div>
  );
}
