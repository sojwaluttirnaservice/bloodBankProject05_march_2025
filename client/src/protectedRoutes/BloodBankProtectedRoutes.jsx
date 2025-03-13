import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const BloodBankProtectedRoutes = ({ children }) => {
    const bloodBank = useSelector((state) => state.bloodBank);

    // Corrected condition to check if the user is not authenticated or not a blood bank
    if (!bloodBank || !bloodBank.isAuthenticated || bloodBank.role !== 'bloodBank') {
        return <Navigate to="/auth/blood-bank" replace />;
    }

    return <>{children}</>;
};

export default BloodBankProtectedRoutes;
