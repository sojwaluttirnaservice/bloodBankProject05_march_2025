import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoutes = ({ children }) => {
    const user = useSelector((state) => state.user);

    // Memoize user authentication check to prevent unnecessary re-renders
    const isUserValid = useMemo(() => {
        return user?.isAuthenticated && user?.role === 'user';
    }, [user]);

    if (!isUserValid) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};

export default UserProtectedRoutes;
