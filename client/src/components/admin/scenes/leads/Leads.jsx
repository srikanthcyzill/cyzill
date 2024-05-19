import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetLeadsQuery, useDeleteLeadMutation, useUpdateLeadStatusMutation } from "../../state/api";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import Switch from '@mui/material/Switch';

const Leads = () => {
    const { data: leads, isLoading, refetch } = useGetLeadsQuery();
    const [deleteLead] = useDeleteLeadMutation();
    const [updateLeadStatus] = useUpdateLeadStatusMutation();

    const handleDelete = async (id) => {
        try {
            await deleteLead(id);
            refetch();
        } catch (err) {
            console.error('Error deleting lead:', err);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
            await updateLeadStatus({ id, status: newStatus });
            refetch();
        } catch (err) {
            console.error('Error updating lead status:', err);
        }
    };
    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "message", headerName: "Message", flex: 2 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <Switch
                    checked={params.value === 'solved'}
                    onChange={() => handleStatusChange(params.row._id, params.value)}
                    color="success"
                />
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => <button className='text-red-600' onClick={() => handleDelete(params.row._id)}>Delete</button>,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="LEADS" subtitle="List of Leads" />
            <Box mt="40px" height="75vh">
                <DataGrid
                    loading={isLoading || !leads}
                    getRowId={(row) => row._id}
                    rows={leads || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Leads;
