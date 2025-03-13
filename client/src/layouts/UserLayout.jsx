import React from 'react';
// import UserNavbar from '../components/navigation/UserNavbar';
import { Outlet } from 'react-router';
import Navbar from '../components/navigation/Navbar';

const UserLayout = () => {
    return (
        <div className="relative flex flex-col min-h-lvh">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
