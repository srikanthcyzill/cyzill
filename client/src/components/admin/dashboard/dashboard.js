import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AllUsers from '../components/AllUsers';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Dashboard = ({ children }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} onClose={handleDrawerToggle}>
                <Sidebar />
            </Drawer>
        </div >
    );
}

export default Dashboard;
