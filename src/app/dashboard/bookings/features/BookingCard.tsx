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
    Chip,
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
}

const BookingCard = ({ session }: BookingCardProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [rescheduleReason, setRescheduleReason] = useState("");
    const [cancelNote, setCancelNote] = useState("");

    const [rescheduleSession, { isLoading: isRescheduling }] = useRescheduleSessionMutation();
    const [cancelSession, { isLoading: isCanceling }] = useCancelSessionMutation();

    const consultant = session.consultant;
    const consultantUser = consultant?.userProfile?.user;
    const name = consultantUser
        ? `${consultantUser.firstName || ""} ${consultantUser.lastName || ""}`.trim()
        : "Consultant";
    const avatar = consultantUser && "avatar" in consultantUser ? consultantUser.avatar : undefined;
    const title = `${session.sessionType} Session`;

    const getStatusColor = (status: Session["status"]) => {
        switch (status) {
            case SessionStatus.COMPLETED:
                return "success";
            case SessionStatus.UPCOMING:
                return "info";
            case SessionStatus.PENDING:
            case SessionStatus.PENDING_APPROVAL:
                return "warning";
            case SessionStatus.CANCELED:
            case SessionStatus.DECLINED:
                return "error";
            default:
                return "default";
        }
    };

    const getStatusLabel = (status: Session["status"]) => {
        switch (status) {
            case SessionStatus.PENDING_APPROVAL:
                return "Pending Approval";
            case SessionStatus.UPCOMING:
                return "Upcoming";
            case SessionStatus.COMPLETED:
                return "Completed";
            case SessionStatus.CANCELED:
                return "Canceled";
            case SessionStatus.DECLINED:
                return "Declined";
            default:
                return status;
        }
    };

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
            await rescheduleSession({
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
                (error as { data?: { message?: string } })?.data?.message ||
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
                (error as { data?: { message?: string } })?.data?.message ||
                "Failed to cancel session";
            enqueueSnackbar(errorMessage, {
                variant: "error",
            });
        }
    };

    return (
        <>
            <Paper variant="outlined" className="space-y-4 bg-white! p-4">
                <div className="flex items-center justify-between mb-4">
                    <Chip
                        label={getStatusLabel(session.status)}
                        color={getStatusColor(session.status)}
                        variant="soft"
                        size="small"
                    />
                    {session.rescheduled && (
                        <Chip label="Rescheduled" color="info" variant="outlined" size="small" />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <Avatar src={avatar || undefined} sx={{ width: 56, height: 56 }}>
                            {consultantUser?.firstName?.[0]}{consultantUser?.lastName?.[0]}
                        </Avatar>
                        <div className="flex flex-col">
                            <Typography variant="h6" className="font-semibold">
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
                                value: format(new Date(session.scheduledDate), "dd MMM, yyyy"),
                            },
                            {
                                icon: <ClockCircle />,
                                title: "Time",
                                value: format(new Date(session.scheduledDate), "h:mm a"),
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
                    {(canReschedule || canCancel || session.meetingUrl) && (
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
                            {canCancel && (
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => setCancelDialogOpen(true)}
                                >
                                    Cancel
                                </Button>
                            )}
                            <div className="flex-1"></div>
                            {session.meetingUrl && session.status === SessionStatus.UPCOMING && (
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
                maxWidth="sm"
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
