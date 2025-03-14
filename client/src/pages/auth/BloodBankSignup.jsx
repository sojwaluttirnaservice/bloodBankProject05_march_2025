import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instance } from '../../axiosInstance/axiosInstance';

const BloodBankSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Watch password field for confirmPassword validation
    const password = watch('password', '');

    // Handle blood bank signup
    const onSubmit = async (data) => {
        setLoading(true); // Set loading state
        try {
            const { data: resData } = await instance.post('/blood-banks', data);
            if (resData?.success) {
                toast.success('Signup successful! Redirecting to login...');
                navigate('/auth'); // Redirect to login page
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Signup failed. Try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Blood Bank Name */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Blood Bank Name</label>
                <input
                    type="text"
                    {...register('name', { required: 'Blood bank name is required' })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter blood bank name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Enter a valid email',
                        },
                    })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                    type="tel"
                    {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Enter a valid 10-digit phone number',
                        },
                    })}
                    maxLength={10}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 4,
                            message: 'Password must be at least 4 characters',
                        },
                    })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter password"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                    })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Address Lines */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2"> Address Line</label>
                <input
                    type="text"
                    {...register('address_lines', { required: 'Address is required' })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter detailed address"
                />
                {errors.address_lines && (
                    <p className="text-red-500 text-sm">{errors.address_lines.message}</p>
                )}
            </div>

            {/* State */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">State</label>
                <input
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter state"
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>

            {/* District */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">District</label>
                <input
                    type="text"
                    {...register('district', { required: 'District is required' })}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-red-300"
                    placeholder="Enter district"
                />
                {errors.district && (
                    <p className="text-red-500 text-sm">{errors.district.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md transition ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                }`}>
                {loading ? 'Saving...' : 'Sign Up'}
            </button>
        </form>
    );
};

export default BloodBankSignup;
