import React from "react";
import { Link } from "react-router";
import {
  bloodStockDummyData,
  requestDummyData,
  revenueDummyData,
} from "../../../dummyData/bloodBankDummyData";

import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { AttachMoney, ReplayCircleFilledOutlined } from "@mui/icons-material";

// Blood Stock Grid Component
const BloodGroupGrid = ({ bloodStock }) => {
  const positiveBloodGroups = ["A+", "B+", "O+", "AB+"];
  const negativeBloodGroups = ["A-", "B-", "O-", "AB-"];

  const stockMap = bloodStock.reduce((acc, { blood_type, quantity }) => {
    acc[blood_type] = quantity;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 gap-6">
      {[{ type: "+ve", groups: positiveBloodGroups, color: "text-red-600" },
        { type: "-ve", groups: negativeBloodGroups, color: "text-blue-600" }]
        .map(({ type, groups, color }) => (
          <div key={type}>
            <h2 className={`text-xl font-bold ${color} mb-4`}>{type} Groups</h2>
            <div className="space-y-3">
              {groups.map((group) => (
                <div
                  key={group}
                  className="flex justify-between items-center p-3 border rounded-lg bg-white"
                >
                  <span className="text-lg font-medium">{group}</span>
                  <span className={`text-lg font-semibold ${stockMap[group] === 0 ? "text-red-500" : "text-green-600"}`}>
                    {stockMap[group] ?? 0} units
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

// Requests Info Component
const RequestsInfo = ({ requestInfo = {} }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center text-gray-800 font-bold text-lg gap-2">
        <RequestPageIcon className="w-6 h-6 text-gray-700" />
        Total Requests: {requestInfo?.total_requests ?? 0}
      </div>

      <div className="flex items-center text-green-600 font-bold gap-2">
        <CheckCircleIcon className="w-5 h-5" />
        Completed Requests: {requestInfo?.completed_requests ?? 0}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center text-yellow-600 font-bold gap-2">
          <HourglassEmptyIcon className="w-5 h-5" />
          Pending Requests: {requestInfo?.pending_requests ?? 0}
        </div>

        <div className="ml-6 flex items-center text-red-600 font-semibold gap-2">
          <ReportProblemIcon className="w-5 h-5" />
          Urgent: {requestInfo?.urgent_requests ?? 0}
        </div>

        <div className="ml-6 flex items-center text-orange-500 font-semibold gap-2">
          <ScheduleIcon className="w-5 h-5" />
          Normal: {requestInfo?.normal_requests ?? 0}
        </div>
      </div>

      <div className="flex items-center text-red-600 font-bold gap-2">
        <CancelIcon className="w-5 h-5" />
        Rejected Requests: {requestInfo?.rejected_requests ?? 0}
      </div>
    </div>
  );
};

// Revenue Info Component
const RevenueInfo = ({ revenueInfo = {} }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center text-gray-800 font-bold text-lg gap-2">
        <AttachMoney className="w-6 h-6 text-gray-700" />
        Total Revenue: ₹{revenueInfo?.total_revenue ?? 0}
      </div>

      <div className="flex items-center text-green-600 font-bold gap-2">
        <CheckCircleIcon className="w-5 h-5" />
        Completed Payments: ₹{revenueInfo?.completed_revenue ?? 0}
      </div>

      <div className="flex items-center text-yellow-600 font-bold gap-2">
        <HourglassEmptyIcon className="w-5 h-5" />
        Pending Payments: ₹{revenueInfo?.pending_revenue ?? 0}
      </div>

      <div className="flex items-center text-red-600 font-bold gap-2">
        <ReplayCircleFilledOutlined className="w-5 h-5" />
        Refunded: ₹{revenueInfo?.refunded_revenue ?? 0}
      </div>
    </div>
  );
};

// Main Dashboard Status Section
const DashboardStatusSection = () => {
  return (
    <section className="p-6">
      <div className="dashboard-details">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li className="border p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <Link>
              <div className="flex flex-col gap-4">
                <h5 className="font-extrabold flex items-center justify-center text-red-700 text-lg">
                  <BloodtypeIcon className="w-6 h-6 mr-2" />
                  Blood Stock Details
                </h5>
                <BloodGroupGrid bloodStock={bloodStockDummyData} />
              </div>
            </Link>
          </li>

          <li className="border p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <Link>
              <div className="h-full flex flex-col gap-4">
                <h5 className="font-extrabold flex items-center justify-center text-red-700 text-lg">
                  <RequestPageIcon className="w-6 h-6 mr-2" />
                  Requests
                </h5>
                <RequestsInfo requestInfo={requestDummyData} />
              </div>
            </Link>
          </li>

          <li className="border p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <Link>
              <div className="flex flex-col gap-4">
                <h5 className="font-extrabold flex items-center justify-center text-red-700 text-lg">
                  <CurrencyRupeeIcon className="w-6 h-6 mr-2" />
                  Revenue
                </h5>
                <RevenueInfo revenueInfo={revenueDummyData} />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DashboardStatusSection;
