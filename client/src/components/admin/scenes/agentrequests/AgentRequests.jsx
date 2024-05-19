import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetAgentRequestsQuery, useUpdateUserMutation } from "../../state/api";
import Header from "../../components/Header";
import { Box, Switch } from "@mui/material";

const AgentRequests = () => {
    const { data: agentRequests, isLoading } = useGetAgentRequestsQuery();
    const [updateUser] = useUpdateUserMutation();

    const handleToggleAgentStatus = async (id, isAgent) => {
        try {
            await updateUser({ id, userType: isAgent ? 'agent' : 'user' });
        } catch (error) {
            console.error('Error toggling agent status:', error);
        }
    };

    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phoneNumber", headerName: "Phone Number", flex: 0.5 },
        {
            field: "isAgent",
            headerName: "Agent Status",
            flex: 0.5,
            renderCell: (params) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggleAgentStatus(params.row._id, params.value)}
                />
            ),
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="AGENT REQUESTS" subtitle="List of Agent Requests" />
            <Box mt="40px" height="75vh">
                <DataGrid
                    loading={isLoading || !agentRequests}
                    getRowId={(row) => row._id}
                    rows={agentRequests || []}
                    columns={columns}
                    checkboxSelection
                />
            </Box>
        </Box>
    );
};

export default AgentRequests;
