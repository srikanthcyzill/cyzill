import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, Button } from '@mui/material';

const AddAdminForm = ({ adminData, handleChange, handleCreateAdmin }) => {
    return (
        <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" align="left" gutterBottom>
                    Add Admin
                </Typography>
                <form autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={adminData.role}
                                    onChange={handleChange}
                                    label="Role"
                                >
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"worker"}>Worker</MenuItem>
                                    <MenuItem value={"manager"}>Manager</MenuItem>
                                    {/* Add more roles as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                label="Name"
                                fullWidth
                                value={adminData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                type="email"
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={adminData.email}
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
                                value={adminData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleCreateAdmin} variant="contained" color="primary" fullWidth>
                                Add Admin
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default AddAdminForm;
