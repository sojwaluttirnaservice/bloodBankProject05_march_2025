const dummyBloodBankData = {
    id: 1,
    name: "Lifeline Blood Bank",
    email: "lifeline@example.com",
    phone: "+91 9123456789",
    password: "hashedpassword456", // This should be securely hashed in production
    state: "Maharashtra",
    district: "Mumbai",
    address_lines: "45, Andheri West, Near Metro Station, Mumbai - 400058",
    latitude: 19.0760,
    longitude: 72.8777,
    availability_status: true,
    operating_hours: "24/7",
    verified: false, // Assuming it’s not yet verified
    createdAt: new Date(),
    updatedAt: new Date(),
};




// Example usage
const bloodStockDummyData = [
    { blood_type: "A+", quantity: 5 },
    { blood_type: "B+", quantity: 10 },
    { blood_type: "O+", quantity: 0 },  // Out of stock case
    { blood_type: "AB+", quantity: 8 },
    { blood_type: "A-", quantity: 2 },
    { blood_type: "B-", quantity: 0 },  // Out of stock case
    { blood_type: "O-", quantity: 3 },
    { blood_type: "AB-", quantity: 6 },
];


const requestDummyData = {
    total_requests: 20,
    completed_requests: 10,
    pending_requests: 7,
    urgent_requests: 3,
    normal_requests: 4,
    rejected_requests: 3,
}

const revenueDummyData = {
    total_revenue: 50000,
    completed_revenue: 40000,
    pending_revenue: 8000,
    refunded_revenue: 2000,
}
export { dummyBloodBankData, bloodStockDummyData, revenueDummyData , requestDummyData}