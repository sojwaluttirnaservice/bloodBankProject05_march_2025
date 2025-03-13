import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoutes = ({ children }) => {
    const user = useSelector((state) => state.user);

    // Corrected condition to check if the user is authenticated and has the correct role
    if (!user || !user.isAuthenticated || user.role !== 'user') {
        return <Navigate to="/auth/user" replace />;
    }

    return <>{children}</>;
};

export default UserProtectedRoutes;
