import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddAdminForm from './AddAdminForm';
import UpdateAdminForm from './UpdateAdminForm';
import AdminDataGrid from './AdminDataGrid';
import { useGetAdminsQuery, useCreateAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } from '../../state/api';

const Admins = () => {
    const { data: admins = [], isLoading, isError } = useGetAdminsQuery();
    const [adminData, setAdminData] = useState({
        role: '',
        name: '',
        email: '',
        password: ''
    });
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const createAdminMutation = useCreateAdminMutation();
    const updateAdminMutation = useUpdateAdminMutation();
    const deleteAdminMutation = useDeleteAdminMutation();

    useEffect(() => {
        // Fetch initial data if needed
    }, []);

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleCreateAdmin = () => {
        console.log("Creating admin...");
        console.log("createAdminMutation.mutate:", createAdminMutation.mutate);
        if (createAdminMutation.mutate) {
            createAdminMutation.mutate(adminData);
            setAdminData({
                role: '',
                name: '',
                email: '',
                password: ''
            });
        }
    };

    const handleUpdateAdmin = () => {
        console.log("Updating admin...");
        if (selectedAdmin) {
            updateAdminMutation.mutate({ id: selectedAdmin.id, updatedAdmin: adminData });
        }
    };

    const handleDeleteAdmin = (id) => {
        deleteAdminMutation.mutate(id);
    };

    const handleAdminSelect = (admin) => {
        setSelectedAdmin(admin);
        setAdminData(admin);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <Grid container spacing={2} style={{ width: '100%', padding: '20px' }}>
            <AddAdminForm
                adminData={adminData}
                handleChange={handleChange}
                handleCreateAdmin={handleCreateAdmin}
            />
            <UpdateAdminForm
                selectedAdmin={selectedAdmin} // Pass the selectedAdmin state
                admins={admins} // Pass the admins data
                handleChange={handleChange}
                handleUpdateAdmin={handleUpdateAdmin}
            />


            <AdminDataGrid admins={admins} />
        </Grid>
    );
};

export default Admins;
