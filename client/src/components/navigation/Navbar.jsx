import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { onLogout } from '../../redux/slices/userSlice';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const Navbar = () => {
    const user = useSelector((state) => state.user); // Get user state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(onLogout());
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'rgba(255, 255, 255, 0.2)', // Glass effect background
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                px: 4, // Horizontal padding
            }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left Side - Logo */}
                <Box display="flex" alignItems="center" gap={1}>
                    <BloodtypeIcon sx={{ fontSize: 30, color: '#D32F2F' }} />
                    <Typography
                        variant="h6"
                        component={NavLink}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: '#D32F2F',
                            fontWeight: 'bold',
                        }}>
                        Blood Bank
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                    {[
                        { to: '/search', label: 'Find Blood' },
                        {
                            to: '/requests',
                            label: 'Blood Requests',
                            isHidden: !user.isAuthenticated,
                        },
                        { to: '/about', label: 'About' },
                        { to: '/contact', label: 'Contact' },
                    ].map((item, index) => (
                        <Button
                            key={index}
                            component={NavLink}
                            to={item.to}
                            className={`${item.isHidden ? '!hidden' : ''}`}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                color: 'black',
                                position: 'relative',
                                '&:hover': { color: '#D32F2F' },
                                '&.active::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: '-2px',
                                    width: '100%',
                                    height: '3px',
                                    backgroundColor: '#D32F2F',
                                },
                            }}>
                            {item.label}
                        </Button>
                    ))}
                </Box>

                {/* Right Side - User Authentication */}
                {user.isAuthenticated ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#D32F2F' }}>
                            {user.full_name}
                        </Typography>
                        <IconButton color="error" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/auth/user"
                        startIcon={<PersonIcon />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: '#D32F2F',
                        }}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
