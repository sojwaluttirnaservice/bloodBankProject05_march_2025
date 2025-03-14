import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoutes = ({ children }) => {
    const admin = useSelector((state) => state.admin);

    // Memoize admin authentication check to prevent unnecessary re-renders
    const isAdminValid = useMemo(() => {
        return admin?.isAuthenticated && admin?.role === 'admin' && admin?.token;
    }, [admin]);

    if (!isAdminValid) {
        return <Navigate to="/auth/admin" replace />;
    }

    return <>{children}</>;
};

export default AdminProtectedRoutes;
