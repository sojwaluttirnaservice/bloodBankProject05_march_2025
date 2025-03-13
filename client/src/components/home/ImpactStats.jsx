import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const ImpactStats = () => {
    // Hardcoded statistics (Replace with API data if needed)
    const stats = [
        {
            icon: <LocalHospitalIcon fontSize="large" />,
            label: 'Blood Banks Connected',
            value: '200+',
        },
        { icon: <PeopleIcon fontSize="large" />, label: 'Registered Users', value: '5,000+' },
        { icon: <FavoriteIcon fontSize="large" />, label: 'Lives Saved', value: '10,000+' },
        {
            icon: <BloodtypeIcon fontSize="large" />,
            label: 'Blood Requests Fulfilled',
            value: '8,500+',
        },
    ];

    return (
        <Box
            sx={{
                py: 6,
                px: 4,
                backgroundColor: '#f8f9fa',
                textAlign: 'center',
            }}>
            <Typography variant="h4" fontWeight="bold" color="error" mb={4}>
                Our Impact So Far
            </Typography>

            {/* Manually Styled Flex Layout */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    maxWidth: '1100px',
                    mx: 'auto',
                }}>
                {stats.map((stat, index) => (
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
                            width: { xs: '100%', sm: '48%', md: '22%' }, // Responsive sizing
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
                                {stat.icon}
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                {stat.value}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {stat.label}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ImpactStats;
