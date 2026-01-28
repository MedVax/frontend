"use client";

import { ButtonBase, Paper, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import clsx from "clsx";

interface ProductDetailInfoProps {
  product?: {
    howToUse?: string | null;
    ingredients?: string[];
    pharmacyAdvise?: string | null;
    specification?: string | null;
    description?: string | null;
  };
}

const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const info = useMemo(() => {
    const tabs = [
      {
        title: "About",
        content: (
          <Typography variant="body1" className="whitespace-pre-wrap">
            {product?.description || "No description available."}
          </Typography>
        ),
        hasContent: !!product?.description,
      },
      {
        title: "How to use",
        content: (
          <Typography variant="body1" className="whitespace-pre-wrap">
            {product?.howToUse || "No usage instructions available."}
          </Typography>
        ),
        hasContent: !!product?.howToUse,
      },
      {
        title: "Ingredients",
        content: (
          <div>
            {product?.ingredients && product.ingredients.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <Typography variant="body1">{ingredient}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1">
                No ingredients information available.
              </Typography>
            )}
          </div>
        ),
        hasContent: !!(product?.ingredients && product.ingredients.length > 0),
      },
      {
        title: "Pharmacy Advice",
        content: (
          <Typography variant="body1" className="whitespace-pre-wrap">
            {product?.pharmacyAdvise || "No pharmacy advice available."}
          </Typography>
        ),
        hasContent: !!product?.pharmacyAdvise,
      },
      {
        title: "Specifications",
        content: (
          <Typography variant="body1" className="whitespace-pre-wrap">
            {product?.specification || "No specifications available."}
          </Typography>
        ),
        hasContent: !!product?.specification,
      },
    ];

    // Filter out tabs with no content and return only those with content
    return tabs.filter((tab) => tab.hasContent);
  }, [product]);

  // Ensure activeTab is within bounds
  const validActiveTab = useMemo(() => {
    if (info.length === 0) return 0;
    return Math.min(activeTab, info.length - 1);
  }, [activeTab, info.length]);

  if (info.length === 0) {
    return null;
  }

  return (
    <div className="flex md:flex-row flex-col gap-4">
      <Paper
        variant="outlined"
        className="p-2 md:w-[200px] w-full flex md:flex-col flex-row md:gap-2 gap-4 bg-white! overflow-x-scroll scrollbar-hidden"
      >
        {info.map((item, index) => (
          <div key={item.title}>
            <ButtonBase
              color="secondary"
              className={clsx(
                validActiveTab === index && "border-b border-primary",
                "w-full py-3 text-nowrap"
              )}
              onClick={() => setActiveTab(index)}
            >
              {item.title}
            </ButtonBase>
          </div>
        ))}
      </Paper>

      <Paper
        variant="outlined"
        className="p-4 md:w-[calc(100%-200px)] w-full bg-white"
      >
        {info[validActiveTab]?.content}
      </Paper>
    </div>
  );
};

export default ProductDetailInfo;
