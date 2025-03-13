import React, { useEffect, useState, Suspense } from 'react';
import { instance } from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../../components/loaders/Loader';
import UserDetailsCard from '../../components/user/UserDetailsCard';
import { H2 } from '../../components/headings/headings';

const UsersListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const { data: resData } = await instance.get('/users');

            if (resData.success) {
                setUsers(resData?.data?.users || []);
            } else {
                toast.warning(resData.message || 'No users found');
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Failed to load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="mx-8 relative h-full flex flex-col justify-center items-center">
            <div className="shrink-0 w-full border-b-2 max-w-4xl border-b-gray-300">
                <H2 className="text-center py-4">
                    Users
                    <span className="text-base"> (Users List: {users?.length})</span>
                </H2>
            </div>

            {/* Suspense for Better Loading Experience */}
            <Suspense fallback={<Loader />}>
                {loading ? (
                    <div className="grow">
                        <div className="flex justify-center items-center h-64">
                            <Loader />
                        </div>
                    </div>
                ) : users.length > 0 ? (
                    <div className="grow overflow-y-scroll w-full">
                        <div className="mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {users.map((user) => (
                                    <UserDetailsCard key={user.id} user={user} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg mt-6">
                        <p>No users found. Try again later!</p>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default UsersListPage;
