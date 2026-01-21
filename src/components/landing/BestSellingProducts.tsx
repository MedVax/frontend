"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import { Shell } from "../ui";
import { ProductItem } from "../ui/ProductItem";
import clsx from "clsx";
const products = [
  {
    id: 1,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
  {
    id: 2,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
  {
    id: 3,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: true,
  },
  {
    id: 4,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
  {
    id: 5,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
];

export function BestSellingProducts() {
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

  const onSelect = useCallback((api: any) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Shell component="section" className="flex flex-col items-center mt-25">
      <div className="w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between h-[76px] mb-11">
          <div className="flex flex-col gap-2">
            <Typography variant="h4" className="font-semibold!">
              Best selling products
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Some of our best selling products
            </Typography>
          </div>
          <Button variant="soft" color="primary">
            View all
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(25%-18px)]"
                >
                  <ProductItem
                    product={{ ...product, isLoading: false, favorite: false }}
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
      </div>
    </Shell>
  );
}
