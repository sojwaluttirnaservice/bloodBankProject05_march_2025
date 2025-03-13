import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                height: '80vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                overflow: 'hidden', // Prevents any unwanted scrolling
            }}>
            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('https://images.unsplash.com/photo-1603398938378-70c44b288c3b')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    zIndex: -2, // Ensures it stays behind everything
                }}
            />

            {/* Dark Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
                    zIndex: -1, // Ensures overlay stays behind text
                }}
            />

            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '800px', color: '#fff' }}>
                <Typography variant="h3" fontWeight="bold">
                    Find Blood | Save Lives
                </Typography>
                <Typography variant="h6" mt={2} sx={{ opacity: 0.9 }}>
                    Join our network of donors and blood banks to make a difference. Every drop
                    counts!
                </Typography>

                {/* CTA Buttons */}
                <Box mt={4} display="flex" gap={3} flexWrap="wrap" justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: '#D32F2F',
                            '&:hover': { backgroundColor: '#B71C1C' },
                        }}
                        onClick={() => navigate('/search')}>
                        Find Blood
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            color: '#fff',
                            borderColor: '#fff',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                        onClick={() => navigate('/donate')}>
                        Donate Now
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
