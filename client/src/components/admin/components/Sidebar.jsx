import React from "react";
import {
    Box,
    Divider,
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
import { MdOutlineHouse, MdOutlineChevronLeft, MdChevronRight, MdHome, MdGroups, MdReceipt, MdOutlinePublic, MdPointOfSale, MdOutlineToday, MdCalendarMonth, MdAdminPanelSettings, MdOutlineTrendingUp, MdPieChart, MdOutlineRealEstateAgent } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
    {
        text: "Dashboard",
        icon: <MdHome />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Properties",
        icon: <MdOutlineHouse />,
    },
    {
        text: "Customers",
        icon: <MdGroups />,
    },
    {
        text: "Transactions",
        icon: <MdReceipt />,
    },
    {
        text: "Agents",
        icon: <MdOutlineRealEstateAgent />,
    },
    {
        text: "Geography",
        icon: <MdOutlinePublic />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <MdPointOfSale />,
    },
    {
        text: "Daily",
        icon: <MdOutlineToday />,
    },
    {
        text: "Monthly",
        icon: <MdCalendarMonth />,
    },
    {
        text: "Breakdown",
        icon: <MdPieChart />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <MdAdminPanelSettings />,
    },
    {
        text: "Performance",
        icon: <MdOutlineTrendingUp />,
    },
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
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={() => {
                                            const newPath = `/admin/dashboard/${lcText}`;
                                            navigate(newPath);
                                            setActive(lcText);
                                        }}

                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <MdChevronRight sx={{ ml: "auto" }} />
                                            )}
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
