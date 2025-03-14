import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const BloodBankProtectedRoutes = ({ children }) => {
    const bloodBank = useSelector((state) => state.bloodBank);

    // Memoized check to prevent unnecessary re-renders
    const isBloodBankValid = useMemo(() => {
        return bloodBank?.isAuthenticated && bloodBank?.role === 'bloodBank' && bloodBank?.token;
    }, [bloodBank]);

    if (!isBloodBankValid) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};

export default BloodBankProtectedRoutes;
