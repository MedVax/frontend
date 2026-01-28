"use client";

import { useMemo } from "react";
import {
  Button,
  Drawer,
  Pagination,
  PaginationItem,
  Typography,
  useMediaQuery,
  Skeleton,
  Box,
} from "@mui/material";

import { Shell } from "../../../../components/ui";
import { ProductItem } from "../../../../components/ui/ProductItem";
import { ProductBestSelling } from "./ProductBestSelling";
import { Icon } from "@iconify/react";
import useToggle from "@/hooks/use-toggle";
import ProductListFilters from "./ProductListFilters";
import productApi from "@/apis/product-api";
import { useSearchParams, useRouter } from "next/navigation";

const ProductList = () => {
  const [open, toggle] = useToggle(false);
  const isMediumScreen = useMediaQuery("(max-width: 640px)");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get filter params from URL
  const categoryIds = searchParams.getAll("categoryId");
  const brandIds = searchParams.getAll("brandId");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const availability = searchParams.get("availability");

  const { data, isLoading, error } = productApi.useGetProductsQuery({
    params: {
      ...(categoryIds.length > 0 ? { categoryId: categoryIds.join(",") } : {}),
      ...(brandIds.length > 0 ? { brandId: brandIds.join(",") } : {}),
      ...(search ? { search } : {}),
      ...(availability ? { availability } : {}),
      skip: (page - 1) * limit,
      take: limit,
    },
  });

  const productList = data?.data?.data || [];

  const totalCount = useMemo(() => {
    if (!data?.data) return 0;
    if (Array.isArray(data.data)) return data.data.length;
    const paginatedData = data.data as {
      totalRecords?: number;
      skip?: number;
      take?: number;
    };
    return paginatedData.totalRecords || 0;
  }, [data]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Shell component="section" className="my-20 ">
      <div className="flex justify-between items-center">
        <Typography variant="h5" className="font-semibold!">
          {search
            ? `Search results for "${search}"`
            : categoryIds.length > 0
            ? "Products"
            : "All Products"}{" "}
          - {totalCount} {totalCount === 1 ? "Product" : "Products"} Found
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
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={300} />
              ))}
            </div>
          ) : error || !productList.length ? (
            <Box className="text-center py-12">
              <Typography variant="body1" color="text.secondary">
                {error ? "Failed to load products" : "No products found"}
              </Typography>
            </Box>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {productList.map((product) => (
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
                      }).format(product.price / 100),
                    }}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={page}
                    color="primary"
                    variant="outlined"
                    onChange={(_, newPage) => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("page", newPage.toString());
                      router.push(`/products?${params.toString()}`);
                    }}
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
              )}
            </>
          )}
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
