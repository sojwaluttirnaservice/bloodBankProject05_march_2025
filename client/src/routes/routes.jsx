import BloodBankLayout from '../layouts/BloodBankLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import BloodBankDashboardPage from '../pages/bloodBank/BloodBankDashboardPage';
import HomePage from '../pages/HomePage';

const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
        ],
    },

    {
        path: '/blood-bank',
        element: <BloodBankLayout />,

        children: [
            {
                path: 'dashboard',
                element: <BloodBankDashboardPage />,
            },
        ],
    },
];

export { routes };
