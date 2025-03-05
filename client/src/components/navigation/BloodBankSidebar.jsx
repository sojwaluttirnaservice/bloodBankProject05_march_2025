import React from 'react';
import { NavLink } from 'react-router';

const links = [
    {
        to: '/blood-bank/dashboard',
        linkName: 'Dashboard',
    },

    {
        to: '/blood-bank/requests',
        linkName: 'Requests',
    },

    {
        to: '/blood-bank/blood',
        linkName: 'Blood',
    },
];
const BloodBankSidebar = () => {
    // TODO: IMPLEMENT THIS LATER
    const handleBloodBankLogout = () => {};

    return (
        <>
            <nav
                style={{ scrollbarWidth: 'thin' }}
                className="custom-scrollbar shrink-0 w-[250px] bg-red-500 border-r border-r-gray-400 min-h-full overflow-y-scroll">
                <div className="px-8 h-full">
                    <div className="h-full flex flex-col">
                        <ul className="mt-8 flex flex-col gap-2">
                            {links.map((linkItem, index) => (
                                <li key={index} className="">
                                    <NavLink
                                        to={linkItem.to}
                                        className={({ isActive }) =>
                                            `block py-2 px-4 w-full rounded-md transition-colors text-white duration-300 ${
                                                isActive ? 'bg-white/20 ' : ''
                                            }`
                                        }>
                                        {linkItem.linkName}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto mb-2">
                            <button
                                onClick={handleBloodBankLogout}
                                className="py-2 px-4 border border-white rounded-md text-white font-bold tracking-wider">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default BloodBankSidebar;
