import DefaultLayout from '../layouts/DefaultLayout';
import BloodBankDashboardPage from '../pages/bloodBank/BloodBankDashboardPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import HomePage from '../pages/HomePage';
import Layout from '../layouts/Layout';
import RequestsPage from '../pages/requests/RequestsPage';
import RequestDetailsPage from '../pages/requests/RequestDetailsPage';
import BloodBankStockPage from '../pages/bloodBank/BloodBankStockPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import BloodBankProtectedRoutes from '../protectedRoutes/BloodBankProtectedRoutes';
import { ProtectedRoutes } from '../protectedRoutes/CommonProtectedRoutes';
import AdminProtectedRoutes from '../protectedRoutes/AdminProtectedRoutes';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import UsersListPage from '../pages/user/UsersListPage';
import BloodBankListPage from '../pages/bloodBank/BloodBankListPage';
import AboutPage from '../pages/common/AboutPage';
import ContactPage from '../pages/common/ContactPage';
import SearchPage from '../pages/common/SearchPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';

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
                path: '',
                element: <LoginPage />,
            },

            {
                path: 'signup',
                element: <SignupPage />,
            },

            {
                path: 'admin',
                element: <AdminLoginPage />,
            },
        ],
    },

    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export { routes };
