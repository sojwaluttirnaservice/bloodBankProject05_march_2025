import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instance } from '../../axiosInstance/axiosInstance';
import { onLogin } from '../../redux/slices/bloodBankSlice';

const BloodBankLogin = () => {
    const bloodBank = useSelector((state) => state.bloodBank);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: 'jupiterbb@nashik.com',
            password: '1234',
        },
    });

    // Handle login
    const onSubmit = async (data) => {
        try {
            const { data: resData } = await instance.post('/auth/blood-bank', data);

            if (resData?.success) {
                toast.success('Login successful!');
                dispatch(onLogin(resData?.data?.bloodBank));
                navigate('/blood-banks/dashboard'); // Redirect
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed.');
        }
    };

    if (bloodBank?.isAuthenticated) return <Navigate to="/blood-banks/dashboard" />;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

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

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
                Login
            </button>
        </form>
    );
};

export default BloodBankLogin;
