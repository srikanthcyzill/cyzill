import React from "react";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import { MdOutlineHouse, MdOutlineChevronLeft, MdChevronRight, MdHome, MdGroups, MdReceipt, MdPointOfSale, MdOutlineToday, MdCalendarMonth, MdAdminPanelSettings, MdOutlineTrendingUp, MdPieChart, MdOutlineRealEstateAgent, MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
    { text: "Dashboard", path: "dashboard", icon: <MdHome /> },
    { text: "Client Facing", path: "clientfacing", icon: null },
    { text: "Properties", path: "properties", icon: <MdOutlineHouse /> },
    { text: "Customers", path: "customers", icon: <MdGroups /> },
    { text: "Transactions", path: "transactions", icon: <MdReceipt /> },
    { text: "Agents", path: "agents", icon: <MdOutlineRealEstateAgent /> },
    { text: "Leads", path: "leads", icon: <MdEmail /> },
    { text: "Sales", path: "sales", icon: null },
    { text: "Overview", path: "overview", icon: <MdPointOfSale /> },
    { text: "Daily", path: "daily", icon: <MdOutlineToday /> },
    { text: "Monthly", path: "monthly", icon: <MdCalendarMonth /> },
    { text: "Breakdown", path: "breakdown", icon: <MdPieChart /> },
    { text: "Management", path: "management", icon: null },
    { text: "Admin", path: "admin", icon: <MdAdminPanelSettings /> },
    { text: "Performance", path: "performance", icon: <MdOutlineTrendingUp /> },
    { text: "Editor", path: "editor", icon: null },
    { text: "Pages", path: "pages", icon: <MdOutlineTrendingUp /> },
    { text: "Admin Pages", path: "adminpages", icon: <MdOutlineTrendingUp /> },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        Cyzill
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <MdOutlineChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, path, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                const newPath = `/admin/dashboard/${path}`;
                                                navigate(newPath);
                                                setActive(path);
                                            }}
                                            sx={{
                                                backgroundColor: active === path ? theme.palette.secondary[300] : "transparent",
                                                color: active === path ? theme.palette.primary[600] : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color: active === path ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === path && <MdChevronRight sx={{ ml: "auto" }} />}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
