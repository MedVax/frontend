"use client";

import { Shell } from "@/components/ui";
import {
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  Skeleton,
  Checkbox,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import currency from "currency.js";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetCartQuery } from "@/apis/cart-api";
import { useGetAddressesQuery } from "@/apis/address-api";
import {
  useCreateOrderMutation,
  useCalculateDeliveryFeeQuery,
  CreateOrderRequest,
} from "@/apis/order-api";
import { OrderRecurringFrequency } from "@/types/order";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFormikTextFieldProps } from "@/utils/formik";

const CheckoutPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const isAuthenticated = !!authUser?.isAuthenticated;

  // Fetch cart for both authenticated and anonymous users
  // Backend handles anonymous users via sessionId from cookies
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery();
  const { data: addressesData, isLoading: addressesLoading } = useGetAddressesQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  const cart = cartData?.data;
  const addresses = addressesData?.data || [];
  const cartItems = cart?.items || [];

  // Guest form validation
  const guestValidationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    addressLine1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  const guestFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Nigeria",
    },
    validationSchema: guestValidationSchema,
    onSubmit: async (values) => {
      await handlePlaceOrder({
        guestInfo: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
        },
      });
    },
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ""
  );
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("Delivery");
  const [orderNotes, setOrderNotes] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<OrderRecurringFrequency>(
    OrderRecurringFrequency.WEEKLY
  );

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.product.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  // Get delivery address for fee calculation
  const deliveryAddress = useMemo(() => {
    if (isAuthenticated) {
      return addresses.find((a) => a.id === selectedAddressId);
    } else {
      return {
        city: guestFormik.values.city,
        state: guestFormik.values.state,
      };
    }
  }, [isAuthenticated, selectedAddressId, addresses, guestFormik.values.city, guestFormik.values.state]);

  // Calculate delivery fee (same-day delivery)
  // Only calculate if "Delivery" is selected (not "Pickup")
  const orderValueInKobo = Math.round(subtotal * 100);
  const isDelivery = selectedShippingMethod === "Delivery";
  const { data: deliveryFeeData, isLoading: deliveryFeeLoading, error: deliveryFeeError } = useCalculateDeliveryFeeQuery(
    {
      params: {
        orderValue: orderValueInKobo,
        city: deliveryAddress?.city || undefined,
        state: deliveryAddress?.state || undefined,
      },
    },
    {
      skip: subtotal === 0 || cartItems.length === 0 || !isDelivery, // Skip if cart is empty or pickup is selected
    }
  );

  // Extract delivery fee from response (default to 1000 Naira = 100000 kobo if not available)
  // Set to 0 if pickup is selected
  // Response structure: { data: { deliveryFee, ... } } (RTK Query unwraps ServerResponse)
  const deliveryFee = isDelivery ? (deliveryFeeData?.data?.deliveryFee ?? 100000) : 0; // No fee for pickup
  const deliveryFeeInNaira = deliveryFee / 100;
  const total = subtotal + deliveryFeeInNaira;

  const handlePlaceOrder = async (orderData: Partial<CreateOrderRequest>) => {
    if (cartItems.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" });
      return;
    }

    try {
      const orderPayload: CreateOrderRequest = {
        ...orderData,
        notes: orderNotes || undefined,
        paymentMethod: "paystack",
        isRecurring: isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : undefined,
        deliveryFee: deliveryFee,
      };

      if (isAuthenticated && !orderData.guestInfo) {
        if (!selectedAddressId) {
          enqueueSnackbar("Please select a delivery address", { variant: "error" });
          return;
        }
        orderPayload.deliveryAddressId = selectedAddressId;
      }

      const result = await createOrder({ data: orderPayload }).unwrap();

      const order = result.data;
      const paymentLink = result.data?.paymentUrl;

      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        // Order created without payment (shouldn't happen normally)
        enqueueSnackbar("Order created successfully", { variant: "success" });
        router.push(`/checkout/success?orderId=${order?.id}`);
      }
    } catch (error: any) {
      const err = error as { defaultUserMessage?: string; message?: string };
      enqueueSnackbar(err?.defaultUserMessage || err?.message || "Failed to create order", {
        variant: "error",
      });
    }
  };

  if (cartLoading) {
    return (
      <Shell component="section" className="my-20">
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={200} />
          ))}
        </div>
      </Shell>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Shell component="section" className="my-20">
        <Alert severity="info" className="mb-4">
          Your cart is empty. <Link href="/products">Continue shopping</Link>
        </Alert>
      </Shell>
    );
  }

  return (
    <Shell component="section" className="my-20">
      <div className="flex flex-row justify-between items-center gap-2 mb-8">
        <Typography variant="h5" className="font-bold!">
          Checkout
        </Typography>
        <Typography
          component={Link}
          href="/cart"
          variant="body2"
          className="text-pink-600 hover:text-pink-700 font-semibold"
        >
          <Icon icon="formkit:left" className="inline mr-1" /> Back to Cart
        </Typography>
      </div>

      <div className="flex sm:flex-row flex-col justify-center gap-6 max-w-[1000px] mx-auto">
        <div className="flex-1">
          {!isAuthenticated && (
            <Paper variant="outlined" className="p-6 mb-6 bg-white!">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold">
                  Continue as a guest
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-pink-600 hover:text-pink-700 font-semibold"
                  >
                    Login
                  </Link>
                </Typography>
              </div>

              <form onSubmit={guestFormik.handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="First name"
                    name="firstName"
                    fullWidth
                    size="small"
                    {...getFormikTextFieldProps(guestFormik, "firstName")}
                  />
                  <TextField
                    label="Last name"
                    name="lastName"
                    fullWidth
                    size="small"
                    {...getFormikTextFieldProps(guestFormik, "lastName")}
                  />
                </div>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  fullWidth
                  size="small"
                  {...getFormikTextFieldProps(guestFormik, "email")}
                />
                <TextField
                  label="Mobile Number"
                  name="phone"
                  fullWidth
                  size="small"
                  {...getFormikTextFieldProps(guestFormik, "phone")}
                />

                <Divider className="my-4" />

                {/* Shipping Address - Visible immediately for anonymous users */}
                <Typography variant="subtitle2" className="font-semibold mb-3">
                  Shipping Address
                </Typography>
                <TextField
                  label="Address"
                  name="addressLine1"
                  fullWidth
                  {...getFormikTextFieldProps(guestFormik, "addressLine1")}
                  size="small"
                />
                <TextField
                  label="Apartment, suite, etc"
                  name="addressLine2"
                  fullWidth
                  {...getFormikTextFieldProps(guestFormik, "addressLine2")}
                  size="small"
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="City"
                    name="city"
                    fullWidth
                    {...getFormikTextFieldProps(guestFormik, "city")}
                    size="small"
                  />
                  <TextField
                    label="State/Region"
                    name="state"
                    fullWidth
                    {...getFormikTextFieldProps(guestFormik, "state")}
                    size="small"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Postal Code"
                    name="postalCode"
                    fullWidth
                    {...getFormikTextFieldProps(guestFormik, "postalCode")}
                    size="small"
                  />
                  <TextField
                    label="Country"
                    name="country"
                    fullWidth
                    {...getFormikTextFieldProps(guestFormik, "country")}
                    size="small"
                  />
                </div>
              </form>
            </Paper>
          )}

          {/* Shipping Method */}
          <Paper variant="outlined" className="p-6 mb-6 bg-white!">
            <Typography variant="h6" className="font-semibold mb-4">
              Shipping Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedShippingMethod}
                onChange={(e) => setSelectedShippingMethod(e.target.value)}
              >
                <FormControlLabel
                  value="Delivery"
                  control={<Radio />}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>Same-Day Delivery</span>
                      <Typography variant="body2" color="text.secondary">
                        {deliveryFeeLoading
                          ? "Calculating..."
                          : currency(deliveryFeeInNaira).format({ symbol: "₦" })}
                      </Typography>
                    </div>
                  }
                />
                <FormControlLabel
                  value="Pickup"
                  control={<Radio />}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>Pick up from pharmacy</span>
                      <Typography variant="body2" color="text.secondary">
                        Free
                      </Typography>
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* Delivery Address - Only for authenticated users */}
          {isAuthenticated && (
            <Paper variant="outlined" className="p-6 mb-6 bg-white!">
              <Typography variant="h6" className="font-semibold mb-4">
                Delivery Address
              </Typography>

              {addressesLoading ? (
                <Skeleton variant="rectangular" height={100} />
              ) : addresses.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <TextField
                    label="Select Address"
                    name="selectedAddressId"
                    fullWidth
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)} size="small"
                    select>
                    {addresses.map((address) => (
                      <MenuItem key={address.id} value={address.id}>
                        {address.line1}, {address.city}, {address.state}
                        {address.isDefault && " (Default)"}
                      </MenuItem>
                    ))}
                  </TextField>


                  <Button
                    variant="outlined"
                    size="small"
                    className="mt-2"
                    onClick={() => router.push("/dashboard/addresses")}
                  >
                    Add New Address
                  </Button>
                </div>

              ) : (
                <div>
                  <Alert severity="warning" className="mb-4">
                    No addresses found. Please add a delivery address.
                  </Alert>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/dashboard/addresses")}
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </Paper>
          )}

          {/* Order Notes */}
          <Paper variant="outlined" className="p-6 mb-6 bg-white!">
            <Typography variant="h6" className="font-semibold mb-4">
              Order Notes (Optional)
            </Typography>
            <TextField
              label="Special instructions"
              multiline
              rows={4}
              fullWidth
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Any special instructions for delivery..."
              size="small"
            />
          </Paper>

          {/* Recurring Order Option */}
          <Paper variant="outlined" className="p-6 mb-6 bg-white!">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
              }
              label="Make this a recurring order"
            />
            {isRecurring && (
              <TextField
                label="Frequency"
                value={recurringFrequency}
                onChange={(e) => setRecurringFrequency(e.target.value as OrderRecurringFrequency)}
                fullWidth
                size="small"
                select
              >
                <MenuItem value={OrderRecurringFrequency.WEEKLY}>Weekly</MenuItem>
                <MenuItem value={OrderRecurringFrequency.MONTHLY}>Monthly</MenuItem>
              </TextField>
            )}
          </Paper>
        </div>

        {/* Order Summary */}
        <div className="sm:w-[400px] w-full">
          <Paper variant="outlined" className="flex flex-col gap-2 p-4 bg-white! sticky top-4">
            <Typography variant="h6" className="font-semibold!">
              Order Summary
            </Typography>

            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => {
                const productPrice = item.product.price;
                const itemTotal = productPrice * item.quantity;
                const productImage =
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0]
                    : "/assets/dummy-product.png";

                return (
                  <div key={item.id} className="flex items-start gap-3 pb-3">
                    <div className="w-[50px] h-[50px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={productImage}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="body2" className="font-semibold line-clamp-2">
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        x{item.quantity}
                      </Typography>
                    </div>
                    <Typography variant="body2" className="font-semibold shrink-0">
                      {currency(itemTotal).format({ symbol: "₦" })}
                    </Typography>
                  </div>
                );
              })}
            </div>

            <Divider className="my-4" />

            <div className="flex flex-col gap-2 mt-4 pt-4">
              <div className="flex flex-row justify-between">
                <Typography>Subtotal</Typography>
                <Typography variant="body1" className="font-semibold!">
                  {currency(subtotal).format({ symbol: "₦" })}
                </Typography>
              </div>
              {isDelivery && (
                <div className="flex flex-row justify-between">
                  <Typography>Delivery Fee (Same-Day)</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {deliveryFeeLoading ? (
                      "Calculating..."
                    ) : (
                      currency(deliveryFeeInNaira).format({ symbol: "₦" })
                    )}
                  </Typography>
                </div>
              )}
              <Divider />
              <div className="flex flex-row justify-between">
                <Typography variant="h6" className="font-semibold!">
                  Total
                </Typography>
                <Typography variant="h6" className="font-semibold!">
                  {currency(total).format({ symbol: "₦" })}
                </Typography>
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              className="mt-5"
              fullWidth
              onClick={() => {
                if (isAuthenticated) {
                  handlePlaceOrder({});
                } else {
                  guestFormik.handleSubmit();
                }
              }}
              disabled={
                isCreatingOrder ||
                (isAuthenticated && !selectedAddressId) ||
                (!isAuthenticated && !guestFormik.isValid)
              }
            >
              {isCreatingOrder ? "Processing..." : "Place Order"}
            </Button>
          </Paper>
        </div>
      </div>
    </Shell>
  );
};

export default CheckoutPage;
