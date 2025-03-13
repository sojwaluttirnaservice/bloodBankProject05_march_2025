import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLogout } from '../../redux/slices/adminSlice'; // Ensure this exists
import { toast } from 'react-toastify';

const links = [
    { to: '/admin/dashboard', linkName: 'Dashboard' },
    { to: '/requests', linkName: 'Requests' },
    { to: '/users', linkName: 'Users' },
    { to: '/blood-banks', linkName: 'Blood Banks' },
];

const AdminSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout Function
    const handleAdminLogout = () => {
        dispatch(onLogout());
        toast.success('Logged out');
        navigate('/');
    };

    return (
        <nav className="custom-scrollbar shrink-0 w-[260px] min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 border-r border-gray-700 text-white overflow-y-auto shadow-xl">
            <div className="p-6 h-full flex flex-col">
                {/* LOGO / TITLE */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
                    <p className="text-sm text-gray-300">Manage System</p>
                </div>

                {/* NAVIGATION LINKS */}
                <ul className="flex flex-col gap-3">
                    {links.map((linkItem, index) => (
                        <li key={index}>
                            <NavLink
                                to={linkItem.to}
                                className={({ isActive }) =>
                                    `block py-3 px-5 w-full rounded-md text-lg font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'bg-white/30 text-white shadow-md'
                                            : 'hover:bg-white/20 hover:text-gray-200'
                                    }`
                                }>
                                {linkItem.linkName}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* LOGOUT BUTTON - PUSHED TO BOTTOM */}
                <div className="mt-auto mb-6">
                    <button
                        onClick={handleAdminLogout}
                        className="w-full py-3 px-4 text-lg font-semibold bg-red-700 rounded-md hover:bg-red-800 transition-all duration-300 shadow-md">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminSidebar;
