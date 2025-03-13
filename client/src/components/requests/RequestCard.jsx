import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Import date-fns for formatting timestamps
import { useSelector } from 'react-redux';

const RequestCard = ({
    request,
    handleAcceptRequest = () => {},
    handleRejectRequest = () => {},
}) => {
    const bloodBank = useSelector((state) => state.bloodBank);
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl w-full border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition duration-300">
            {/* Blood Type & Quantity */}
            <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-red-600">{request.blood_type}</h2>
                <span className="text-sm w-20 font-semibold px-4 py-1 bg--400 rounded-md bg-sky-900 text-white">
                    {request.quantity} Units
                </span>
            </div>

            {/* User & Blood Bank Info */}
            <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>
                    <span className="font-semibold text-gray-800">Ordered By: </span>
                    {request.user_name}
                </p>
                <p>
                    <span className="font-semibold text-gray-800">Blood Bank: </span>
                    {request.blood_bank_name}
                </p>
                <p>
                    <span className="font-semibold text-gray-800">Requested On: </span>
                    {format(new Date(request.createdAt), 'dd MMM yyyy, hh:mm a')}
                </p>
                <p>
                    <span className="font-semibold text-gray-800">Total Price: </span> ₹
                    {request.price_at_purchase * request.quantity}
                </p>
            </div>

            {/* Status & Urgency */}
            <div className="mt-3 flex items-center justify-between">
                <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                        request.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : request.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                    {request.status}
                </span>

                <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                        request.urgency_level === 'URGENT'
                            ? 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                    }`}>
                    {request.urgency_level}
                </span>
            </div>

            {/* View Details Button */}
            <div
                className={`flex ${
                    bloodBank.isAuthenticated && request.status == 'PENDING'
                        ? 'justify-between'
                        : 'justify-end'
                } mt-4`}>
                {bloodBank.isAuthenticated && request.status === 'PENDING' && (
                    <div>
                        <div className="flex items-center gap-2">
                            {/* Accept Button */}
                            <button
                                onClick={() => handleAcceptRequest(request.id)}
                                className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300 shadow-md">
                                Accept
                            </button>

                            {/* Reject Button */}
                            <button
                                onClick={() => handleRejectRequest(request.id)}
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300 shadow-md">
                                Reject
                            </button>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => navigate(`/requests/r/${request.id}`)}
                    // onClick={() => window.open(`/requests/r/${request.id}`, '_blank')}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default RequestCard;
