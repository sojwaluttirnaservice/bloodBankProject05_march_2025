import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { H2, H5 } from '../headings/headings';
import { instance } from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';

const BloodStockForm = ({ handleFetchBloodBankDetails }) => {
    const bloodBank = useSelector((state) => state.bloodBank);

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (updatedData) => {
        try {
            const { data: resData } = await instance.post('/blood-banks/price', updatedData);

            let { success, message } = resData;

            if (success) {
                toast.success(message);
                handleFetchBloodBankDetails();
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to update the price');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-2 p-2 bg-white border shadow-md rounded-lg">
            <H5>Update price information</H5>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                    {/* Blood Type */}
                    <div className="flex-1">
                        <label className="block text-gray-700 font-semibold mb-1">Blood Type</label>
                        <select
                            {...register('blood_type', { required: 'Blood type is required' })}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        {errors.blood_type && (
                            <p className="text-red-500 text-xs mt-1">{errors.blood_type.message}</p>
                        )}
                    </div>

                    {/* Price Per Unit */}
                    <div className="flex-1">
                        <label className="block text-gray-700 font-semibold mb-1">
                            New Price Per Unit (₹)
                        </label>
                        <input
                            type="number"
                            {...register('price_per_unit', {
                                required: 'Price is required',
                                min: { value: 1, message: 'Price must be at least ₹1' },
                            })}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Enter price"
                        />
                        {errors.price_per_unit && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.price_per_unit.message}
                            </p>
                        )}
                    </div>

                    {/* Hidden Blood Bank ID */}
                    <input type="hidden" {...register('blood_bank_id_fk')} value={bloodBank.id} />
                </div>
                <div className="mt-3 text-center">
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BloodStockForm;
