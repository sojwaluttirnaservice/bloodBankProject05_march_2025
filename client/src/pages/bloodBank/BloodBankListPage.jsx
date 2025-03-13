import React, { useEffect, useState, Suspense } from 'react';
import { instance } from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../../components/loaders/Loader';
import BloodBankDetailsCard from '../../components/bloodBank/BloodBankDetailsCard';

const BloodBankListPage = () => {
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Blood Banks from API
    const fetchBloodBanks = async () => {
        try {
            const { data: resData } = await instance.get('/blood-banks');

            if (resData) {
                setBloodBanks(resData?.data?.bloodBanks || []);
            } else {
                toast.warning(resData.message || 'No blood banks found.');
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Failed to load blood banks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBloodBanks();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6 bg-white border shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Blood Banks</h2>

            {/* Suspense for Better Loading Experience */}
            <Suspense fallback={<Loader />}>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : bloodBanks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {bloodBanks.map((bloodBank) => (
                            <BloodBankDetailsCard key={bloodBank.id} bloodBank={bloodBank} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg mt-6">
                        <p>No blood banks found. Try again later!</p>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default BloodBankListPage;
