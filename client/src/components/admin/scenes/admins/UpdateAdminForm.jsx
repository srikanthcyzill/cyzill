import React from 'react';
import { Grid, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UpdateAdminForm = ({ selectedAdmin, admins, handleChange, handleUpdateAdmin }) => {
    return (
        <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" align="left" gutterBottom>
                    Update Admin
                </Typography>
                <form autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="email-label">Email</InputLabel>
                                <Select
                                    labelId="email-label"
                                    id="email"
                                    name="email"
                                    value={selectedAdmin ? selectedAdmin.email : ''}
                                    onChange={handleChange}
                                    label="Email"
                                >
                                    {admins.map(admin => (
                                        <MenuItem key={admin.id} value={admin.email}>{admin.email}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                label="Name"
                                fullWidth
                                value={selectedAdmin ? selectedAdmin.name : ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                type="password"
                                variant="outlined"
                                label="Password"
                                fullWidth
                                value={selectedAdmin ? selectedAdmin.password : ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleUpdateAdmin} variant="contained" color="primary" fullWidth>
                                Update Admin
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default UpdateAdminForm;
