import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoutes = ({ children }) => {
    const admin = useSelector((state) => state.admin);

    // Corrected condition to check if the admin is authenticated and has the correct role
    if (!admin || !admin.isAuthenticated || admin.role !== 'admin') {
        return <Navigate to="/auth/admin" replace />;
    }

    return <>{children}</>;
};

export default AdminProtectedRoutes;
