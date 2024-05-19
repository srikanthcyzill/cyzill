import React from 'react';
import { Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@nextui-org/react';

const AdminDataGrid = ({ admins, handleDeleteAdmin }) => {
    return (
        <Grid item xs={12}>
            <Paper elevation={3}>
                <DataGrid
                    rows={admins.map((admin) => ({
                        ...admin,
                        id: admin._id,
                        createdAt: new Date(admin.createdAt).toLocaleDateString(),
                        updatedAt: new Date(admin.updatedAt).toLocaleTimeString(),
                        pages: admin.pages.join(', ')
                    }))}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'roles', headerName: 'Role', width: 130 },
                        { field: 'name', headerName: 'Name', width: 130 },
                        { field: 'email', headerName: 'Email', width: 200 },
                        { field: 'createdAt', headerName: 'Date Joined', width: 150 },
                        { field: 'updatedAt', headerName: 'Time Updated', width: 150 },
                        { field: 'pages', headerName: 'Pages', width: 200 },
                        {
                            field: 'delete',
                            headerName: 'Delete',
                            sortable: false,
                            width: 100,
                            disableClickEventBubbling: true,
                            renderCell: (params) => {
                                return <Button variant="contained" color="secondary" onClick={() => handleDeleteAdmin(params.row.id)}>Delete</Button>;
                            }
                        }
                    ]}
                    pageSize={5}
                />
            </Paper>
        </Grid>
    );
};

export default AdminDataGrid;
