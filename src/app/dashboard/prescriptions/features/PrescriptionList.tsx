"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
    IconButton,
    Link,
    TablePagination,
    Box,
    CircularProgress
} from "@mui/material";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { useGetPrescriptionsQuery, Prescription } from "apis/prescription-api";

const StatusChip = ({ status }: { status: string }) => {
    let color: "default" | "warning" | "success" | "error" = "default";

    switch (status) {
        case "PENDING":
            color = "warning";
            break;
        case "APPROVED":
            color = "success";
            break;
        case "REJECTED":
            color = "error";
            break;
    }

    return (
        <Chip
            label={status}
            color={color}
            size="small"
            sx={{ fontWeight: "bold", minWidth: 80 }}
        />
    );
};

export default function PrescriptionList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data, isLoading, isError } = useGetPrescriptionsQuery({
        params: {
            skip: page * rowsPerPage,
            take: rowsPerPage
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (isLoading) {
        return (
            <Box className="flex justify-center p-10">
                <CircularProgress />
            </Box>
        )
    }

    if (isError || !data?.data) {
        return (
            <Box className="flex flex-col items-center justify-center p-10 text-center">
                <Icon icon="solar:danger-circle-linear" fontSize={48} className="text-red-400 mb-2" />
                <Typography color="text.secondary">Failed to load prescriptions.</Typography>
            </Box>
        )
    }

    const prescriptions = data.data.data;
    const count = data.data.totalRecords;

    if (prescriptions.length === 0) {
        return (
            <Box className="flex flex-col items-center justify-center p-16 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <Icon icon="solar:document-medicine-linear" fontSize={48} className="text-gray-400 mb-2" />
                <Typography variant="h6" className="text-gray-600">No prescriptions found</Typography>
                <Typography variant="body2" color="text.secondary">
                    Upload a new prescription to get started.
                </Typography>
            </Box>
        )
    }

    return (
        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File</TableCell>
                            <TableCell>Date Uploaded</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prescriptions.map((row: Prescription) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                                            <Icon icon="solar:file-text-linear" fontSize={20} />
                                        </div>
                                        <Typography variant="body2" className="max-w-[150px] truncate" title={row.fileUrl}>
                                            Document
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(row.createdAt), 'MMM dd, yyyy')}
                                </TableCell>
                                <TableCell>
                                    {row.patientName || "N/A"}
                                </TableCell>
                                <TableCell>
                                    <StatusChip status={row.status} />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton LinkComponent={Link} href={row.fileUrl} target="_blank" size="small" title="View File">
                                        <Icon icon="solar:eye-linear" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
