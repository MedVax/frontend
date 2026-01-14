"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, IconButton, Card, CardContent } from "@mui/material";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import { Shell } from "../ui";

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
    <Shell as="section" className="flex flex-col items-center">
      <div className="w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between h-[76px] mb-11">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-4xl text-black">
              Best selling products
            </h2>
            <p className="font-normal text-base text-gray-600">
              Some of our best selling products
            </p>
          </div>
          <Button
            sx={{
              backgroundColor: "primary.lighter",
              borderRadius: "99px",
              height: 40,
              px: 4,
              py: 2,
              fontWeight: 500,
              fontSize: 16,
              color: "primary.main",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#fce7f3",
              },
            }}
          >
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
                  <Card>
                    <CardContent>
                      {/* Product Image */}
                      <div className="relative w-full rounded-2xl bg-gray-50 mb-3 overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-[203px] object-center"
                        />
                        {/* Wishlist Button */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            width: 56,
                            height: 56,
                            backgroundColor: "#fce7f3",
                            borderRadius: "99px",
                            "&:hover": {
                              backgroundColor: "#f9d0e5",
                            },
                          }}
                        >
                          <Icon
                            icon="solar:heart-bold"
                            width={32}
                            height={32}
                            className="text-[#e91d74]"
                          />
                        </IconButton>
                        {/* Add to Cart Button */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                            width: 56,
                            height: 56,
                            background:
                              "linear-gradient(90deg, #e91d74 0%, #e91d74 100%)",
                            borderRadius: "99px",
                            "&:hover": {
                              background:
                                "linear-gradient(90deg, #c2185b 0%, #c2185b 100%)",
                            },
                          }}
                        >
                          <Icon
                            icon="solar:cart-plus-bold"
                            width={32}
                            height={32}
                            className="text-white"
                          />
                        </IconButton>
                        {/* Out of Stock Badge */}
                        {product.isOutOfStock && (
                          <span className="absolute top-4 left-4 bg-red-100 rounded-full px-3 py-2 text-sm font-medium text-red-500">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col gap-4 text-left">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-medium text-lg text-black">
                            {product.name}
                          </h3>
                          <p className="font-normal text-sm text-gray-600 truncate">
                            {product.description}
                          </p>
                        </div>
                        <span className="font-bold text-xl text-black">
                          {product.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <IconButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: -24,
              top: "50%",
              transform: "translateY(-50%)",
              width: 56,
              height: 56,
              backgroundColor: "white",
              borderRadius: "99px",
              border: "1px solid #ededed",
              boxShadow: "0px 6px 17px 0px rgba(0,0,0,0.06)",
              opacity: canScrollPrev ? 1 : 0.5,
              "&:hover": {
                backgroundColor: canScrollPrev ? "#f9fafb" : "white",
              },
            }}
          >
            <Icon
              icon="solar:arrow-left-linear"
              width={24}
              height={24}
              className="text-gray-500"
            />
          </IconButton>
          <IconButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              right: -24,
              top: "50%",
              transform: "translateY(-50%)",
              width: 56,
              height: 56,
              backgroundColor: "white",
              borderRadius: "99px",
              border: "1px solid #ededed",
              boxShadow: "0px 6px 17px 0px rgba(0,0,0,0.06)",
              opacity: canScrollNext ? 1 : 0.5,
              "&:hover": {
                backgroundColor: canScrollNext ? "#f9fafb" : "white",
              },
            }}
          >
            <Icon
              icon="solar:arrow-right-linear"
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
