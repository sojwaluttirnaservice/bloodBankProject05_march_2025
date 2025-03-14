import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import BloodBankLayout from './BloodBankLayout';
import DefaultLayout from './DefaultLayout';

const Layout = () => {
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const bloodBank = useSelector((state) => state.bloodBank);

    // Memoize layout selection to prevent unnecessary re-renders
    const selectedLayout = useMemo(() => {
        if (admin?.isAuthenticated && admin?.role === 'admin' && admin?.token) {
            return <AdminLayout />;
        }
        if (bloodBank?.isAuthenticated && bloodBank?.role === 'bloodBank' && bloodBank?.token) {
            return <BloodBankLayout />;
        }
        if (user?.isAuthenticated && user?.role === 'user' && user?.token) {
            return <UserLayout />;
        }
        return <DefaultLayout />;
    }, [user, admin, bloodBank]);

    return selectedLayout;
};

export default Layout;
