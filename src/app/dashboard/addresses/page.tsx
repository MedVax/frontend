"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
  Box,
  Skeleton,
  Chip,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "@/apis/address-api";
import { useSnackbar } from "notistack";

const Addresses = () => {
  const { data, isLoading } = useGetAddressesQuery();
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateAddressRequest>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    phone: "",
    isDefault: false,
  });

  const addresses = data?.data || [];

  const handleOpenDialog = (addressId?: string) => {
    if (addressId) {
      const address = addresses.find((a) => a.id === addressId);
      if (address) {
        setFormData({
          line1: address.line1,
          line2: address.line2 || "",
          city: address.city,
          state: address.state,
          postalCode: address.postalCode || "",
          country: address.country,
          phone: address.phone,
          isDefault: address.isDefault,
        });
        setEditingAddress(addressId);
      }
    } else {
      setFormData({
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Nigeria",
        phone: "",
        isDefault: addresses.length === 0,
      });
      setEditingAddress(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingAddress(null);
    setFormData({
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Nigeria",
      phone: "",
      isDefault: false,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingAddress) {
        await updateAddress({
          path: { id: editingAddress },
          data: formData as UpdateAddressRequest,
        }).unwrap();
        enqueueSnackbar("Address updated successfully", { variant: "success" });
      } else {
        await createAddress({ data: formData }).unwrap();
        enqueueSnackbar("Address added successfully", { variant: "success" });
      }
      handleCloseDialog();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to save address", {
        variant: "error",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteAddress({ path: { id } }).unwrap();
      enqueueSnackbar("Address deleted successfully", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to delete address", {
        variant: "error",
      });
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress({ path: { id } }).unwrap();
      enqueueSnackbar("Default address updated", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || "Failed to set default address", {
        variant: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={200} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h4" className="font-semibold">
          My Addresses
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="solar:add-circle-linear" fontSize={20} />}
          onClick={() => handleOpenDialog()}
        >
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Paper variant="outlined" className="p-8 text-center bg-white!">
          <Iconify icon="solar:map-point-linear" fontSize={64} className="text-gray-400 mb-4" />
          <Typography variant="h6" className="mb-2">
            No addresses yet
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            Add your first address to get started with faster checkout
          </Typography>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Address
          </Button>
        </Paper>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Paper key={address.id} variant="outlined" className="p-6 relative bg-white!">
              {address.isDefault && (
                <Chip
                  label="Default"
                  color="primary"
                  size="small"
                  className="absolute top-4 right-4"
                />
              )}
              <div className="space-y-2 mb-4">
                <Typography variant="h6" className="font-semibold">
                  {address.line1}
                </Typography>
                {address.line2 && (
                  <Typography variant="body2" color="text.secondary">
                    {address.line2}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {address.city}, {address.state}
                </Typography>
                {address.postalCode && (
                  <Typography variant="body2" color="text.secondary">
                    {address.postalCode}
                  </Typography>
                )}
                <Typography variant="body2" className="font-semibold">
                  {address.country}
                </Typography>
                <div className="flex items-center gap-2 mt-2">
                  <Iconify icon="solar:phone-calling-linear" fontSize={18} />
                  <Typography variant="body2">{address.phone}</Typography>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenDialog(address.id)}
                >
                  Edit
                </Button>
                {!address.isDefault && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </Button>
              </div>
            </Paper>
          ))}
        </div>
      )}

      {/* Add/Edit Address Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Address Line 1"
              value={formData.line1}
              onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Address Line 2 (Optional)"
              value={formData.line2}
              onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
              <TextField
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData({ ...formData, isDefault: e.target.checked })
                  }
                />
              }
              label="Set as default address"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.line1 || !formData.city || !formData.state || !formData.phone}
          >
            {editingAddress ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addresses;

