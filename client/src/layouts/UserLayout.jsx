import React from 'react';
import UserNavbar from '../components/navigation/UserNavbar';
import { Outlet } from 'react-router';

const UserLayout = () => {
    return (
        <div className="relative flex flex-col min-h-lvh">
            <UserNavbar />

            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
