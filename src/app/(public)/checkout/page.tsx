"use client";

import { Shell } from "@/components/ui";
import {
  Button,
  Card,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Skeleton,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
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
  CreateOrderRequest,
} from "@/apis/order-api";
import { OrderRecurringFrequency } from "@/types/order";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const CheckoutPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const isAuthenticated = !!authUser?.isAuthenticated;

  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
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
      const price = item.product.price / 100;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const total = subtotal;

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
      };

      if (isAuthenticated && !orderData.guestInfo) {
        if (!selectedAddressId) {
          enqueueSnackbar("Please select a delivery address", { variant: "error" });
          return;
        }
        orderPayload.deliveryAddressId = selectedAddressId;
      }

      const result = await createOrder({ data: orderPayload }).unwrap();
      const order = result.data?.order;
      const paymentLink = result.data?.paymentLink;

      if (paymentLink) {
        // Redirect to payment
        window.location.href = paymentLink;
      } else {
        // Order created without payment (shouldn't happen normally)
        enqueueSnackbar("Order created successfully", { variant: "success" });
        router.push(`/checkout/success?orderId=${order?.id}`);
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to create order", {
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

      <div className="flex sm:flex-row flex-col justify-center gap-6 max-w-[1440px] mx-auto">
        <div className="flex-1">
          {!isAuthenticated && (
            <>
              <Typography variant="body1" className="mb-4">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-pink-600 hover:text-pink-700 font-semibold"
                >
                  Login
                </Link>
              </Typography>

              <Card variant="outlined" className="p-6 mb-6">
                <Typography variant="h6" className="font-semibold mb-4">
                  Continue as a guest
                </Typography>

                <form onSubmit={guestFormik.handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="First name"
                      name="firstName"
                      fullWidth
                      value={guestFormik.values.firstName}
                      onChange={guestFormik.handleChange}
                      onBlur={guestFormik.handleBlur}
                      error={guestFormik.touched.firstName && !!guestFormik.errors.firstName}
                      helperText={guestFormik.touched.firstName && guestFormik.errors.firstName}
                      size="small"
                      required
                    />
                    <TextField
                      label="Last name"
                      name="lastName"
                      fullWidth
                      value={guestFormik.values.lastName}
                      onChange={guestFormik.handleChange}
                      onBlur={guestFormik.handleBlur}
                      error={guestFormik.touched.lastName && !!guestFormik.errors.lastName}
                      helperText={guestFormik.touched.lastName && guestFormik.errors.lastName}
                      size="small"
                      required
                    />
                  </div>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    fullWidth
                    value={guestFormik.values.email}
                    onChange={guestFormik.handleChange}
                    onBlur={guestFormik.handleBlur}
                    error={guestFormik.touched.email && !!guestFormik.errors.email}
                    helperText={guestFormik.touched.email && guestFormik.errors.email}
                    size="small"
                    required
                  />
                  <TextField
                    label="Mobile Number"
                    name="phone"
                    fullWidth
                    value={guestFormik.values.phone}
                    onChange={guestFormik.handleChange}
                    onBlur={guestFormik.handleBlur}
                    error={guestFormik.touched.phone && !!guestFormik.errors.phone}
                    helperText={guestFormik.touched.phone && guestFormik.errors.phone}
                    size="small"
                    required
                  />
                </form>
              </Card>
            </>
          )}

          {/* Shipping Method */}
          <Card variant="outlined" className="p-6 mb-6">
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
                  label="Delivery to me"
                />
                <FormControlLabel
                  value="Pickup"
                  control={<Radio />}
                  label="Pick up from pharmacy"
                />
              </RadioGroup>
            </FormControl>
          </Card>

          {/* Shipping Address */}
          <Card variant="outlined" className="p-6 mb-6">
            <Typography variant="h6" className="font-semibold mb-4">
              {isAuthenticated ? "Delivery Address" : "Shipping Details"}
            </Typography>

            {isAuthenticated ? (
              addressesLoading ? (
                <Skeleton variant="rectangular" height={100} />
              ) : addresses.length > 0 ? (
                <FormControl fullWidth>
                  <InputLabel>Select Address</InputLabel>
                  <Select
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                    label="Select Address"
                  >
                    {addresses.map((address) => (
                      <MenuItem key={address.id} value={address.id}>
                        {address.line1}, {address.city}, {address.state}
                        {address.isDefault && " (Default)"}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="outlined"
                    size="small"
                    className="mt-2"
                    onClick={() => router.push("/dashboard/addresses")}
                  >
                    Add New Address
                  </Button>
                </FormControl>
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
              )
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  label="Address"
                  name="addressLine1"
                  fullWidth
                  value={guestFormik.values.addressLine1}
                  onChange={guestFormik.handleChange}
                  onBlur={guestFormik.handleBlur}
                  error={guestFormik.touched.addressLine1 && !!guestFormik.errors.addressLine1}
                  helperText={guestFormik.touched.addressLine1 && guestFormik.errors.addressLine1}
                  size="small"
                  required
                />
                <TextField
                  label="Apartment, suite, etc"
                  name="addressLine2"
                  fullWidth
                  value={guestFormik.values.addressLine2}
                  onChange={guestFormik.handleChange}
                  size="small"
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="City"
                    name="city"
                    fullWidth
                    value={guestFormik.values.city}
                    onChange={guestFormik.handleChange}
                    onBlur={guestFormik.handleBlur}
                    error={guestFormik.touched.city && !!guestFormik.errors.city}
                    helperText={guestFormik.touched.city && guestFormik.errors.city}
                    size="small"
                    required
                  />
                  <TextField
                    label="State/Region"
                    name="state"
                    fullWidth
                    value={guestFormik.values.state}
                    onChange={guestFormik.handleChange}
                    onBlur={guestFormik.handleBlur}
                    error={guestFormik.touched.state && !!guestFormik.errors.state}
                    helperText={guestFormik.touched.state && guestFormik.errors.state}
                    size="small"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Postal Code"
                    name="postalCode"
                    fullWidth
                    value={guestFormik.values.postalCode}
                    onChange={guestFormik.handleChange}
                    size="small"
                  />
                  <TextField
                    label="Country"
                    name="country"
                    fullWidth
                    value={guestFormik.values.country}
                    onChange={guestFormik.handleChange}
                    onBlur={guestFormik.handleBlur}
                    error={guestFormik.touched.country && !!guestFormik.errors.country}
                    helperText={guestFormik.touched.country && guestFormik.errors.country}
                    size="small"
                    required
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Order Notes */}
          <Card variant="outlined" className="p-6 mb-6">
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
          </Card>

          {/* Recurring Order Option */}
          <Card variant="outlined" className="p-6 mb-6">
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
              <FormControl fullWidth className="mt-4">
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={recurringFrequency}
                  onChange={(e) =>
                    setRecurringFrequency(e.target.value as OrderRecurringFrequency)
                  }
                  label="Frequency"
                >
                  <MenuItem value={OrderRecurringFrequency.WEEKLY}>Weekly</MenuItem>
                  <MenuItem value={OrderRecurringFrequency.MONTHLY}>Monthly</MenuItem>
                </Select>
              </FormControl>
            )}
          </Card>
        </div>

        {/* Order Summary */}
        <div className="sm:w-[400px] w-full">
          <Card variant="outlined" className="flex flex-col gap-2 p-4 bg-white! sticky top-4">
            <Typography variant="h6" className="font-semibold!">
              Order Summary
            </Typography>

            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => {
                const productPrice = item.product.price / 100;
                const itemTotal = productPrice * item.quantity;
                const productImage =
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0]
                    : "/assets/dummy-product.png";

                return (
                  <div key={item.id} className="flex items-start gap-3 pb-3 border-b">
                    <div className="w-[50px] h-[50px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
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

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <div className="flex flex-row justify-between">
                <Typography>Subtotal</Typography>
                <Typography variant="body1" className="font-semibold!">
                  {currency(subtotal).format({ symbol: "₦" })}
                </Typography>
              </div>
              <div className="flex flex-row justify-between">
                <Typography>Total</Typography>
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
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default CheckoutPage;
