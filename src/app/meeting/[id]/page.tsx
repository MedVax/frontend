'use client';

import React, { useEffect } from 'react';
import { use } from 'react';
import { useRealtimeKitClient, useRealtimeKitMeeting, RealtimeKitProvider } from '@cloudflare/realtimekit-react';
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';
import { useGetSessionMeetingTokenQuery } from '@/apis/session-api';
import { Alert, CircularProgress, Box, Typography, Fade } from '@mui/material';
import { Icon as Iconify } from '@iconify/react';

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

const MeetingPage = ({ params }: MeetingPageProps) => {
    const { id: sessionId } = use(params);
    const [meeting, initMeeting] = useRealtimeKitClient();
    const initializedRef = React.useRef(false);

    const { data: tokenData, isLoading, error } = useGetSessionMeetingTokenQuery({
        path: { id: sessionId },
    });

    const authToken = tokenData?.data?.token;

    useEffect(() => {
        if (authToken && !initializedRef.current) {
            initMeeting({ authToken });
            initializedRef.current = true;
        }
    }, [authToken, initMeeting]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (error || !authToken) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                p={3}
            >
                <Alert severity="error">
                    {error
                        ? 'Failed to load meeting token. Please try again.'
                        : 'Meeting token not available. Please ensure you have access to this session.'}
                </Alert>
            </Box>
        );
    }

    return (
        <RealtimeKitProvider value={meeting}>
            <MyMeetingUI />
        </RealtimeKitProvider>
    );
}

function MyMeetingUI() {
    const { meeting } = useRealtimeKitMeeting();
    return (
        <RtkMeeting mode="fixed" meeting={meeting} showSetupScreen />
    );
}

function Loading() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #e91d74 0%, #db2777 50%, #be185d 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                    animation: 'pulse 3s ease-in-out infinite',
                },
                '@keyframes pulse': {
                    '0%, 100%': {
                        opacity: 1,
                    },
                    '50%': {
                        opacity: 0.8,
                    },
                },
            }}
        >
            <Fade in={true} timeout={800}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        zIndex: 1,
                        position: 'relative',
                    }}
                >
                    {/* Animated Icon Container */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: 120,
                            height: 120,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Outer rotating ring */}
                        <CircularProgress
                            size={120}
                            thickness={2}
                            sx={{
                                position: 'absolute',
                                color: 'rgba(255, 255, 255, 0.3)',
                                animation: 'spin 2s linear infinite',
                                '@keyframes spin': {
                                    '0%': {
                                        transform: 'rotate(0deg)',
                                    },
                                    '100%': {
                                        transform: 'rotate(360deg)',
                                    },
                                },
                            }}
                        />
                        {/* Inner pulsing circle */}
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: 'pulse-scale 2s ease-in-out infinite',
                                '@keyframes pulse-scale': {
                                    '0%, 100%': {
                                        transform: 'scale(1)',
                                        opacity: 0.8,
                                    },
                                    '50%': {
                                        transform: 'scale(1.1)',
                                        opacity: 1,
                                    },
                                },
                            }}
                        >
                            <Iconify
                                icon="solar:videocamera-record-bold-duotone"
                                width={48}
                                height={48}
                                style={{
                                    color: 'white',
                                    animation: 'bounce 2s ease-in-out infinite',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Loading Text */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                letterSpacing: '0.5px',
                            }}
                        >
                            Preparing Your Meeting
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.9,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            <Iconify
                                icon="solar:wifi-router-bold-duotone"
                                width={16}
                                height={16}
                                style={{
                                    animation: 'spin 2s linear infinite',
                                }}
                            />
                            Connecting to session...
                        </Typography>
                    </Box>

                    {/* Progress Indicator */}
                    <Box
                        sx={{
                            width: 200,
                            height: 4,
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: 2,
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                background: 'white',
                                borderRadius: 2,
                                width: '60%',
                                animation: 'loading-bar 2s ease-in-out infinite',
                                '@keyframes loading-bar': {
                                    '0%': {
                                        transform: 'translateX(-100%)',
                                    },
                                    '50%': {
                                        transform: 'translateX(0%)',
                                    },
                                    '100%': {
                                        transform: 'translateX(200%)',
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Fade>
        </Box>
    );
}

export default MeetingPage;