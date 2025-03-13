import React from 'react';
import { Card, CardContent, Typography, Box, Button, Divider, Chip } from '@mui/material';
import {
    LocalHospital as LocalHospitalIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationOnIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Inventory as InventoryIcon,
    ListAlt as ListAltIcon,
    MonetizationOn as MonetizationOnIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

const BloodBankDetailsCard = ({ bloodBank }) => {
    const navigate = useNavigate();
    return (
        <Card
            sx={{
                maxWidth: 420,
                backgroundColor: '#f9fafb',
                boxShadow: 5,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 8 },
            }}>
            <CardContent>
                {/* Blood Bank Header */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    pb={2}
                    borderBottom={1}
                    borderColor="grey.300">
                    <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="primary.dark">
                            {bloodBank.name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Blood Bank
                        </Typography>
                    </Box>
                </Box>

                {/* Blood Bank Details */}
                <Box mt={2} display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <EmailIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Email:</strong> {bloodBank.email || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <PhoneIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Phone:</strong> {bloodBank.phone || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Location:</strong> {bloodBank.state || 'N/A'},{' '}
                            {bloodBank.district || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        {bloodBank.verified ? (
                            <CheckCircleIcon fontSize="small" sx={{ color: 'green' }} />
                        ) : (
                            <CancelIcon fontSize="small" sx={{ color: 'red' }} />
                        )}
                        <Typography variant="body2">
                            <strong>Verified:</strong> {bloodBank.verified ? 'Yes' : 'No'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                            label={bloodBank.availability_status ? 'Available' : 'Unavailable'}
                            color={bloodBank.availability_status ? 'success' : 'error'}
                            variant="outlined"
                        />
                    </Box>
                </Box>

                {/* Divider */}
                <Divider sx={{ my: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }} />

                {/* Blood Bank Stats */}
                <Box mt={1} display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <InventoryIcon fontSize="small" color="secondary" />
                        <Typography variant="body2">
                            <strong>Total Blood Stock:</strong> {bloodBank.total_blood_stock || 0}{' '}
                            units
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <ListAltIcon fontSize="small" color="success" />
                        <Typography variant="body2">
                            <strong>Requests Handled:</strong> {bloodBank.total_requests || 0}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <MonetizationOnIcon fontSize="small" color="warning" />
                        <Typography variant="body2">
                            <strong>Total Revenue:</strong> ₹{bloodBank.total_revenue || 0}
                        </Typography>
                    </Box>
                </Box>

                {/* Button to View Blood Stock */}
                <Box mt={3} textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        // onClick={() => onViewStock(bloodBank.id)}
                        onClick={() => navigate(`/requests/bb/${bloodBank.id}`)}>
                        View Requests
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BloodBankDetailsCard;
