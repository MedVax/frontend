"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Skeleton,
  Alert,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import {
  useGetConsultantsQuery,
  useGetConsultantByIdQuery,
  useAssignConsultantMutation,
} from "@/apis/consultant-api";
import { useSnackbar } from "notistack";
import useAuthUser from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Consultants = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedConsultantId, setSelectedConsultantId] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const limit = 12;

  const skip = (page - 1) * limit;

  const { data, isLoading } = useGetConsultantsQuery({
    params: {
      skip,
      take: limit,
      search: search || undefined,
    },
  });

  const consultants = data?.data?.data || [];
  const pagination = data?.data;

  const handleAssignClick = (consultantId: string) => {
    setSelectedConsultantId(consultantId);
    setAssignDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Typography variant="h4" className="font-semibold">
            Assign Consultant
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-2">
            Browse and assign a consultant to your profile
          </Typography>
        </div>
      </div>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search consultants by name, expertise..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="solar:magnifer-linear" fontSize={20} />
            </InputAdornment>
          ),
        }}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={200} />
          ))}
        </div>
      ) : consultants.length === 0 ? (
        <Paper variant="outlined" className="p-8 text-center bg-white!">
          <Iconify icon="solar:user-outline" fontSize={64} className="text-gray-400 mb-4" />
          <Typography variant="h6" className="mb-2">
            No consultants found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {search ? "Try adjusting your search terms" : "No consultants available at the moment"}
          </Typography>
        </Paper>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultants.map((consultant) => (
              <ConsultantCard
                key={consultant.id}
                consultant={consultant}
                onAssign={() => handleAssignClick(consultant.id)}
                onViewDetails={() => router.push(`/dashboard/consultants/${consultant.id}`)}
              />
            ))}
          </div>

          {pagination && pagination.totalRecords > limit && (
            <Box className="flex justify-center mt-6">
              <Pagination
                count={pagination.pages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Assign Dialog */}
      {selectedConsultantId && (
        <AssignConsultantDialog
          open={assignDialogOpen}
          onClose={() => {
            setAssignDialogOpen(false);
            setSelectedConsultantId(null);
          }}
          consultantId={selectedConsultantId}
        />
      )}
    </div>
  );
};

interface ConsultantCardProps {
  consultant: any;
  onAssign: () => void;
  onViewDetails: () => void;
}

const ConsultantCard = ({ consultant, onAssign, onViewDetails }: ConsultantCardProps) => {
  const user = consultant.userProfile?.user;
  const avatar = user?.avatar;
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Paper variant="outlined" className="p-6 hover:shadow-md transition-shadow bg-white!">
      <div className="flex items-start gap-4 mb-4">
        <Avatar src={avatar || undefined} sx={{ width: 64, height: 64 }}>
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </Avatar>
        <div className="flex-1 min-w-0">
          <Typography variant="h6" className="font-semibold line-clamp-1">
            {name || "Consultant"}
          </Typography>
          {consultant.jobTitle && (
            <Typography variant="body2" color="text.secondary">
              {consultant.jobTitle}
            </Typography>
          )}
          {consultant.rating && (
            <div className="flex items-center gap-1 mt-1">
              <Iconify icon="solar:star-bold" className="text-yellow-500" fontSize={16} />
              <Typography variant="body2">{consultant.rating.toFixed(1)}</Typography>
            </div>
          )}
        </div>
      </div>

      {consultant.areaOfExpertise && consultant.areaOfExpertise.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {consultant.areaOfExpertise.slice(0, 3).map((expertise: string, idx: number) => (
            <Chip key={idx} label={expertise} size="small" variant="soft" />
          ))}
          {consultant.areaOfExpertise.length > 3 && (
            <Chip
              label={`+${consultant.areaOfExpertise.length - 3}`}
              size="small"
              variant="outlined"
            />
          )}
        </div>
      )}

      {consultant.bio && (
        <Typography variant="body2" color="text.secondary" className="line-clamp-2 mb-4">
          {consultant.bio}
        </Typography>
      )}

      <div className="flex gap-2">
        <Button variant="outlined" size="small" onClick={onViewDetails} fullWidth>
          View Details
        </Button>
        <Button variant="contained" size="small" onClick={onAssign} fullWidth>
          Assign
        </Button>
      </div>
    </Paper>
  );
};

interface AssignConsultantDialogProps {
  open: boolean;
  onClose: () => void;
  consultantId: string;
}

const AssignConsultantDialog = ({
  open,
  onClose,
  consultantId,
}: AssignConsultantDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();
  console.log({ authUser });
  const clientProfileId = authUser?.user?.activeProfile?.userProfileClient || "";
  const [assignConsultantMutation, { isLoading }] = useAssignConsultantMutation();
  const { data: consultantData } = useGetConsultantByIdQuery(
    { path: { id: consultantId } },
    { skip: !consultantId }
  );


  const consultant = consultantData?.data;

  const handleAssign = async () => {

    try {
      await assignConsultantMutation({
        data: {
          clientId: clientProfileId,
          consultantId,
        },
      }).unwrap();
      enqueueSnackbar("Consultant assigned successfully", { variant: "success" });
      onClose();
      // Optionally refresh or redirect
    } catch (error: unknown) {
      enqueueSnackbar(error?.data?.defaultMessage || "Failed to assign consultant", {
        variant: "error",
      });
    }
  };

  if (!consultant) {
    return null;
  }

  const user = consultant.userProfile?.user;
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Assign Consultant</DialogTitle>
      <DialogContent>
        <DialogContentText className="mb-4">
          Are you sure you want to assign this consultant to your profile?
        </DialogContentText>
        <Paper variant="outlined" className="p-4 bg-white!">
          <div className="flex items-center gap-4">
            <Avatar src={user?.avatar || undefined} sx={{ width: 56, height: 56 }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold">
                {name || "Consultant"}
              </Typography>
              {consultant.jobTitle && (
                <Typography variant="body2" color="text.secondary">
                  {consultant.jobTitle}
                </Typography>
              )}
            </div>
          </div>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleAssign} variant="contained" disabled={isLoading}>
          {isLoading ? "Assigning..." : "Assign Consultant"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Consultants;

