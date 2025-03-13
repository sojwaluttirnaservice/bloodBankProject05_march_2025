import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import BloodBankLayout from './BloodBankLayout';
import DefaultLayout from './DefaultLayout';

const Layout = () => {
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const bloodBank = useSelector((state) => state.bloodBank);

    if (user && user.role === 'user' && user.token && user.isAuthenticated) {
        return <UserLayout />;
    } else if (admin && admin.role === 'admin' && admin.token && admin.isAuthenticated) {
        return <AdminLayout />;
    } else if (
        bloodBank &&
        bloodBank.role === 'bloodBank' &&
        bloodBank.token &&
        bloodBank.isAuthenticated
    ) {
        return <BloodBankLayout />;
    } else {
        return <DefaultLayout />;
    }
};

export default Layout;
