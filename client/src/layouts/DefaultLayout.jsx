import React from 'react';
import Navbar from '../components/navigation/Navbar';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
    return (
        <>
            <div className="relative flex flex-col min-h-lvh">
                <Navbar />

                <main className="flex-grow">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default DefaultLayout;
