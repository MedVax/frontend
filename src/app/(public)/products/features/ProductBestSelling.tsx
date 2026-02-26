"use client";

import { useCallback, useEffect, useState } from "react";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductItem } from "../../../../components/ui/ProductItem";
import clsx from "clsx";
import productApi from "@/apis/product-api";

export function ProductBestSelling() {
  const { data, isLoading, error } = productApi.useGetBestSellingProductsQuery({
    params: { limit: 10 },
  });

  const products = data?.data || [];

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

    const handleSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    handleSelect(); // Initial state
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex gap-6 overflow-x-auto scrollbar-hidden">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(25%-18px)]"
          >
            <Skeleton variant="rectangular" height={300} />
          </div>
        ))}
      </div>
    );
  }

  if (error || !products.length) {
    return (
      <div className="text-center py-8">
        <Typography variant="body2" color="text.secondary">
          No products available
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <div className="relative hidden sm:block">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(25%-18px)]"
              >
                <ProductItem
                  product={{
                    ...product,
                    price: new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: product.currency || "NGN",
                    }).format(product.price),
                    image: product.images?.[0] || "/assets/dummy-product.png",
                    isOutOfStock: product.stockQuantity <= 0,
                    favorite: false,
                    isLoading: false,
                    description: product.description || "",
                  }}
                />
              </div>
            ))}
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

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:hidden">
        {products.slice(0, 8).map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              isLoading: false,
              favorite: false,
              image:
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/assets/dummy-product.png",
              isOutOfStock: product.stockQuantity <= 0,
              description: product.description || "",
              price: new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: product.currency || "NGN",
              }).format(product.price),
            }}
          />
        ))}
      </div>
    </div>

  );
}
