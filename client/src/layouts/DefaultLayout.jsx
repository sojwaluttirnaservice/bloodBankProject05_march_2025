import React from 'react';
import Navbar from '../components/navigation/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footers/Footer';

const DefaultLayout = () => {
    return (
        <>
            <div className="relative flex flex-col min-h-lvh">
                <Navbar />

                <main className="flex-grow">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default DefaultLayout;
