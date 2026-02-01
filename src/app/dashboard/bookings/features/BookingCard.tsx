import {
    Avatar,
    Button,
    Icon,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from "@mui/material";
import { Calendar, ClockCircle, Global } from "@solar-icons/react";
import { format } from "date-fns";
import React, { useState } from "react";
import {
    Session,
    SessionStatus,
    useRescheduleSessionMutation,
    useCancelSessionMutation,
} from "@/apis/session-api";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify/react";

interface BookingCardProps {
    session: Session;
    isConsultant?: boolean;
    status?: SessionStatus;
}

const BookingCard = ({ session, isConsultant = false, status }: BookingCardProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [rescheduleReason, setRescheduleReason] = useState("");
    const [cancelNote, setCancelNote] = useState("");

    const [rescheduleSessionMutation, { isLoading: isRescheduling }] = useRescheduleSessionMutation();
    const [cancelSession, { isLoading: isCanceling }] = useCancelSessionMutation();

    const consultant = session.consultant;
    const consultantUser = consultant?.userProfile?.user;
    const client = session.client;
    const clientUser = client?.userProfile?.user;

    const name = isConsultant ? `${clientUser?.firstName || ""} ${clientUser?.lastName || ""}`.trim()
        : `${consultantUser?.firstName || ""} ${consultantUser?.lastName || ""}`.trim();
    const avatar = isConsultant ? clientUser?.avatar : consultantUser?.avatar;
    const title = isConsultant ? `Client` : (consultant as any)?.jobTitle;


    const canReschedule =
        session.status === SessionStatus.PENDING ||
        session.status === SessionStatus.UPCOMING ||
        session.status === SessionStatus.PENDING_APPROVAL;

    const canCancel =
        session.status === SessionStatus.PENDING ||
        session.status === SessionStatus.UPCOMING ||
        session.status === SessionStatus.PENDING_APPROVAL;

    const handleReschedule = async () => {
        if (!rescheduleDate) {
            enqueueSnackbar("Please select a new date", { variant: "warning" });
            return;
        }

        try {
            await rescheduleSessionMutation({
                data: {
                    sessionId: session.id,
                    date: new Date(rescheduleDate).toISOString(),
                    consultantId: session.consultantId,
                    reason: rescheduleReason || undefined,
                },
            }).unwrap();
            enqueueSnackbar("Reschedule request submitted successfully", { variant: "success" });
            setRescheduleDialogOpen(false);
            setRescheduleDate("");
            setRescheduleReason("");
        } catch (error: unknown) {
            const errorMessage =
                (error as { data?: { defaultMessage?: string } })?.data?.defaultMessage ||
                "Failed to reschedule session";
            enqueueSnackbar(errorMessage, {
                variant: "error",
            });
        }
    };

    const handleCancel = async () => {
        try {
            await cancelSession({
                data: {
                    sessionId: session.id,
                    date: session.scheduledDate,
                    consultantId: session.consultantId,
                    note: cancelNote || undefined,
                },
            }).unwrap();
            enqueueSnackbar("Session canceled successfully", { variant: "success" });
            setCancelDialogOpen(false);
            setCancelNote("");
        } catch (error: unknown) {
            const errorMessage =
                (error as { data?: { defaultMessage?: string } })?.data?.defaultMessage ||
                "Failed to cancel session";
            enqueueSnackbar(errorMessage, {
                variant: "error",
            });
        }
    };


    return (
        <>
            <Paper variant="outlined" className="space-y-4 bg-white! p-4">

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <Avatar src={avatar || undefined} sx={{ width: 56, height: 56 }}>
                            {consultantUser?.firstName?.[0]}{consultantUser?.lastName?.[0]}
                        </Avatar>
                        <div className="flex flex-col">
                            <Typography variant="h6" className="font-semibold capitalize">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {title}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2 max-w-[500px]">
                        {[
                            {
                                icon: <Calendar />,
                                title: "Date",
                                value: session.scheduledDate ? format(new Date(session.scheduledDate), "dd MMM, yyyy") : "N/A",
                            },
                            {
                                icon: <ClockCircle />,
                                title: "Time",
                                value: session.scheduledDate ? format(new Date(session.scheduledDate), "h:mm a") : "N/A",
                            },
                            {
                                icon: <Global />,
                                title: "Timezone",
                                value: session.clientTimezone || "Africa/Lagos",
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Icon className="text-grey-9" fontSize="small">
                                    {item.icon}
                                </Icon>
                                <div>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.title}
                                    </Typography>
                                    <Typography className="font-semibold">{item.value}</Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                    {session.note && (
                        <Typography variant="body2" color="text.secondary" className="mt-2">
                            <strong>Note:</strong> {session.note}
                        </Typography>
                    )}
                    {((canReschedule || canCancel || session.meetingUrl) && status === SessionStatus.PENDING && !isConsultant) && (
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {canReschedule && (
                                <Button
                                    color="secondary"
                                    variant="soft"
                                    onClick={() => setRescheduleDialogOpen(true)}
                                >
                                    Reschedule
                                </Button>
                            )}

                            <div className="flex-1"></div>
                            {(session.meetingUrl && (status as any) === SessionStatus.UPCOMING) && (
                                <Button
                                    variant="soft"
                                    href={session.meetingUrl}
                                    target="_blank"
                                    component="a"
                                    startIcon={<Iconify icon="solar:videocamera-record-linear" fontSize={20} />}
                                >
                                    Join Session
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </Paper>

            {/* Reschedule Dialog */}
            <Dialog
                open={rescheduleDialogOpen}
                onClose={() => setRescheduleDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Reschedule Session</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-4">
                        Please select a new date and time for your session with {name}.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="New Date & Time"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        className="mb-4"
                        required
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Reason (Optional)"
                        value={rescheduleReason}
                        onChange={(e) => setRescheduleReason(e.target.value)}
                        placeholder="Please provide a reason for rescheduling..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRescheduleDialogOpen(false)} disabled={isRescheduling}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleReschedule}
                        variant="contained"
                        disabled={isRescheduling || !rescheduleDate}
                    >
                        {isRescheduling ? "Submitting..." : "Submit Request"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Cancel Dialog */}
            <Dialog
                open={cancelDialogOpen}
                onClose={() => setCancelDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Cancel Session</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-4">
                        Are you sure you want to cancel this session with {name}? This action cannot be undone.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Cancellation Reason (Optional)"
                        value={cancelNote}
                        onChange={(e) => setCancelNote(e.target.value)}
                        placeholder="Please provide a reason for cancellation..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialogOpen(false)} disabled={isCanceling}>
                        Keep Session
                    </Button>
                    <Button onClick={handleCancel} variant="contained" color="error" disabled={isCanceling}>
                        {isCanceling ? "Canceling..." : "Cancel Session"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BookingCard;
