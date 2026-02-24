"use client";

import { Shell } from "@/components/ui";
import React, { useMemo } from "react";
import { ProductRelatedItem } from "../products/features/ProductRelatedItem";
import {
  Button,
  ButtonBase,
  Card,
  IconButton,
  Typography,
  Skeleton,
  Alert,
  Box,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import currency from "currency.js";
import Link from "next/link";
import { formatNumberToCurrency } from "@/utils/number";
import { useRouter } from "next/navigation";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/apis/cart-api";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const CartPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [clearCartDialogOpen, setClearCartDialogOpen] = useState(false);
  const { data, isLoading, error } = useGetCartQuery();
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemoving }] =
    useRemoveCartItemMutation();
  const [clearCartMutation, { isLoading: isClearing }] = useClearCartMutation();

  const cart = data?.data;
  const cartItems = useMemo(() => cart?.items || [], [cart?.items]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    try {
      if (newQuantity === 0) {
        await removeCartItem({ path: { id: itemId } }).unwrap();
        enqueueSnackbar("Item removed from cart", { variant: "success" });
      } else {
        await updateCartItem({
          path: { id: itemId },
          data: { quantity: newQuantity },
        }).unwrap();
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to update cart";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeCartItem({ path: { id: itemId } }).unwrap();
      enqueueSnackbar("Item removed from cart", { variant: "success" });
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to remove item";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" });
      return;
    }
    router.push("/checkout");
  };

  const handleClearCart = async () => {
    try {
      await clearCartMutation().unwrap();
      enqueueSnackbar("Cart cleared successfully", { variant: "success" });
      setClearCartDialogOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to clear cart";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.product.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const total = subtotal; // Add VAT, discount, delivery charge later

  if (isLoading) {
    return (
      <Shell component="section" className="my-20">
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={150} />
          ))}
        </div>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell component="section" className="my-20">
        <Alert severity="error" className="mb-4">
          Failed to load cart. Please try again later.
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          startIcon={<Icon icon="solar:refresh-bold-duotone" />}
        >
          Retry
        </Button>
      </Shell>
    );
  }

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

        <div className="flex items-center gap-4">
          {cartItems.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setClearCartDialogOpen(true)}
              disabled={isClearing}
              startIcon={<Icon icon="mdi:delete-outline" />}
            >
              Clear Cart
            </Button>
          )}

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

      {cartItems.length === 0 ? (
        <Box className="text-center py-12 mt-10">
          <Typography variant="h6" className="mb-4">
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href="/products"
            startIcon={<Icon icon="mdi:cart" />}
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <div className="flex sm:flex-row flex-col justify-center gap-4 max-w-[1200px] mx-auto mt-20">
          <div className="flex-1">
            <Typography variant="h6" className="font-semibold!">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Typography>

            <div className="flex flex-col gap-2 w-full mt-4">
              {cartItems.map((item) => {
                const productPrice = item.product.price;
                const itemTotal = productPrice * item.quantity;
                const productImage =
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0]
                    : "/assets/dummy-product.png";

                return (
                  <Card
                    key={item.id}
                    variant="outlined"
                    className="p-4 bg-white flex flex-row gap-4"
                  >
                    <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={productImage}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div>
                        <Typography variant="h6" className="font-semibold!">
                          <Link href={`/products/${item.product.id}`}>
                            {item.product.name}
                          </Link>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="mt-1"
                        >
                          {currency(productPrice).format({ symbol: "₦" })} each
                        </Typography>

                        <div className="mt-3">
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
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={
                                isUpdating || isRemoving || item.quantity <= 1
                              }
                            >
                              <Icon icon="mdi:minus" />
                            </IconButton>
                            <Typography className="min-w-[2rem] text-center">
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              color="secondary"
                              variant="soft"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              disabled={
                                isUpdating ||
                                isRemoving ||
                                item.quantity >=
                                  (item.product.stockQuantity || 0)
                              }
                            >
                              <Icon icon="mdi:plus" />
                            </IconButton>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mt-3">
                          <ButtonBase
                            disableRipple
                            className="p-0! space-x-1"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isRemoving}
                          >
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

                    <div className="flex-shrink-0">
                      <Typography variant="h6" className="font-semibold!">
                        {currency(itemTotal).format({ symbol: "₦" })}
                      </Typography>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="sm:w-[350px] w-full">
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
                        {currency(subtotal).format({ symbol: "₦" })}
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
                        {currency(total).format({ symbol: "₦" })}
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
                disabled={cartItems.length === 0}
                fullWidth
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="mt-20" />
          <ProductRelatedItem />
        </>
      )}

      {/* Clear Cart Confirmation Dialog */}
      <Dialog
        open={clearCartDialogOpen}
        onClose={() => setClearCartDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="clear-cart-dialog-title"
        aria-describedby="clear-cart-dialog-description"
      >
        <DialogTitle id="clear-cart-dialog-title">Clear Cart?</DialogTitle>
        <DialogContent>
          <DialogContentText id="clear-cart-dialog-description">
            Are you sure you want to remove all items from your cart? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setClearCartDialogOpen(false)}
            disabled={isClearing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClearCart}
            color="error"
            variant="contained"
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "Clear Cart"}
          </Button>
        </DialogActions>
      </Dialog>
    </Shell>
  );
};

export default CartPage;
