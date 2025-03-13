import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from '../../axiosInstance/axiosInstance';

const AddBloodStockForm = ({ handleFetchBloodBankDetails }) => {
    const bloodBank = useSelector((state) => state.bloodBank);

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Append blood bank ID
            data.blood_bank_id_fk = bloodBank.id;

            const response = await instance.post('/blood-banks/stock', data);

            if (response.data.success) {
                toast.success('Blood stock added successfully!');
                reset(); // Reset form after successful submission
                handleFetchBloodBankDetails();
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to add the blood stock');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-6 p-6 bg-white border shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Blood Stock</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Blood Type */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Blood Type</label>
                    <select
                        {...register('blood_type', { required: 'Blood type is required' })}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                        <option value="">Select Blood Type</option>
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
                        <p className="text-red-500 text-sm mt-1">{errors.blood_type.message}</p>
                    )}
                </div>

                {/* Quantity */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Quantity (Units)
                    </label>
                    <input
                        type="number"
                        {...register('quantity', {
                            required: 'Quantity is required',
                            min: { value: 1, message: 'Quantity must be at least 1' },
                        })}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                    )}
                </div>

                {/* Blood Bank ID (Hidden Field) */}
                <input type="hidden" {...register('blood_bank_id_fk')} value={bloodBank.id} />

                {/* Remarks */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Remarks</label>
                    <textarea
                        {...register('remarks')}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter any remarks (optional)"
                        rows="3"></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Add Blood Stock
                </button>
            </form>
        </div>
    );
};

export default AddBloodStockForm;
