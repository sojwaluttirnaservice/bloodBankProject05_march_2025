import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instance } from '../../axiosInstance/axiosInstance';
import { onLogin } from '../../redux/slices/userSlice'; // Assuming user slice exists
import { useDispatch, useSelector } from 'react-redux';

const UserLoginPage = () => {
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const bloodBank = useSelector((state) => state.bloodBank);

    const isUserLoggedIn = user && user.isAuthenticated && user.role == 'user' && user.token;
    const isAdminLoggedIn = admin && admin.isAuthenticated && admin.role == 'admin' && admin.token;
    const isBloodBankLoggedIn =
        bloodBank && bloodBank.isAuthenticated && bloodBank.role == 'bloodBank' && bloodBank.token;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phone: '9123000001', // Pre-filled phone for quick testing
            password: '1234', // Pre-filled password
        },
    });

    // Function to handle login
    const onSubmit = async (data) => {
        try {
            const { data: resData } = await instance.post('/auth/user', data);

            if (resData?.success) {
                toast.success('Login successful!');
                dispatch(onLogin(resData?.data?.user));
                navigate('/'); // Redirect to home page
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    if (isUserLoggedIn) {
        return <Navigate to={'/'} />;
    }
    if (isAdminLoggedIn) {
        return <Navigate to={'/admin/dashboard'} />;
    }

    if (isBloodBankLoggedIn) {
        return <Navigate to={'/blood-banks/dashboard'} />;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white border shadow-md rounded-lg mb-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Phone Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default UserLoginPage;
