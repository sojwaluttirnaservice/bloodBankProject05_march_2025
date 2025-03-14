import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserSignup from './UserSignup';
import BloodBankSignup from './BloodBankSignup';

const SignupPage = () => {
    const [signupType, setSignupType] = useState('user');

    // Get login states from Redux
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const bloodBank = useSelector((state) => state.bloodBank);

    // Check if any role is already logged in
    const isUserLoggedIn = user?.isAuthenticated && user?.role === 'user';
    const isAdminLoggedIn = admin?.isAuthenticated && admin?.role === 'admin';
    const isBloodBankLoggedIn = bloodBank?.isAuthenticated && bloodBank?.role === 'bloodBank';

    // Memoized redirect logic to avoid unnecessary re-renders
    const redirectComponent = useMemo(() => {
        if (isUserLoggedIn) return <Navigate to="/" />;
        if (isAdminLoggedIn) return <Navigate to="/admin/dashboard" />;
        if (isBloodBankLoggedIn) return <Navigate to="/blood-banks/dashboard" />;
        return null; // Ensure it always returns a value
    }, [isUserLoggedIn, isAdminLoggedIn, isBloodBankLoggedIn]);

    // If redirect condition is met, return the redirect component

    // Memoize the signup component to prevent unnecessary re-renders
    const signupComponent = useMemo(() => {
        return signupType === 'user' ? <UserSignup /> : <BloodBankSignup />;
    }, [signupType]);

    if (redirectComponent) return redirectComponent;
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white border shadow-md rounded-lg mb-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

            {/* Toggle Between User & Blood Bank Signup */}
            <div className="flex justify-center mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="user"
                        checked={signupType === 'user'}
                        onChange={() => setSignupType('user')}
                        className="hidden"
                    />
                    <span
                        className={`px-4 py-2 rounded-full transition ${
                            signupType === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}>
                        Sign up as User
                    </span>
                </label>

                <label className="flex items-center gap-2 ml-4 cursor-pointer">
                    <input
                        type="radio"
                        value="bloodBank"
                        checked={signupType === 'bloodBank'}
                        onChange={() => setSignupType('bloodBank')}
                        className="hidden"
                    />
                    <span
                        className={`px-4 py-2 rounded-full transition ${
                            signupType === 'bloodBank' ? 'bg-red-600 text-white' : 'bg-gray-200'
                        }`}>
                        Sign up as Blood Bank
                    </span>
                </label>
            </div>

            {/* Render Selected Signup Component */}
            {signupComponent}
        </div>
    );
};

export default SignupPage;
