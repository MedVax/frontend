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
                          className="size-[203px] object-contain py-[27px]"
                        />
                        {/* Wishlist Button */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            width: 56,
                            height: 56,
                            p: 4,
                            backgroundColor: "#fce7f3",
                            borderRadius: "99px",
                            "&:hover": {
                              backgroundColor: "#f9d0e5",
                            },
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="23"
                            viewBox="0 0 27 23"
                            fill="none"
                          >
                            <path
                              d="M0 7.80291C0 14.2868 5.35924 17.742 9.28231 20.8346C10.6667 21.9259 12 22.9535 13.3333 22.9535C14.6667 22.9535 16 21.9259 17.3844 20.8346C21.3074 17.742 26.6667 14.2868 26.6667 7.80291C26.6667 1.319 19.3331 -3.27926 13.3333 2.95429C7.33355 -3.27926 0 1.319 0 7.80291Z"
                              fill="#E91D74"
                            />
                          </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="25"
                            viewBox="0 0 26 25"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1.33195 0.0568797C0.810929 -0.126301 0.24006 0.147574 0.0568797 0.668595C-0.126301 1.18962 0.147574 1.76049 0.668595 1.94367L1.01687 2.06611C1.90702 2.37907 2.49202 2.58647 2.92248 2.79768C3.32678 2.99606 3.50501 3.15663 3.62242 3.32845C3.74277 3.50456 3.83571 3.74646 3.88815 4.23093C3.94302 4.73787 3.94438 5.39816 3.94438 6.38475L3.94438 9.85366C3.94438 13.7757 4.02869 15.0701 5.1839 16.2886C6.3391 17.507 8.19837 17.507 11.9169 17.507H18.9874C21.0688 17.507 22.1095 17.507 22.8451 16.9075C23.5807 16.3081 23.7908 15.2888 24.211 13.2503L24.8773 10.0173C25.3401 7.69858 25.5715 6.53921 24.9796 5.76977C24.3877 5.00033 22.3653 5.00033 20.1187 5.00033H5.93444C5.92552 4.63989 5.9086 4.31196 5.87653 4.0157C5.80489 3.35386 5.64967 2.75024 5.27369 2.20005C4.89479 1.64556 4.39099 1.29045 3.80348 1.00218C3.25403 0.732576 2.55585 0.487142 1.73382 0.198166L1.33195 0.0568797ZM14.6113 8.00033C15.1636 8.00033 15.6113 8.44804 15.6113 9.00033V10.667H17.278C17.8303 10.667 18.278 11.1147 18.278 11.667C18.278 12.2193 17.8303 12.667 17.278 12.667H15.6113V14.3337C15.6113 14.8859 15.1636 15.3337 14.6113 15.3337C14.059 15.3337 13.6113 14.8859 13.6113 14.3337V12.667H11.9447C11.3924 12.667 10.9447 12.2193 10.9447 11.667C10.9447 11.1147 11.3924 10.667 11.9447 10.667H13.6113V9.00033C13.6113 8.44804 14.059 8.00033 14.6113 8.00033Z"
                              fill="white"
                            />
                            <path
                              d="M7.278 21.0003C8.38256 21.0003 9.278 21.8958 9.278 23.0003C9.278 24.1049 8.38256 25.0003 7.278 25.0003C6.17343 25.0003 5.278 24.1049 5.278 23.0003C5.278 21.8958 6.17343 21.0003 7.278 21.0003Z"
                              fill="white"
                            />
                            <path
                              d="M19.278 21.0004C20.3826 21.0004 21.278 21.8959 21.278 23.0004C21.278 24.105 20.3826 25.0004 19.278 25.0004C18.1734 25.0004 17.278 24.105 17.278 23.0004C17.278 21.8959 18.1734 21.0004 19.278 21.0004Z"
                              fill="white"
                            />
                          </svg>
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
            // disabled={!canScrollPrev}
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
