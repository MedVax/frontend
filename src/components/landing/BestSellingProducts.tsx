"use client";

import { useState } from "react";
import { Button, IconButton, Card, CardContent } from "@mui/material";
import { Icon } from "@iconify/react";

const products = [
  {
    id: 1,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop",
    isOutOfStock: false,
  },
  {
    id: 2,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop",
    isOutOfStock: true,
  },
  {
    id: 3,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop",
    isOutOfStock: false,
  },
  {
    id: 4,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=317&h=259&fit=crop",
    isOutOfStock: false,
  },
];

export function BestSellingProducts() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("products-carousel");
    if (container) {
      const scrollAmount = 341;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="flex flex-col items-center mb-16">
      <div className="w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between h-[76px] mb-11">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-4xl text-black font-[family-name:var(--font-nunito)]">
              Best selling products
            </h2>
            <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-nunito)]">
              Some of our best selling products
            </p>
          </div>
          <Button
            sx={{
              backgroundColor: "#fef1f8",
              borderRadius: "99px",
              height: 40,
              px: 2,
              textTransform: "none",
              fontFamily: "var(--font-nunito)",
              fontWeight: 500,
              fontSize: 16,
              color: "#e91d74",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#fce7f3",
              },
            }}
          >
            View all
          </Button>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            id="products-carousel"
            className="flex gap-6 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  minWidth: 317,
                  borderRadius: "24px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Product Image */}
                  <div className="relative w-full h-[259px] rounded-2xl bg-gray-50 mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
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
                      <h3 className="font-medium text-lg text-black font-[family-name:var(--font-nunito)]">
                        {product.name}
                      </h3>
                      <p className="font-normal text-sm text-gray-600 truncate font-[family-name:var(--font-nunito)]">
                        {product.description}
                      </p>
                    </div>
                    <span className="font-bold text-xl text-black font-[family-name:var(--font-nunito)]">
                      {product.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
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
              "&:hover": {
                backgroundColor: "#f9fafb",
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
            onClick={() => handleScroll("right")}
            sx={{
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
              "&:hover": {
                backgroundColor: "#f9fafb",
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
    </section>
  );
}
