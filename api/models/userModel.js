const db = require("../config/db.connect");

const userModel = {
    // Add a new user
    add: (userData) => {
        let q = `
            INSERT INTO users (
                full_name, 
                email, 
                phone, 
                password, 
                state, 
                district, 
                address, 
                user_type, 
                createdAt, 
                updatedAt
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertArray = [
            userData.full_name,
            userData.email,
            userData.phone,
            userData.password,
            userData.state || null,
            userData.district || null,
            userData.address || null,
            userData.user_type || 'person',
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    // Update user details
    update: (userData) => {
        let q = `
            UPDATE users 
            SET 
                full_name = ?, 
                email = ?, 
                phone = ?, 
                password = ?, 
                state = ?, 
                district = ?, 
                address = ?, 
                user_type = ?, 
                updatedAt = ?
            WHERE id = ?
        `;

        const updateArray = [
            userData.full_name,
            userData.email,
            userData.phone,
            userData.password,
            userData.state || null,
            userData.district || null,
            userData.address || null,
            userData.user_type || 'person',
            new Date(),
            userData.id
        ];

        return db.query(q, updateArray);
    },

    // Get user by ID
    getById: (userId) => {
        let q = `
            SELECT 
                id, 
                full_name, 
                email, 
                phone, 
                state, 
                district, 
                address, 
                user_type, 
                createdAt, 
                updatedAt
            FROM users 
            WHERE id = ?
        `;

        return db.query(q, [userId]);
    },

    // Get user by Email
    getByEmail: (email) => {
        let q = `
            SELECT 
                id, 
                full_name, 
                email, 
                phone, 
                state, 
                district, 
                address, 
                user_type, 
                createdAt, 
                updatedAt
            FROM users 
            WHERE email = ?
        `;

        return db.query(q, [email]);
    },

    // Get user by Email
    getByPhone: (phone) => {
        let q = `
            SELECT 
                id, 
                full_name, 
                email, 
                password,
                phone, 
                state, 
                district, 
                address, 
                user_type, 
                createdAt, 
                updatedAt
            FROM users 
            WHERE phone = ?
        `;

        return db.query(q, [phone]);
    },

    getTotalUsers: () => {
        let q = `
            SELECT 
                u.id, 
                u.full_name, 
                u.email, 
                u.phone, 
                u.state, 
                u.district, 
                u.address, 
                u.user_type, 
                u.createdAt, 
                u.updatedAt, 
                COUNT(o.id) AS total_requests, 
                SUM(CASE WHEN o.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_requests, 
                SUM(CASE WHEN o.status = 'COMPLETED' THEN o.quantity * o.price_at_purchase ELSE 0 END) AS total_amount_spent
            FROM users u
            LEFT JOIN orders o ON u.id = o.user_id_fk
            GROUP BY u.id
            ORDER BY u.full_name ASC
        `;

        return db.query(q);
    },


    // Get active users (who placed at least one order)
    getActiveUsers: () => {
        let q = `
        SELECT COUNT(DISTINCT user_id_fk) AS active_users
        FROM orders
    `;
        return db.query(q);
    },

    // Get inactive users (registered but never placed an order)
    getInactiveUsers: () => {
        let q = `
        SELECT COUNT(*) AS inactive_users
        FROM users
        WHERE id NOT IN (SELECT DISTINCT user_id_fk FROM orders)
    `;
        return db.query(q);
    },

    // Get user order statistics
    getUserOrderStats: (userId) => {
        let q = `
        SELECT 
            COUNT(*) AS total_orders,
            SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_orders,
            SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending_orders,
            SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) AS rejected_orders,
            SUM(quantity) AS total_units_requested,
            SUM(quantity * price_at_purchase) AS total_money_spent
        FROM orders
        WHERE user_id_fk = ?
    `;
        return db.query(q, [userId]);
    },

    // Get top spending users
    getTopSpendingUsers: (limit) => {
        let q = `
        SELECT user_id_fk, SUM(quantity * price_at_purchase) AS total_spent
        FROM orders
        GROUP BY user_id_fk
        ORDER BY total_spent DESC
        LIMIT ?
    `;
        return db.query(q, [limit]);
    },

    // Get users by state
    getUsersByState: (state) => {
        let q = `SELECT * FROM users WHERE state = ?`;
        return db.query(q, [state]);
    },

    // Get users by district
    getUsersByDistrict: (district) => {
        let q = `SELECT * FROM users WHERE district = ?`;
        return db.query(q, [district]);
    },

    // Get users with most orders
    getUsersWithMostOrders: (limit) => {
        let q = `
        SELECT user_id_fk, COUNT(*) AS total_orders
        FROM orders
        GROUP BY user_id_fk
        ORDER BY total_orders DESC
        LIMIT ?
    `;
        return db.query(q, [limit]);
    },

    // Get users grouped by spending range
    getUsersGroupedBySpendingRange: () => {
        let q = `
        SELECT 
            CASE
                WHEN SUM(quantity * price_at_purchase) BETWEEN 0 AND 5000 THEN '0-5000'
                WHEN SUM(quantity * price_at_purchase) BETWEEN 5001 AND 10000 THEN '5001-10000'
                ELSE '10000+'
            END AS spending_range,
            COUNT(*) AS user_count
        FROM orders
        GROUP BY spending_range
    `;
        return db.query(q);
    }
};


module.exports = userModel;
