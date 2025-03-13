import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
    // This component ensures access to a page if any party is logged in (User, Admin, Blood Bank)

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const bloodBank = useSelector((state) => state.bloodBank);

    const isUserLoggedIn = user?.isAuthenticated && user.role === 'user' && user.token;
    const isAdminLoggedIn = admin?.isAuthenticated && admin.role === 'admin' && admin.token;
    const isBloodBankLoggedIn =
        bloodBank?.isAuthenticated && bloodBank.role === 'bloodBank' && bloodBank.token;

    if (isUserLoggedIn || isAdminLoggedIn || isBloodBankLoggedIn) {
        return <>{children}</>;
    }

    return <Navigate to="/" replace />;
};

export const AdminBloodBankProtectedRoutes = ({ children }) => {
    // This component ensures only Admins or Blood Banks can access the page

    const admin = useSelector((state) => state.admin);
    const bloodBank = useSelector((state) => state.bloodBank);

    const isAdminLoggedIn = admin?.isAuthenticated && admin.role === 'admin' && admin.token;
    const isBloodBankLoggedIn =
        bloodBank?.isAuthenticated && bloodBank.role === 'bloodBank' && bloodBank.token;

    if (isAdminLoggedIn || isBloodBankLoggedIn) {
        return <>{children}</>;
    }

    return <Navigate to="/" replace />;
};

export const AdminUserProtectedRoutes = ({ children }) => {
    // This component ensures only Admins or Users can access the page

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);

    const isUserLoggedIn = user?.isAuthenticated && user.role === 'user' && user.token;
    const isAdminLoggedIn = admin?.isAuthenticated && admin.role === 'admin' && admin.token;

    if (isUserLoggedIn || isAdminLoggedIn) {
        return <>{children}</>;
    }

    return <Navigate to="/" replace />;
};
