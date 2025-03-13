import React, { useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, Box, Grid, CircularProgress } from '@mui/material';
import {
    Group as UsersIcon,
    Business as BloodBankIcon,
    Assignment as OrdersIcon,
    CheckCircle as CompletedIcon,
    HourglassEmpty as PendingIcon,
    Cancel as RejectedIcon,
    LocalHospital as UrgentIcon,
    Timer as NormalIcon,
    Inventory as StockIcon,
    MonetizationOn as RevenueIcon,
} from '@mui/icons-material';

const AdminDashboardPage = () => {
    const [adminStats, setAdminStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch Admin Dashboard Stats
    const fetchAdminStats = async () => {
        try {
            const { data: resData } = await instance.get('/stats/admin');

            if (resData.success) {
                setAdminStats(resData.data.adminStats[0]);
            } else {
                toast.warning(resData.message || 'No data found.');
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Failed to load stats.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminStats();
    }, []);

    return (
        <Box
            sx={{
                maxWidth: '90%',
                mx: 'auto',
                mt: 4,
                p: 4,
                borderRadius: 2,
                background: '#fff',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                color: '#333',
            }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="error">
                Blood Bank Admin Dashboard
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="250px">
                    <CircularProgress size={50} sx={{ color: 'error.main' }} />
                </Box>
            ) : (
                adminStats && (
                    <Grid container spacing={3}>
                        {/* Stat Cards */}
                        {[
                            {
                                icon: <UsersIcon />,
                                title: 'Total Users',
                                value: adminStats.total_users,
                            },
                            {
                                icon: <BloodBankIcon />,
                                title: 'Total Blood Banks',
                                value: adminStats.total_blood_banks,
                            },
                            {
                                icon: <OrdersIcon />,
                                title: 'Total Orders',
                                value: adminStats.total_orders,
                            },
                            {
                                icon: <CompletedIcon />,
                                title: 'Completed Orders',
                                value: adminStats.completed_orders,
                                color: 'success',
                            },
                            {
                                icon: <PendingIcon />,
                                title: 'Pending Orders',
                                value: adminStats.pending_orders,
                                color: 'warning',
                            },
                            {
                                icon: <RejectedIcon />,
                                title: 'Rejected Orders',
                                value: adminStats.rejected_orders,
                                color: 'error',
                            },
                            {
                                icon: <UrgentIcon />,
                                title: 'Urgent Orders',
                                value: adminStats.urgent_orders,
                                color: 'secondary',
                            },
                            {
                                icon: <NormalIcon />,
                                title: 'Normal Orders',
                                value: adminStats.normal_orders,
                                color: 'primary',
                            },
                            {
                                icon: <StockIcon />,
                                title: 'Blood Stock Available',
                                value: `${adminStats.total_blood_stock_available} units`,
                                color: 'error',
                            },
                            {
                                icon: <RevenueIcon />,
                                title: 'Total Revenue',
                                value: `₹${adminStats.total_revenue_generated}`,
                                color: 'info',
                            },
                            {
                                icon: <RevenueIcon />,
                                title: 'Money Spent by Users',
                                value: `₹${adminStats.total_money_spent_by_users}`,
                                color: 'info',
                            },
                        ].map((stat, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <StatCard {...stat} />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Box>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, color = 'error' }) => {
    return (
        <Card
            sx={{
                boxShadow: 2,
                borderRadius: 2,
                background: '#fff',
                transition: '0.3s',
                '&:hover': { boxShadow: 5, transform: 'scale(1.03)' },
                color: '#333',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Box
                    sx={{
                        backgroundColor: `${color}.light`,
                        p: 1.5,
                        borderRadius: '50%',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '48px',
                        minHeight: '48px',
                    }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="textPrimary">
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="error">
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AdminDashboardPage;
