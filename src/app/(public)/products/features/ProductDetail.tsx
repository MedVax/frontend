"use client";
import React, { useState } from "react";
import { Shell } from "../../../../components/ui";
import Image from "next/image";
import clsx from "clsx";
import { Button, Chip, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import ProductDetailAccreditation from "./ProductDetailAccreditation";
import ProductDetailInfo from "./ProductDetailInfo";
import { ProductRelatedItem } from "./ProductRelatedItem";

interface ProductDetailProps {
  id: string;
}

const product = {
  id: "1",
  name: "Mason L-Arginine 500mg Capsules x 60",
  description:
    "Kindly scroll through, filter and get exactly what was prescribe to you be a medical practioner",
  price: 20000,
  quantity: 1,
  category: "Vitamins & Supplements",
  sku: "MASON-L-ARG-500-60",
  dosages: ["500mg", "1000mg", "250mg"],
  images: [
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
    "/assets/dummy-product.png",
  ],
  packageSizes: ["10 tablets", "20 tablets", "30 tablets"],
};

const ProductDetail = ({ id }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <Shell component="section" className="sm:my-20 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden sm:max-h-[400px] max-h-[200px] sm:max-w-[500px] max-w-[300px]">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              width={500}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="max-w-[500px] overflow-x-scroll scrollbar-hidden">
            <div className="flex flex-row  gap-2  w-full">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={clsx(
                    "bg-gray-100 rounded-lg overflow-hidden  w-[100px] sm:w-[100px] sm:h-[100px] h-[50px]  sm:min-w-[100px] sm:min-h-[100px] min-w-[50px] min-h-[50px]",
                    selectedImageIndex === index && "border-2 border-primary"
                  )}
                >
                  <Image
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h1" className="text-2xl font-bold">
            {product.name}
          </Typography>
          <Typography variant="body1" className="text-sm text-gray-500">
            {product.description}
          </Typography>

          <div className="flex flex-row flex-wrap gap-2 mt-3">
            <Chip
              label={product?.quantity >= 1 ? `In Stock` : `Out of Stock`}
              color={product?.quantity >= 1 ? `success` : `error`}
              variant="soft"
            />

            <Chip label={product.category} color="secondary" />

            <Chip label={`SKU: ${product.sku}`} color="secondary" />
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Typography>Dosages</Typography>

            <div className="flex flex-row flex-wrap gap-2">
              {product.dosages.map((dosage) => (
                <Chip key={dosage} label={dosage} color="secondary" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Typography>Package Sizes</Typography>

            <div className="flex flex-row flex-wrap gap-2">
              {product.packageSizes.map((packageSize) => (
                <Chip key={packageSize} label={packageSize} color="secondary" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Typography>Quantity</Typography>

            <div className="flex items-center gap-2">
              <IconButton color="secondary" variant="soft">
                <Icon icon="mdi:minus" />
              </IconButton>
              <Typography>{product.quantity}</Typography>
              <IconButton color="secondary" variant="soft">
                <Icon icon="mdi:plus" />
              </IconButton>
            </div>
          </div>

          <Typography variant="h2" className="text-2xl font-bold mt-8">
            {product.price}
          </Typography>

          <div className="flex sm:flex-row flex-col py-1 gap-2 mt-8 sticky bottom-0">
            <Button
              fullWidth
              startIcon={<Icon icon="mdi:cart" />}
              variant="contained"
              color="primary"
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="text-nowrap"
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20" />

      <ProductDetailAccreditation />

      <div className="md:mt-10 mt-5" />

      <ProductDetailInfo />

      <div className="md:mt-10 mt-5" />

      <ProductRelatedItem />
    </Shell>
  );
};

export default ProductDetail;
