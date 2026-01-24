import { Icon } from "@iconify/react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import React, { Fragment } from "react";

const ProductDetailAccreditation = () => {
  const howTo = [
    {
      title: "NAFDAC/FDA Approved Medications",
      image: (
        <div className="w-12 h-12 rounded-full">
          <img
            src="/assets/nafdac-logo.png"
            alt="NAFDAC/FDA Approved Medications"
            className="w-12 h-12 object-contain"
          />
        </div>
      ),
    },
    {
      title: "Affordable Price",
      image: (
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-5 border-grey-100">
          <Icon
            icon="solar:graph-down-new-broken"
            width={20}
            height={20}
            className="text-white"
          />
        </div>
      ),
    },
    {
      title: "Same day delivery",
      image: (
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-5 border-grey-100">
          <Icon
            icon="solar:stopwatch-linear"
            width={20}
            height={20}
            className="text-white"
          />
        </div>
      ),
    },
    {
      title: "Product Recommendations & Doctor Consultations",
      image: (
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-5 border-grey-100">
          <Icon
            icon="solar:star-circle-linear"
            width={20}
            height={20}
            className="text-white"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Card className="p-3 md:block hidden">
        <CardContent className="flex flex-row items-center justify-center  gap-2 bg-white! rounded-lg overflow-x-scroll scrollbar-hidden px-4">
          {howTo.map((item, index) => (
            <Fragment key={item.title}>
              {index > 0 && <Divider className="md:w-[100px] w-[50px] " />}
              <div className="flex items-center gap-2 w-[200px]">
                <div>{item.image}</div>
                <Typography className="text-secondary max-w-[150px]">
                  {item.title}
                </Typography>
              </div>
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailAccreditation;
