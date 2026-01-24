import { ButtonBase, Paper } from "@mui/material";
import React, { useState } from "react";
import clsx from "clsx";

const ProductDetailInfo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const info = [
    {
      title: "About",
      content: <div>About</div>,
    },
    {
      title: "How to use",
      content: <div>How to use</div>,
    },
    {
      title: "Ingredients",
      content: <div>Ingredients</div>,
    },
    {
      title: "Pharmacy Advice",
      content: <div>Pharmacy Advice</div>,
    },
    {
      title: "Specifications",
      content: <div>Specifications</div>,
    },
  ];

  return (
    <div className="flex md:flex-row flex-col  gap-4">
      <Paper
        variant="outlined"
        className="p-2 md:w-[200px] w-full flex md:flex-col flex-row md:gap-2 gap-4 bg-white! overflow-x-scroll scrollbar-hidden"
      >
        {info.map((item, index) => (
          <div key={item.title}>
            <ButtonBase
              color="secondary"
              className={clsx(
                activeTab === index && "border-b border-primary",
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
        {info[activeTab].content}
      </Paper>
    </div>
  );
};

export default ProductDetailInfo;
