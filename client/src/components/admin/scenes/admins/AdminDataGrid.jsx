import React from 'react';
import { Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AdminDataGrid = ({ admins }) => {
    return (
        <Grid item xs={12}>
            <Paper elevation={3}>
                <DataGrid
                    rows={admins.map((admin) => ({ ...admin, id: admin._id }))}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'role', headerName: 'Role', width: 130 },
                        { field: 'name', headerName: 'Name', width: 130 },
                        { field: 'email', headerName: 'Email', width: 200 },
                        // More columns...
                    ]}
                    pageSize={5}
                />
            </Paper>
        </Grid>
    );
};

export default AdminDataGrid;
