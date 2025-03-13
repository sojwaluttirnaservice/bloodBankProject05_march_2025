import { Outlet } from 'react-router';
import BloodBankLayout from '../layouts/BloodBankLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import UserLayout from '../layouts/UserLayout';
import BloodBankDashboardPage from '../pages/bloodBank/BloodBankDashboardPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import HomePage from '../pages/HomePage';
import Layout from '../layouts/Layout';
import RequestsPage from '../pages/requests/RequestsPage';
import RequestDetailsPage from '../pages/requests/RequestDetailsPage';
import BloodBankStockPage from '../pages/bloodBank/BloodBankStockPage';
import BloodBankLoginPage from '../pages/auth/BloodBankLoginPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import UserLoginPage from '../pages/auth/UserLoginPage';
import BloodBankProtectedRoutes from '../protectedRoutes/BloodBankProtectedRoutes';
import { ProtectedRoutes } from '../protectedRoutes/CommonProtectedRoutes';
import AdminProtectedRoutes from '../protectedRoutes/AdminProtectedRoutes';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import UsersListPage from '../pages/user/UsersListPage';
import BloodBankListPage from '../pages/bloodBank/BloodBankListPage';
import AboutPage from '../pages/common/AboutPage';
import ContactPage from '../pages/common/ContactPage';
import SearchPage from '../pages/common/SearchPage';

const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },

            {
                path: 'about',
                element: <AboutPage />,
            },

            {
                path: 'contact',
                element: <ContactPage />,
            },

            {
                path: 'search',
                element: <SearchPage />,
            },
        ],
    },

    {
        path: '/admin',
        element: <Layout />,
        children: [
            {
                path: 'dashboard',
                element: (
                    <AdminProtectedRoutes>
                        <AdminDashboardPage />
                    </AdminProtectedRoutes>
                ),
            },
        ],
    },

    {
        path: '/blood-banks',
        element: <Layout />,
        children: [
            {
                path: '',
                element: (
                    <AdminProtectedRoutes>
                        <BloodBankListPage />
                    </AdminProtectedRoutes>
                ),
            },
            {
                path: 'signup',
                element: <></>,
            },
            {
                path: 'dashboard',
                element: (
                    <BloodBankProtectedRoutes>
                        <BloodBankDashboardPage />
                    </BloodBankProtectedRoutes>
                ),
            },
            {
                path: 'stock',
                element: (
                    <BloodBankProtectedRoutes>
                        <BloodBankStockPage />
                    </BloodBankProtectedRoutes>
                ),
            },
            // {
            //     path: 'requests',
            //     element: <></>, // Manage requests
            // },
            // {
            //     path: 'donors',
            //     element: <></>, // View donors
            // },
        ],
    },

    {
        path: '/users',
        element: <Layout />,
        children: [
            {
                path: '',
                element: (
                    <AdminProtectedRoutes>
                        <UsersListPage />
                    </AdminProtectedRoutes>
                ),
            },
            {
                path: 'signup',
                element: <></>,
            },
            {
                path: 'profile',
                element: <></>, // User Profile Page
            },
            {
                path: 'requests',
                element: <></>, // User blood requests
            },
            {
                path: 'donations',
                element: <></>, // User donation history
            },
        ],
    },

    {
        path: '/requests',
        element: <Layout />,

        children: [
            {
                path: '',
                element: (
                    <ProtectedRoutes>
                        <RequestsPage />
                    </ProtectedRoutes>
                ),
            },

            {
                path: 'bb/:bloodBankId',
                element: (
                    <AdminProtectedRoutes>
                        <RequestsPage />
                    </AdminProtectedRoutes>
                ),
            },

            {
                path: 'r/:requestId',
                element: (
                    <ProtectedRoutes>
                        <RequestDetailsPage />
                    </ProtectedRoutes>
                ),
            },

            {
                path: 'u/:userId',
                element: (
                    <AdminProtectedRoutes>
                        <RequestsPage />
                    </AdminProtectedRoutes>
                ),
            },
        ],
    },

    {
        path: '/auth',
        element: <Layout />,
        children: [
            {
                path: 'admin',
                element: <AdminLoginPage />,
            },

            {
                path: 'user',
                element: <UserLoginPage />,
            },
            {
                path: 'blood-bank',
                element: <BloodBankLoginPage />,
            },
        ],
    },

    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export { routes };
