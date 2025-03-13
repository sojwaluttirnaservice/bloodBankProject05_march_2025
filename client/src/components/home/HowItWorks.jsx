import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HowItWorks = () => {
    // Steps for using the platform
    const steps = [
        {
            icon: <SearchIcon fontSize="large" />,
            title: 'Find Blood',
            desc: 'Search for blood banks & donors near you.',
        },
        {
            icon: <RequestPageIcon fontSize="large" />,
            title: 'Request Blood',
            desc: 'Submit a request if you need urgent blood.',
        },
        {
            icon: <BloodtypeIcon fontSize="large" />,
            title: 'Donate Blood',
            desc: 'Register as a donor and save lives.',
        },
        {
            icon: <FavoriteIcon fontSize="large" />,
            title: 'Save Lives',
            desc: 'Your donation helps those in need.',
        },
    ];

    return (
        <Box sx={{ py: 6, px: 4, backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="error" mb={4}>
                How It Works?
            </Typography>

            {/* Steps Layout */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    maxWidth: '1100px',
                    mx: 'auto',
                }}>
                {steps.map((step, index) => (
                    <Card
                        key={index}
                        sx={{
                            textAlign: 'center',
                            py: 4,
                            px: 3,
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': { boxShadow: 6, transform: 'scale(1.05)' },
                            borderRadius: 3,
                            width: { xs: '100%', sm: '48%', md: '22%' },
                            minHeight: '170px',
                        }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mb: 2,
                                    color: 'error.main',
                                }}>
                                {step.icon}
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                {step.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {step.desc}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default HowItWorks;
