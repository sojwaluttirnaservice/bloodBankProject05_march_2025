import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    // About Section Data
    const highlights = [
        {
            icon: <BloodtypeIcon fontSize="large" />,
            title: 'Reliable Blood Donation',
            desc: 'Connecting donors with those in need efficiently and safely.',
        },
        {
            icon: <PeopleIcon fontSize="large" />,
            title: 'Community Driven',
            desc: 'A network of volunteers, hospitals, and blood banks working together.',
        },
        {
            icon: <FavoriteIcon fontSize="large" />,
            title: 'Saving Lives',
            desc: 'Thousands of successful donations leading to saved lives.',
        },
    ];

    return (
        <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
            {/* Header Section */}
            <Typography variant="h3" fontWeight="bold" color="error" mb={3}>
                About Our Blood Bank Initiative
            </Typography>
            <Typography variant="h6" color="textSecondary" maxWidth="800px" mx="auto" mb={4}>
                We are a platform dedicated to bridging the gap between blood donors and recipients.
                Our mission is to make blood donation **accessible, fast, and secure** for everyone.
            </Typography>

            {/* Highlight Cards */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    maxWidth: '1100px',
                    mx: 'auto',
                }}>
                {highlights.map((item, index) => (
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
                            width: { xs: '100%', sm: '48%', md: '30%' },
                        }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: 'error.main',
                                    mb: 2,
                                }}>
                                {item.icon}
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                {item.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {item.desc}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Call-to-Action Section */}
            <Box mt={6}>
                <Typography variant="h5" fontWeight="bold" color="error" mb={2}>
                    Ready to Make a Difference?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#D32F2F',
                            '&:hover': { backgroundColor: '#B71C1C' },
                        }}
                        onClick={() => navigate('/donate')}>
                        Become a Donor
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#D32F2F',
                            borderColor: '#D32F2F',
                            '&:hover': { backgroundColor: 'rgba(211,47,47,0.1)' },
                        }}
                        onClick={() => navigate('/search')}>
                        Find Blood
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutPage;
