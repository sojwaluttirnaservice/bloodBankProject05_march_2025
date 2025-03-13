import React, { useEffect, useState } from 'react';
import AddBloodStockForm from '../../components/bloodBank/AddBloodStockForm';
import { instance } from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import BloodStockForm from '../../components/bloodBank/BloodStockForm';

const BloodGroupGrid = ({ bloodStocks = [] }) => {
    console.log(bloodStocks);
    const positiveBloodGroups = ['A+', 'B+', 'O+', 'AB+'];
    const negativeBloodGroups = ['A-', 'B-', 'O-', 'AB-'];

    const stockMap = Array.isArray(bloodStocks)
        ? bloodStocks.reduce((acc, { blood_type, quantity, price_per_unit }) => {
              if (blood_type) {
                  acc[blood_type] = {
                      quantity: quantity ?? 0,
                      price: price_per_unit ?? 'N/A', // Default to "N/A" if price is missing
                  };
              }
              return acc;
          }, {})
        : {};

    return (
        <div className="flex justify-center py-4">
            <div className="flex flex-col gap-2">
                {[
                    { type: '+ve', groups: positiveBloodGroups, color: 'text-red-600' },
                    { type: '-ve', groups: negativeBloodGroups, color: 'text-blue-600' },
                ].map(({ type, groups, color }) => (
                    <div key={type} className="flex items-center gap-4">
                        <h2 className={`text-xl font-bold ${color} mb-4 w-32`}>{type} Groups</h2>
                        <div className="flex items-center gap-4">
                            {groups.map((group) => (
                                <div
                                    key={group}
                                    className="w-40 flex flex-col justify-between items-center p-3 border rounded-lg bg-white text-center">
                                    <span className="text-lg font-medium">{group}</span>
                                    <span
                                        className={`text-lg font-semibold ${
                                            stockMap[group]?.quantity === 0
                                                ? 'text-red-500'
                                                : 'text-green-600'
                                        }`}>
                                        {stockMap[group]?.quantity ?? 0} units
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        ₹{stockMap[group]?.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BloodBankStockPage = () => {
    const bloodBank = useSelector((state) => state.bloodBank);
    const [bloodStocks, setBloodStocks] = useState({});
    const [activeForm, setActiveForm] = useState('addStock'); // Toggle state

    const handleFetchBloodBankDetails = async () => {
        try {
            const { data: resData } = await instance.get(`/stats/blood-banks/${bloodBank.id}`);

            let { success, message, data } = resData;

            if (success) {
                setBloodStocks(data?.bloodStocks);
            } else {
                toast.warning(message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to fetch blood bank stats');
        }
    };

    useEffect(() => {
        handleFetchBloodBankDetails();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white border shadow-md rounded-lg">
            <BloodGroupGrid bloodStocks={bloodStocks} />

            {/* Toggle Buttons for Forms */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    className={`px-4 py-2 rounded-md font-semibold ${
                        activeForm === 'addStock'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setActiveForm('addStock')}>
                    Add Blood Stock
                </button>

                <button
                    className={`px-4 py-2 rounded-md font-semibold ${
                        activeForm === 'updateStock'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setActiveForm('updateStock')}>
                    Update Blood Stock
                </button>
            </div>

            {/* Conditional Rendering of Forms */}
            <div className="mt-6">
                {activeForm === 'addStock' && (
                    <AddBloodStockForm handleFetchBloodBankDetails={handleFetchBloodBankDetails} />
                )}
                {activeForm === 'updateStock' && (
                    <BloodStockForm handleFetchBloodBankDetails={handleFetchBloodBankDetails} />
                )}
            </div>
        </div>
    );
};

export default BloodBankStockPage;
