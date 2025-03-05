import React from 'react';
import BloodBankSidebar from '../components/navigation/BloodBankSidebar';
import { Outlet } from 'react-router';

const BloodBankLayout = () => {
    return (
        <>
            <div className="relative flex h-lvh">
                {/* To the left is sidebar */}
                <BloodBankSidebar />

                {/* To the right will be the page rendering */}
                <main className="flex-grow overflow-y-scroll px-2">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default BloodBankLayout;
