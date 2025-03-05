import React from 'react';
import AdminSidebar from '../components/navigation/adminSidebar';
import { Outlet } from 'react-router';

const AdminLayout = () => {
    return (
        <div className="relative flex h-lvh">
            {/* To the left is sidebar */}
            <AdminSidebar />

            {/* To the right will be the page rendering */}
            <main className="flex-grow overflow-y-scroll px-2">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
