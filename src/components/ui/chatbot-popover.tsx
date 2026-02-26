"use client";

import { useState, useEffect } from "react";
import {
    Button,
    Box,
    Typography,
    Paper,
    IconButton,
    Slide,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

const CHATBOT_URL = "https://ada.medvaxhealth.com";
const STORAGE_KEY = "medvax_chatbot_popover_dismissed";

export function ChatbotPopover() {
    const [open, setOpen] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check if user has dismissed the popover before
        const wasDismissed = localStorage.getItem(STORAGE_KEY);
        if (wasDismissed) {
            setDismissed(true);
        } else {
            // Show popover after a short delay on first visit
            const timer = setTimeout(() => {
                setOpen(true);
            }, 3000); // Show after 3 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setOpen(false);
        setDismissed(true);
        localStorage.setItem(STORAGE_KEY, "true");
    };

    const handleChatNow = () => {
        window.open(CHATBOT_URL, "_blank", "noopener,noreferrer");
        handleDismiss();
    };

    // Don't render if dismissed
    if (dismissed) {
        return null;
    }

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper
                elevation={8}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1300,
                    borderRadius: "16px 16px 0 0",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    p: 3,
                    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
                }}
            >
                <Box className="flex flex-col gap-3">
                    {/* Close button */}
                    <Box className="flex justify-end">
                        <IconButton
                            onClick={handleDismiss}
                            size="small"
                            sx={{
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                            aria-label="Close"
                        >
                            <Icon icon="mdi:close" width="20" height="20" />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box className="flex items-start gap-3">
                        <Box
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <Icon icon="mdi:robot" width="32" height="32" />
                        </Box>

                        <Box className="flex-1">
                            <Typography
                                variant="h6"
                                className="font-semibold"
                                sx={{ color: "white", mb: 1 }}
                            >
                                Meet Ada, Your AI Health Assistant
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.95)",
                                    lineHeight: 1.6,
                                    mb: 2,
                                }}
                            >
                                Get instant answers to your health questions, medication
                                information, and personalized recommendations 24/7. Ada is here
                                to help you make informed healthcare decisions.
                            </Typography>

                            <Box className="flex gap-2">
                                <Button
                                    onClick={handleChatNow}
                                    variant="contained"
                                    startIcon={
                                        <Icon
                                            icon="mdi:chat-outline"
                                            width="20"
                                            height="20"
                                            style={{ color: "#6366f1" }}
                                        />
                                    }
                                    sx={{
                                        backgroundColor: "white",
                                        color: "#6366f1",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        px: 3,
                                        py: 1,
                                        borderRadius: 2,
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                                            transform: "translateY(-1px)",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                        },
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    Chat with Ada Now
                                </Button>

                                <Button
                                    onClick={handleDismiss}
                                    variant="text"
                                    size="small"
                                    sx={{
                                        color: "rgba(255, 255, 255, 0.9)",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                    }}
                                >
                                    Maybe later
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Slide>
    );
}
