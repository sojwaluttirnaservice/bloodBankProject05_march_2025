import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchBlood = () => {
    const navigate = useNavigate();
    const [bloodType, setBloodType] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        if (bloodType && location) {
            navigate(`/search?bloodType=${bloodType}&location=${location}`);
        }
    };

    return (
        <Box
            sx={{
                py: 6,
                px: 4,
                textAlign: 'center',
                background: '#f8f9fa', // Light background for contrast
            }}>
            <Typography variant="h4" fontWeight="bold" color="error" mb={3}>
                Find Blood Near You
            </Typography>

            {/* Form Controls */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    maxWidth: '800px',
                    mx: 'auto',
                }}>
                {/* Blood Type Dropdown */}
                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel>Blood Type</InputLabel>
                    <Select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Location Dropdown */}
                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel>Location</InputLabel>
                    <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                        {[
                            'Mumbai',
                            'Delhi',
                            'Bangalore',
                            'Kolkata',
                            'Chennai',
                            'Pune',
                            'Hyderabad',
                        ].map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Search Button */}
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#D32F2F', '&:hover': { backgroundColor: '#B71C1C' } }}
                    onClick={handleSearch}
                    disabled={!bloodType || !location}>
                    Search Blood
                </Button>
            </Box>
        </Box>
    );
};

export default SearchBlood;
