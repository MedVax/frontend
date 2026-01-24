"use client";

import { Shell } from "@/components/ui";
import React from "react";
import { ProductRelatedItem } from "../products/features/ProductRelatedItem";
import {
  Button,
  ButtonBase,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import currency from "currency.js";
import Link from "next/link";
import { formatNumberToCurrency } from "@/utils/number";
import { useRouter } from "next/navigation";

const cartItems = [
  {
    id: 1,
    name: "High Strength Vitamin C 1000mg",
    price: 100,
    quantity: 1,
    image: "/assets/dummy-product.png",
  },
  {
    id: 2,
    name: "High Strength Vitamin C 1000mg",
    price: 100,
    quantity: 1,
    image: "/assets/dummy-product.png",
  },
  {
    id: 3,
    name: "High Strength Vitamin C 1000mg",
    price: 100,
    quantity: 1,
    image: "/assets/dummy-product.png",
  },
];
const CartPage = () => {
  const router = useRouter();
  const handlePlaceOrder = () => {
    router.push("/checkout");
  };
  return (
    <Shell component="section" className="my-20">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="">
          <Typography variant="h5" className="font-bold!">
            Cart Summary
          </Typography>
          <Typography variant="body2" className="text-gray-500!">
            You have {cartItems.length} item(s) in your cart.
          </Typography>
        </div>

        <div>
          <Typography
            component={Link}
            href="/products"
            variant="h6"
            className="font-semibold! flex items-center gap-3"
          >
            <Icon icon="formkit:left" /> Continue Shopping
          </Typography>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col justify-center gap-4 max-w-[1200px] mx-auto mt-20">
        <div>
          <Typography variant="h6" className="font-semibold!">
            {cartItems.length} items
          </Typography>

          <div className="flex flex-col gap-2 w-full mt-4">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                className="p-4 bg-white flex flex-row gap-2"
              >
                <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-fit"
                  />
                </div>
                <div>
                  <div>
                    <Typography variant="h6" className="font-semibold!">
                      {item.name}
                    </Typography>

                    <div className="mt-3" color="secondary">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="font-semibold!"
                      >
                        Quantity
                      </Typography>

                      <div className="flex items-center gap-2 mt-1">
                        <IconButton
                          size="small"
                          color="secondary"
                          variant="soft"
                        >
                          <Icon icon="mdi:plus" />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>

                        <IconButton
                          size="small"
                          color="secondary"
                          variant="soft"
                        >
                          <Icon icon="mdi:minus" />
                        </IconButton>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-3">
                      <ButtonBase disableRipple className="p-0! space-x-1">
                        <Icon
                          icon="mdi:trash-can"
                          className="text-error-main!"
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="font-semibold!"
                        >
                          Remove
                        </Typography>
                      </ButtonBase>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold!">
                    {currency(item.price).format({ symbol: "₦" })}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Typography variant="h6" className="font-semibold!">
            Order Summary
          </Typography>

          <Card
            variant="outlined"
            className="flex flex-col gap-2 p-4 bg-white! mt-4"
          >
            <div className="flex flex-col gap-2">
              {[
                {
                  label: "Subtotal",
                  value: (
                    <Typography variant="h6" className="font-semibold!">
                      {currency(
                        cartItems.reduce((acc, item) => acc + item.price, 0)
                      ).format({ symbol: "₦" })}
                    </Typography>
                  ),
                },
                {
                  label: "VAT",
                  value: <Typography variant="body2">VAT Applied</Typography>,
                },
                {
                  label: "Discount",
                  value: (
                    <Typography variant="body2">
                      {formatNumberToCurrency("0", true)}
                    </Typography>
                  ),
                },
                {
                  label: "Delivery charge",
                  value: (
                    <Typography variant="body2" className="max-w-[125px]">
                      Add delivery address on checkout page
                    </Typography>
                  ),
                },
                {
                  label: "Total",
                  value: (
                    <Typography variant="h6" className="font-semibold!">
                      {currency(
                        cartItems.reduce((acc, item) => acc + item.price, 0)
                      ).format({ symbol: "₦" })}
                    </Typography>
                  ),
                },
              ]?.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-row justify-between gap-4"
                >
                  <Typography>{item.label}</Typography>
                  <div className="flex-1"></div>
                  {item.value}
                </div>
              ))}
            </div>

            <Button
              variant="contained"
              color="primary"
              className="mt-5"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Card>
        </div>
      </div>

      <div className="mt-20" />

      <ProductRelatedItem />
    </Shell>
  );
};

export default CartPage;
