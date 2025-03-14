import React, { useEffect, useState } from 'react';
// import { dummyBloodBankData } from '../../dummyData/bloodBankDummyData';
import { H1, H2 } from '../../components/headings/headings';
import DashboardStatusSection from '../../components/bloodBank/dashboard/DashboardStatusSection';
import { instance } from '../../axiosInstance/axiosInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BloodBankDashboardPage = () => {
    let bloodBank = useSelector((state) => state.bloodBank);

    const [bloodBankStats, setBloodBankStats] = useState({});
    const [bloodStocks, setBloodStocks] = useState({});
    const [requestsInfo, setRequestsInfo] = useState({});
    const [revenueInfo, setRevenueInfo] = useState({});

    const handleFetchBloodBankDetails = async () => {
        try {
            const { data: resData } = await instance.get(`/stats/blood-banks/${bloodBank.id}`);

            let { success, message, data } = resData;

            if (success) {
                setBloodStocks(data?.bloodStocks);
                // setBloodBankStats(data?.bloodBankStats);
                setRequestsInfo(data?.requestsInfo);
                setRevenueInfo(data?.revenueInfo);
            } else {
                toast.warning(message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to fetch blood dashboard stats');
        }
    };

    useEffect(() => {
        if (bloodBank.id) {
            handleFetchBloodBankDetails();
        }
    }, []);

    return (
        <>
            <section className="">
                <div>
                    <div className="py-3 text-center border-b border-b-gray-400">
                        <H2>
                            Welcome{' '}
                            <span className="italic font-extrabold tracking-wider">
                                {bloodBank.name}
                            </span>
                        </H2>
                        <p className="text-center text-gray-700 italic mt-2">
                            Manage your blood bank operations efficiently
                        </p>
                    </div>
                </div>
            </section>

            <DashboardStatusSection
                bloodBankStats={bloodBankStats}
                bloodStocks={bloodStocks}
                requestsInfo={requestsInfo}
                revenueInfo={revenueInfo}
            />
        </>
    );
};

export default BloodBankDashboardPage;
