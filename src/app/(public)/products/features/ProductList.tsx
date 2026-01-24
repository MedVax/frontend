"use client";

import {
  Button,
  Drawer,
  Pagination,
  PaginationItem,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Shell } from "../../../../components/ui";
import { ProductItem } from "../../../../components/ui/ProductItem";
import { ProductBestSelling } from "./ProductBestSelling";
import { Icon } from "@iconify/react";
import useToggle from "@/hooks/use-toggle";
import ProductListFilters from "./ProductListFilters";

const ProductList = () => {
  const [open, toggle] = useToggle(false);
  const isMediumScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Shell component="section" className="my-20 ">
      <div className="flex justify-between items-center">
        <Typography variant="h5" className="font-semibold!">
          Emzor Paracetamol Tablets - 2 Products Found
        </Typography>
        {isMediumScreen && (
          <Button
            variant="outlined"
            size="small"
            endIcon={<Icon icon="formkit:filter" />}
            onClick={toggle}
          >
            Filters
          </Button>
        )}
      </div>

      <div className="flex gap-4 mt-10">
        {isMediumScreen ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={toggle}
          >
            <ProductListFilters
              className="bg-transparent! h-full rounded-none!"
              onClose={toggle}
            />
          </Drawer>
        ) : (
          <ProductListFilters className="lg:w-[317px] w-[200px]  min-h-[calc(100vh-100px)]" />
        )}

        <div className="lg:w-[calc(100%-317px)] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={{ ...product, isLoading: false, favorite: false }}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Pagination
              count={10}
              color="primary"
              variant="outlined"
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: () => (
                      <Button
                        variant="ghost"
                        startIcon={<Icon icon="formkit:left" />}
                      >
                        Previous
                      </Button>
                    ),
                    next: () => (
                      <Button
                        variant="ghost"
                        endIcon={<Icon icon="formkit:right" />}
                      >
                        Next
                      </Button>
                    ),
                  }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-30">
        <Typography variant="h4" className="font-semibold! text-center">
          Best selling products
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="text-center mb-10"
        >
          Some of our best selling products
        </Typography>

        <ProductBestSelling />
      </div>
    </Shell>
  );
};

export default ProductList;

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
  {
    id: 6,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
  {
    id: 7,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
  {
    id: 8,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
  {
    id: 9,
    name: "Skineal Cream",
    description:
      "SKINEAL Is A Triple Action Cream With Anti-fungal, Ant-bacterial And Anti-pruritic Effects For Treatment Of Various Skin Conditions.",
    price: "N12,000.00",
    image: "/assets/dummy-product.png",
    isOutOfStock: false,
  },
];
