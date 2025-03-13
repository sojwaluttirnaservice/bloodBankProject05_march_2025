import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { instance } from '../../axiosInstance/axiosInstance';
import { ArrowBack, Download } from '@mui/icons-material';

const RequestDetailsPage = () => {
    const receiptRef = useRef();
    const { requestId } = useParams();
    const [request, setRequest] = useState(null);

    const navigate = useNavigate();

    // Fetch request details
    const handleFetchRequestDetails = async () => {
        try {
            const { data: resData } = await instance.get(`/orders/o/${requestId}`);

            const { success, message, data } = resData;

            if (success) {
                setRequest(data?.order);
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Unable to fetch request details');
        }
    };

    useEffect(() => {
        handleFetchRequestDetails();
        return () => setRequest(null);
    }, []);

    // Function to download as PDF
    const downloadPDF = () => {
        const input = receiptRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save(`Request_Receipt_${request?.id}.pdf`);
        });
    };

    if (!request) {
        return <div className="text-center text-red-600 font-bold">Loading request details...</div>;
    }

    return (
        <>
            <div className="relative">
                <div className="max-w-3xl mx-auto mt-6 p-6 bg-white border shadow-xl rounded-lg relative">
                    {/* Receipt Layout */}
                    <div ref={receiptRef} className="p-6 border rounded-md">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Blood Request Receipt
                            </h2>
                            <p className="text-gray-500 text-sm">Receipt ID: #{request.id}</p>
                        </div>

                        {/* Request Information */}
                        <div className="bg-gray-100 p-4 rounded-md mb-4">
                            <p className="text-gray-700">
                                <span className="font-semibold">Date Requested:</span>{' '}
                                {format(new Date(request.createdAt), 'dd MMM yyyy, hh:mm a')}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Blood Type:</span>{' '}
                                {request.blood_type}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Quantity:</span> {request.quantity}
                                {' 33'}
                                Units
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Price Per Unit:</span> ₹
                                {request.price_at_purchase}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Total Price:</span> ₹
                                {request.quantity * request.price_at_purchase}
                            </p>
                        </div>

                        {/* User & Blood Bank Information */}
                        <div className="grid grid-cols-2 gap-6 border-b pb-4 mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    User Details
                                </h3>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Name:</span> {request.user_name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Email:</span>{' '}
                                    {request.user_email}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Phone:</span>{' '}
                                    {request.user_phone}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Blood Bank Details
                                </h3>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Name:</span>{' '}
                                    {request.blood_bank_name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Location:</span>{' '}
                                    {request.blood_bank_district}, {request.blood_bank_state}
                                </p>
                            </div>
                        </div>

                        {/* Status, Urgency, and Delivery Method (Wrapped in a container to prevent misalignment in PDF) */}
                        <div className="border p-4 rounded-md bg-gray-50 text-center">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                Order Details
                            </h3>
                            <div className="flex justify-between items-center">
                                <span
                                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                                        request.status === 'PENDING'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : request.status === 'COMPLETED'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                    Status: {request.status}
                                </span>

                                <span
                                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                                        request.urgency_level === 'URGENT'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-blue-500 text-white'
                                    }`}>
                                    Urgency: {request.urgency_level}
                                </span>

                                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-200 text-gray-700">
                                    Delivery: {request.delivery_method}
                                </span>
                            </div>
                        </div>

                        {/* Rejection Reason */}
                        {request.status === 'REJECTED' && request.reason && (
                            <div className="mt-4 bg-red-100 p-3 rounded-md text-red-700">
                                <p className="font-semibold">Rejection Reason:</p>
                                <p>{request.reason}</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Download Button */}
                <button
                    onClick={downloadPDF}
                    className="absolute top-4 right-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    <Download />
                    PDF
                </button>

                {/* Go back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-0 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    <ArrowBack /> Back
                </button>
            </div>
        </>
    );
};

export default RequestDetailsPage;
