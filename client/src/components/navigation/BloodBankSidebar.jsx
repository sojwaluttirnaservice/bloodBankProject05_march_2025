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
                maxWidth: '85%',
                mx: 'auto',
                mt: 4,
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #1E3A8A, #9333EA)',
                boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
                color: '#fff',
            }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                Admin Dashboard
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="250px">
                    <CircularProgress size={50} sx={{ color: '#fff' }} />
                </Box>
            ) : (
                adminStats && (
                    <Grid container spacing={2}>
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
                                color: 'green',
                            },
                            {
                                icon: <PendingIcon />,
                                title: 'Pending Orders',
                                value: adminStats.pending_orders,
                                color: 'orange',
                            },
                            {
                                icon: <RejectedIcon />,
                                title: 'Rejected Orders',
                                value: adminStats.rejected_orders,
                                color: 'red',
                            },
                            {
                                icon: <UrgentIcon />,
                                title: 'Urgent Orders',
                                value: adminStats.urgent_orders,
                                color: 'purple',
                            },
                            {
                                icon: <NormalIcon />,
                                title: 'Normal Orders',
                                value: adminStats.normal_orders,
                                color: 'blue',
                            },
                            {
                                icon: <StockIcon />,
                                title: 'Blood Stock Available',
                                value: `${adminStats.total_blood_stock_available} units`,
                                color: 'teal',
                            },
                            {
                                icon: <RevenueIcon />,
                                title: 'Total Revenue',
                                value: `₹${adminStats.total_revenue_generated}`,
                                color: 'gold',
                            },
                            {
                                icon: <RevenueIcon />,
                                title: 'Money Spent by Users',
                                value: `₹${adminStats.total_money_spent_by_users}`,
                                color: 'gold',
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
const StatCard = ({ icon, title, value, color = 'primary' }) => {
    return (
        <Card
            sx={{
                boxShadow: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
                color: '#fff',
                minHeight: '100px',
            }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        backgroundColor: color === 'gold' ? '#FFC107' : `${color}.main`,
                        p: 1.5,
                        borderRadius: '50%',
                        color: '#fff',
                    }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AdminDashboardPage;
