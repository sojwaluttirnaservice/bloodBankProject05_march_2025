import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { onLogout } from '../../redux/slices/bloodBankSlice';

const BloodBankSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bloodBank = useSelector((state) => state.bloodBank);

    const handleLogout = () => {
        dispatch(onLogout()); // Clear Redux state & logout
        navigate('/auth');
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#4B1C1C', // Faint red background
                    color: 'white',
                },
            }}>
            <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="text-center my-6 px-4">
                    <Typography variant="h6" fontWeight="bold">
                        {bloodBank?.name || 'Blood Bank'}
                    </Typography>
                </div>

                {/* Navigation Links */}
                <List>
                    <NavLink to="/blood-banks/dashboard" className="block">
                        {({ isActive }) => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        backgroundColor: isActive ? '#D32F2F' : 'transparent',
                                        '&:hover': { backgroundColor: '#7D2D2D' },
                                    }}>
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </NavLink>

                    <NavLink to="/requests" className="block">
                        {({ isActive }) => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        backgroundColor: isActive ? '#D32F2F' : 'transparent',
                                        '&:hover': { backgroundColor: '#7D2D2D' },
                                    }}>
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Requests" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </NavLink>

                    <NavLink to="/blood-banks/stock" className="block">
                        {({ isActive }) => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        backgroundColor: isActive ? '#D32F2F' : 'transparent',
                                        '&:hover': { backgroundColor: '#7D2D2D' },
                                    }}>
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        <InventoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Blood Stock" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </NavLink>
                </List>

                {/* Logout Button at Bottom */}
                <div className="mt-auto p-4">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#D32F2F',
                            '&:hover': { backgroundColor: '#B71C1C' },
                        }}
                        fullWidth
                        startIcon={<ExitToAppIcon />}
                        onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default BloodBankSidebar;
