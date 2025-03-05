const db = require("../config/db.connect");
const orderModel = {
    // Add a new order

    add: (orderData) => {
        let q = `
            INSERT INTO orders (
                user_id_fk, 
                blood_bank_id_fk, 
                blood_type, 
                quantity, 
                status, 
                createdAt, 
                updatedAt
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const insertArray = [
            orderData.user_id_fk,
            orderData.blood_bank_id_fk,
            orderData.blood_type,
            orderData.quantity || 1,
            'PENDING',
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

    // Get orders grouped by user
    getOrdersByUser: () => {
        let q = `
            SELECT user_id_fk, COUNT(*) AS total_orders
            FROM orders
            GROUP BY user_id_fk
        `;
        return db.query(q);
    },

    // Get orders grouped by blood bank
    getOrdersByBloodBank: () => {
        let q = `
            SELECT blood_bank_id_fk, COUNT(*) AS total_orders
            FROM orders
            GROUP BY blood_bank_id_fk
        `;
        return db.query(q);
    },
};


module.exports = orderModel;