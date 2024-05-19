import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import AddAdminForm from './AddAdminForm';
import AdminDataGrid from './AdminDataGrid';
import { useGetAdminsQuery, useCreateAdminMutation, useDeleteAdminMutation } from '../../state/api';

const Admins = () => {
    const { data: admins = [], isLoading, isError } = useGetAdminsQuery();
    const [adminData, setAdminData] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        pages: [],
    });
    const [, setSelectedAdmin] = useState(null);
    const [deleteAdminMutation] = useDeleteAdminMutation();
    useEffect(() => {
    }, []);

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const [createAdmin] = useCreateAdminMutation();

    const handleCreateAdmin = async () => {
        try {
            await createAdmin(adminData);
            alert('Admin created successfully');
        } catch (error) {
            alert(`Error creating admin: ${error.message}`);
        }
    };


    const handleDeleteAdmin = (id) => {
        console.log("Deleting admin with id:", id);
        console.log("deleteAdminMutation:", deleteAdminMutation);
        try {
            deleteAdminMutation(id);
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
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
            <AdminDataGrid admins={admins} handleDeleteAdmin={handleDeleteAdmin} />
        </Grid>
    );
};

export default Admins;
