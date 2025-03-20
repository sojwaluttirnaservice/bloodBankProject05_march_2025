const db = require("../config/db.connect");

/**
 * Orders Model
 * - Handles all CRUD operations related to orders.
 * - Fetches order statistics, revenue calculations, and order details.
 * - Supports queries by blood bank, user, month, year, and multiple filters.
 */

const ordersModel = {
    // Add a new order
    add: (orderData) => {

        console.log(orderData)
        let q = `
            INSERT INTO orders (
                user_id_fk, 
                blood_bank_id_fk, 
                blood_type, 
                quantity, 
                price_at_purchase,
                status, 
                urgency_level,
                delivery_method,
                createdAt, 
                updatedAt
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertArray = [
            orderData.user_id_fk,
            orderData.blood_bank_id_fk,
            orderData.blood_type,
            orderData.quantity || 1,
            orderData.price_at_purchase,
            'PENDING',
            orderData.urgency_level || 'NORMAL',
            orderData.delivery_method || 'PICKUP',
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    // Update order status
    updateStatus: (orderId, status) => {
        let q = `
            UPDATE orders 
            SET status = ?, updatedAt = ? 
            WHERE id = ?
        `;
        return db.query(q, [status, new Date(), orderId]);
    },

    // Get order details by ID
    getById: (orderId) => {
        let q = `SELECT * FROM orders WHERE id = ?`;
        return db.query(q, [orderId]);
    },

    // Get revenue per blood bank
    getRevenueByBloodBank: (bloodBankId) => {
        let q = `
            SELECT blood_bank_id_fk,
                SUM(quantity * price_at_purchase) AS total_revenue
            FROM orders
            WHERE blood_bank_id_fk = ? AND status = "COMPLETED"
            GROUP BY blood_bank_id_fk
        `;
        return db.query(q, [bloodBankId]);
    },

    // Get revenue per month
    getRevenueByMonth: (month, year) => {
        let q = `
            SELECT MONTH(createdAt) AS order_month, YEAR(createdAt) AS order_year,
                SUM(quantity * price_at_purchase) AS total_revenue
            FROM orders
            WHERE MONTH(createdAt) = ? AND YEAR(createdAt) = ?
            GROUP BY order_month, order_year
        `;
        return db.query(q, [month, year]);
    },

    // Get revenue per year
    getRevenueByYear: (year) => {
        let q = `
            SELECT YEAR(createdAt) AS order_year,
                SUM(quantity * price_at_purchase) AS total_revenue
            FROM orders
            WHERE YEAR(createdAt) = ?
            GROUP BY order_year
        `;
        return db.query(q, [year]);
    },

    // Get total revenue across all blood banks
    getTotalRevenue: () => {
        let q = `
            SELECT SUM(quantity * price_at_purchase) AS total_revenue FROM orders
        `;
        return db.query(q);
    },

    // Get order statistics by blood bank
    getOrderStatsByBloodBank: (bloodBankId) => {
        let q = `
            SELECT 
                COUNT(*) AS total_orders,
                SUM(quantity * price_at_purchase) AS total_revenue,
                SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_orders,
                SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending_orders,
                SUM(CASE WHEN status = 'PENDING' AND urgency_level = 'URGENT' THEN 1 ELSE 0 END) AS urgent_pending_orders,
                SUM(CASE WHEN status = 'PENDING' AND urgency_level = 'NORMAL' THEN 1 ELSE 0 END) AS normal_pending_orders,
                SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) AS rejected_orders
            FROM orders
            WHERE blood_bank_id_fk = ?
        `;
        return db.query(q, [bloodBankId]);
    },

    // Get total revenue and stats across multiple blood banks
    getOrderStatsByMultipleBloodBanks: (bloodBankIds) => {
        let q = `
            SELECT blood_bank_id_fk,
                COUNT(*) AS total_orders,
                SUM(quantity * price_at_purchase) AS total_revenue,
                SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_orders,
                SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending_orders,
                SUM(CASE WHEN status = 'PENDING' AND urgency_level = 'URGENT' THEN 1 ELSE 0 END) AS urgent_pending_orders,
                SUM(CASE WHEN status = 'PENDING' AND urgency_level = 'NORMAL' THEN 1 ELSE 0 END) AS normal_pending_orders,
                SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) AS rejected_orders
            FROM orders
            WHERE blood_bank_id_fk IN (?)
            GROUP BY blood_bank_id_fk
        `;
        return db.query(q, [bloodBankIds]);
    },

    // Get orders by blood bank
    getOrdersByBloodBank: (bloodBankId) => {
        let q = `
        SELECT o.*, u.full_name AS user_name, u.email AS user_email, 
               b.name AS blood_bank_name, b.state AS blood_bank_state, b.district AS blood_bank_district
        FROM orders o
        JOIN users u ON o.user_id_fk = u.id
        JOIN blood_banks b ON o.blood_bank_id_fk = b.id
        WHERE o.blood_bank_id_fk = ?
         ORDER BY o.id DESC
    `;
        return db.query(q, [bloodBankId]);
    },

    // Get orders by user
    getOrdersByUser: (userId) => {

        let q = `
        SELECT o.*, u.full_name AS user_name, u.email AS user_email, 
               b.name AS blood_bank_name, b.state AS blood_bank_state, b.district AS blood_bank_district
        FROM orders o
        JOIN users u ON o.user_id_fk = u.id
        JOIN blood_banks b ON o.blood_bank_id_fk = b.id
        WHERE o.user_id_fk = ?
         ORDER BY o.id DESC
    `;
        return db.query(q, [userId]);
    },

    // Get order details including user and blood bank details
    getOrderDetails: (orderId) => {
        let q = `
        SELECT o.*, u.full_name AS user_name, u.email AS user_email, u.phone AS user_phone, 
               b.name AS blood_bank_name, b.state AS blood_bank_state, b.district AS blood_bank_district
        FROM orders o
        JOIN users u ON o.user_id_fk = u.id
        JOIN blood_banks b ON o.blood_bank_id_fk = b.id
        WHERE o.id = ?
    `;
        return db.query(q, [orderId]);
    },

    getOrders: () => {
        let q = `
        SELECT o.*, u.full_name AS user_name, u.email AS user_email, u.phone AS user_phone, 
               b.name AS blood_bank_name, b.state AS blood_bank_state, b.district AS blood_bank_district
        FROM orders o
        JOIN users u ON o.user_id_fk = u.id
        JOIN blood_banks b ON o.blood_bank_id_fk = b.id
        ORDER BY o.id DESC
    `;
        return db.query(q);
    },

};

module.exports = ordersModel;