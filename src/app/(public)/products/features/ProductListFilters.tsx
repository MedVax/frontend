"use client";

import { Magnifer } from "@solar-icons/react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";

import categoryApi from "@/apis/category-api";
import brandApi from "@/apis/brand-api";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ProductListFiltersProps = {
  className?: string;
  onClose?: () => void;
};
const ProductListFilters = ({
  className,
  onClose,
  ...props
}: ProductListFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryIds = searchParams.getAll("categoryId");
  const brandIds = searchParams.getAll("brandId");
  const availabilityParams = searchParams.get("availability");

  const getAllCategories = categoryApi.useGetCategoriesQuery({
    params: {
      includeSubcategories: false,
      hierarchy: false,
    },
  });

  const getAllBrands = brandApi.useGetBrandsQuery({
    params: {
      includeInactive: false,
    },
  });

  const [searchBrands, setSearchBrands] = useState("");

  const filteredBrands = getAllBrands.data?.data?.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrands.toLowerCase())
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    const isChecked = event.target.checked;
    const params = new URLSearchParams(searchParams.toString());

    // Get current category IDs
    const currentCategoryIds = searchParams.getAll("categoryId");

    if (isChecked) {
      // Add category ID if not already present
      if (!currentCategoryIds.includes(categoryId)) {
        params.append("categoryId", categoryId);
      }
    } else {
      // Remove category ID
      params.delete("categoryId");
      currentCategoryIds
        .filter((id) => id !== categoryId)
        .forEach((id) => params.append("categoryId", id));
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brandId = event.target.value;
    const isChecked = event.target.checked;
    const params = new URLSearchParams(searchParams.toString());

    // Get current brand IDs
    const currentBrandIds = searchParams.getAll("brandId");

    if (isChecked) {
      // Add brand ID if not already present
      if (!currentBrandIds.includes(brandId)) {
        params.append("brandId", brandId);
      }
    } else {
      // Remove brand ID
      params.delete("brandId");
      currentBrandIds
        .filter((id) => id !== brandId)
        .forEach((id) => params.append("brandId", id));
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const availability = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("availability", availability);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Paper
      variant="outlined"
      className={clsx("bg-white", className)}
      {...props}
    >
      <div className="p-4 space-y-5">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="font-bold!">
            Filters
          </Typography>

          {onClose && (
            <IconButton onClick={onClose} size="small">
              <Icon icon="formkit:close" />
            </IconButton>
          )}
        </div>

        <div>
          <Typography variant="h6" className="font-semibold!">
            Availability
          </Typography>

          <RadioGroup defaultValue="female" name="radio-buttons-group">
            {["all", "in stock", "out of stock"].map((availability) => (
              <FormControlLabel
                key={availability}
                value={availability}
                control={
                  <Radio
                    checked={availability === availabilityParams}
                    onChange={handleAvailabilityChange}
                  />
                }
                label={availability}
              />
            ))}
          </RadioGroup>
        </div>

        <div>
          <Typography variant="h6" className="font-semibold!">
            Category
          </Typography>

          <div className="scrollbar-hidden max-h-[150px] overflow-y-auto">
            {getAllCategories.isLoading ? (
              <SectionLoader length={8} />
            ) : (
              <>
                <FormGroup>
                  {getAllCategories.data?.data.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          color="primary"
                          checked={categoryIds.includes(category.id)}
                          value={category.id}
                          onChange={handleCategoryChange}
                        />
                      }
                      label={category.name}
                    />
                  ))}
                </FormGroup>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Typography variant="h6" className="font-semibold!">
            Brands
          </Typography>
          <TextField
            placeholder="Search by brands"
            variant="outlined"
            size="small"
            fullWidth
            value={searchBrands}
            onChange={(e) => {
              setSearchBrands(e.target.value);
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "99px",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Magnifer />
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className="scrollbar-hidden max-h-[150px] overflow-y-auto">
            {getAllBrands.isLoading ? (
              <SectionLoader length={8} />
            ) : (
              <>
                <FormGroup>
                  {filteredBrands?.map((brand) => (
                    <FormControlLabel
                      key={brand.id}
                      control={
                        <Checkbox
                          color="primary"
                          checked={brandIds.includes(brand.id)}
                          value={brand.id}
                          onChange={handleBrandChange}
                        />
                      }
                      label={brand.name}
                    />
                  ))}
                </FormGroup>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProductListFilters;

const SectionLoader = ({ length }: { length: number }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center h-full">
      {Array.from({ length }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={30}
          className="w-full h-[30px]"
        />
      ))}
    </div>
  );
};
