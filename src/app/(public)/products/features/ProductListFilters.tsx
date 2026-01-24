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
  TextField,
  Typography,
} from "@mui/material";

import categoryApi from "@/apis/category-api";
import clsx from "clsx";
import { Icon } from "@iconify/react";

type ProductListFiltersProps = {
  className?: string;
  onClose?: () => void;
};
const ProductListFilters = ({
  className,
  onClose,
  ...props
}: ProductListFiltersProps) => {
  const getAllCategories = categoryApi.useGetCategoriesQuery({
    params: {
      includeSubcategories: false,
      hierarchy: false,
    },
  });
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
                control={<Radio />}
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
            <FormGroup>
              {getAllCategories.data?.data.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={<Checkbox color="primary" />}
                  label={category.name}
                />
              ))}
            </FormGroup>
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
            <FormGroup>
              {[
                { id: "1", name: "Brand 1" },
                { id: "2", name: "Brand 2" },
                { id: "3", name: "Brand 3" },
              ].map((brand) => (
                <FormControlLabel
                  key={brand.id}
                  control={<Checkbox color="primary" />}
                  label={brand.name}
                />
              ))}
            </FormGroup>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProductListFilters;
