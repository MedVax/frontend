'use client';

import React, { useEffect } from 'react';
import { use } from 'react';
import { useRealtimeKitClient, useRealtimeKitMeeting, RealtimeKitProvider } from '@cloudflare/realtimekit-react';
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';
import { useGetSessionMeetingTokenQuery } from '@/apis/session-api';
import { Alert, CircularProgress, Box } from '@mui/material';

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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
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
        <RtkMeeting mode="fill" meeting={meeting} showSetupScreen={true} />
    );
}

export default MeetingPage;