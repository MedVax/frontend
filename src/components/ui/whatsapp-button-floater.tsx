"use client";

import { useState, useRef } from "react";
import {
  IconButton,
  TextField,
  Popover,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

export function WhatsAppButtonFloater() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const anchorEl = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(""); // Reset message
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      return; // Don't submit if message is empty
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/2347067125522?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Reset and close
    setMessage("");
    setOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <IconButton
        ref={anchorEl}
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          backgroundColor: "#25D366",
          color: "white",
          width: 56,
          height: 56,
          boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
          "&:hover": {
            backgroundColor: "#20BA5A",
            boxShadow: "0 6px 16px rgba(37, 211, 102, 0.5)",
          },
          transition: "all 0.3s ease",
        }}
        aria-label="WhatsApp Support"
      >
        <Icon icon="ic:round-whatsapp" width="28" height="28" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 320,
            maxWidth: 400,
            mt: -1,
            mr: -1,
          },
        }}
      >
        <Box className="flex flex-col gap-4 p-4">
          <Box className="flex items-center gap-3">
            <Icon
              icon="ic:round-whatsapp"
              width="24"
              height="24"
              style={{ color: "#25D366" }}
            />
            <Typography variant="h6" className="font-semibold">
              Send us a message
            </Typography>
          </Box>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Box className="flex gap-2 justify-end">
            <Button onClick={handleClose} variant="outlined" size="small">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!message.trim()}
              size="small"
              startIcon={
                <Icon
                  icon="ic:round-whatsapp"
                  width="18"
                  height="18"
                  style={{ color: "white" }}
                />
              }
              sx={{
                backgroundColor: "#25D366",
                "&:hover": {
                  backgroundColor: "#20BA5A",
                },
                "&:disabled": {
                  backgroundColor: "#ccc",
                  color: "#999",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
