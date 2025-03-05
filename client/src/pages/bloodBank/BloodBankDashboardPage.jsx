import React from 'react';
import { dummyBloodBankData } from '../../dummyData/bloodBankDummyData';
import { H1, H2 } from '../../components/headings/headings';
import DashboardStatusSection from '../../components/bloodBank/dashboard/DashboardStatusSection';

const BloodBankDashboardPage = () => {
    let bloodBank = dummyBloodBankData;

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

            <DashboardStatusSection />
        </>
    );
};

export default BloodBankDashboardPage;
