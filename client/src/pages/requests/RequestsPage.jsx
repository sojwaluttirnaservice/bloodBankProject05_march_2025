import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { instance } from '../../axiosInstance/axiosInstance';
import RequestCard from '../../components/requests/RequestCard';
import { H2 } from '../../components/headings/headings';
import Loader from '../../components/loaders/Loader';
import { ArrowBack } from '@mui/icons-material';

const RequestsPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const bloodBank = useSelector((state) => state.bloodBank);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userId, bloodBankId } = useParams();

    const handleFetchRequests = async () => {
        try {
            let endPoint = '/orders';
            if (userId || (user.id && user.isAuthenticated)) {
                endPoint += `/u/${userId || user.id}`;
            } else if (bloodBankId || (bloodBank.id && bloodBank.isAuthenticated)) {
                endPoint += `/bb/${bloodBankId || bloodBank.id}`;
            }

            const { data: resData } = await instance.get(endPoint);
            let { success, message, data } = resData;

            if (success) {
                console.log(data.orders);
                setRequests(data.orders);
            } else {
                toast.warning(message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchRequests();
    }, []);

    const handleAcceptRequest = async (requestId) => {
        try {
            const { data: resData } = await instance.put(`/orders/status`, {
                id: requestId,
                status: 'COMPLETED',
                blood_bank_id_fk: bloodBank.id,
            });

            let { success, message } = resData;

            if (success) {
                toast.success(message || 'Request Accepted');
                handleFetchRequests();
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to accept the request');
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const { data: resData } = await instance.put(`/orders/status`, {
                id: requestId,
                status: 'REJECTED',
                blood_bank_id_fk: bloodBank.id,
            });

            let { success, message } = resData;

            if (success) {
                toast.success(message || 'Request Rejected');
                handleFetchRequests();
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to reject the request');
        }
    };

    return (
        <div className="mx-8 relative h-full flex flex-col justify-center items-center">
            <div className="shrink-0 w-full border-b-2 max-w-4xl border-b-gray-300">
                <H2 className="text-center py-4">
                    Requests
                    <span className="text-base"> (Total Requests: {requests?.length})</span>
                </H2>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-0 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                <ArrowBack /> Back
            </button>

            {/* Suspense for Loader While Fetching Requests */}
            <Suspense fallback={<Loader />}>
                {loading ? (
                    <div className="grow">
                        <div className="flex justify-center items-center h-64">
                            <Loader />
                        </div>
                    </div>
                ) : requests?.length > 0 ? (
                    <div className="grow overflow-y-scroll w-full">
                        <div className="mt-4">
                            <div className="flex flex-col gap-4 justify-center items-center w-full">
                                {requests.map((request) => (
                                    <RequestCard
                                        handleAcceptRequest={handleAcceptRequest}
                                        handleRejectRequest={handleRejectRequest}
                                        request={request}
                                        key={request?.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg mt-6">
                        <p>No requests found. Try again later!</p>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default RequestsPage;
