import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Button, Divider } from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationOnIcon,
    Badge as BadgeIcon,
    CalendarToday as CalendarTodayIcon,
    Receipt as ReceiptIcon,
    MonetizationOn as MonetizationOnIcon,
    ListAlt as ListAltIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router';

const UserDetailsCard = ({ user }) => {
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
                {/* User Header */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    pb={2}
                    borderBottom={1}
                    borderColor="grey.300">
                    <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
                        <PersonIcon sx={{ fontSize: 34, color: 'white' }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="primary.dark">
                            {user.full_name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user.user_type === 'person' ? 'Individual' : 'Hospital'}
                        </Typography>
                    </Box>
                </Box>

                {/* User Details */}
                <Box mt={2} display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <EmailIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Email:</strong> {user.email || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <PhoneIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Phone:</strong> {user.phone || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Location:</strong> {user.state || 'N/A'},{' '}
                            {user.district || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <BadgeIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>User Type:</strong> {user.user_type || 'N/A'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarTodayIcon fontSize="small" color="primary" />
                        <Typography variant="body2">
                            <strong>Joined:</strong>{' '}
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </Typography>
                    </Box>
                </Box>

                {/* Divider */}
                <Divider sx={{ my: 2 }} />

                {/* User Stats */}
                <Box mt={1} display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ListAltIcon fontSize="small" color="secondary" />
                        <Typography variant="body2">
                            <strong>Total Requests:</strong> {user.total_requests || 0}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <ReceiptIcon fontSize="small" color="success" />
                        <Typography variant="body2">
                            <strong>Completed Requests:</strong> {user.completed_requests || 0}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <MonetizationOnIcon fontSize="small" color="warning" />
                        <Typography variant="body2">
                            <strong>Total Spent:</strong> ₹{user.total_amount_spent || 0}
                        </Typography>
                    </Box>
                </Box>

                {/* Button to View Requests */}
                <Box mt={3} textAlign="center">
                    <Button
                        onClick={() => {
                            navigate(`/requests/u/${user.id}`);
                        }}
                        variant="contained"
                        color="primary"
                        fullWidth>
                        View Requests
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserDetailsCard;
