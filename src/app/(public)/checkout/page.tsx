"use client";

import { Shell } from "@/components/ui";
import {
  Button,
  ButtonBase,
  Card,
  IconButton,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import currency from "currency.js";
import Link from "next/link";
import { formatNumberToCurrency } from "@/utils/number";
import { Radio_Canada_Big } from "next/font/google";
import { useState } from "react";

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
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>("Delivery");

  const handleSelectShippingMethod = (method: string) => {
    setSelectedShippingMethod(method);
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
      <div className="flex sm:flex-row flex-col justify-center gap-6 max-w-[1440px] mx-auto mt-20">
        <div>
          <Typography variant="body1">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
            >
              Login
            </Link>
          </Typography>

          <div className="mt-6">
            <Typography variant="body1" className="font-semibold!">
              Continue as a guest
            </Typography>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <TextField
                label="First name"
                fullWidth
                placeholder="John"
                size="small"
              />
              <TextField
                label="Last name"
                fullWidth
                placeholder="Doe"
                size="small"
              />
              <TextField
                label="Email Address"
                fullWidth
                className="col-span-2"
                placeholder="john.doe@example.com"
                size="small"
              />
              <TextField
                label="Mobile Number"
                fullWidth
                className="col-span-2"
                placeholder="08012345678"
                size="small"
              />
            </div>
          </div>

          <div className="mt-10">
            <Typography variant="body1" className="font-semibold!">
              Shipping Methods
            </Typography>

            <div className="flex flex-row items-center gap-2 mt-4">
              {[
                {
                  title: "Delivery to me",
                  value: "Delivery",
                },
                {
                  title: "Pick up from pharmacy",
                  value: "Pickup",
                },
              ]?.map((item) => (
                <div key={item.value}>
                  <Button
                    startIcon={
                      selectedShippingMethod.toLowerCase() ===
                      item.value.toLowerCase() ? (
                        <Icon icon="fluent:radio-button-20-filled" />
                      ) : (
                        <Icon icon="fluent:radio-button-24-regular" />
                      )
                    }
                    className={
                      selectedShippingMethod.toLowerCase() ===
                      item.value.toLowerCase()
                        ? "border-primary-500 border"
                        : "border-gray-300 border"
                    }
                    size="small"
                    variant={
                      selectedShippingMethod.toLowerCase() ===
                      item.value.toLowerCase()
                        ? "soft"
                        : "outlined"
                    }
                    color={
                      selectedShippingMethod.toLowerCase() ===
                      item.value.toLowerCase()
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleSelectShippingMethod(item.value)}
                  >
                    {item.title}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Typography variant="body1" className="font-semibold!">
              Shipping details
            </Typography>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <TextField
                label="Address"
                fullWidth
                placeholder="123 Main Street"
                size="small"
              />
              <TextField
                label="Apartment, suite, etc"
                fullWidth
                placeholder="Apartment, suite, etc"
                size="small"
              />
              <TextField
                label="State/Region"
                fullWidth
                placeholder="john.doe@example.com"
                size="small"
              />
              <TextField
                label="City"
                fullWidth
                placeholder="08012345678"
                size="small"
              />

              <TextField
                label="Order note (Optional)"
                multiline
                rows={4}
                fullWidth
                placeholder="100001"
                size="small"
              />
            </div>
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
            <div className="flex flex-col gap-2 w-full">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start flex-row gap-3">
                  <div className="w-[50px] h-[50px] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-fit"
                    />
                  </div>
                  <div>
                    <div>
                      <Typography variant="body2" color="secondary">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        x{item.quantity}
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <Typography variant="body2" className="font-semibold!">
                      {currency(item.price).format({ symbol: "₦" })}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-20">
              {[
                {
                  label: "Subtotal",
                  value: (
                    <Typography variant="body1" className="font-semibold!">
                      {currency(
                        cartItems.reduce((acc, item) => acc + item.price, 0)
                      ).format({ symbol: "₦" })}
                    </Typography>
                  ),
                },
                {
                  label: "Total",
                  value: (
                    <Typography variant="body1" className="font-semibold!">
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

            <Button variant="contained" color="primary" className="mt-5">
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default CartPage;
