const db = require("../config/db.connect");

const adminModel = {
    // Add a new admin
    add: (adminData) => {
        let q = `INSERT INTO admins (username, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;

        const insertArray = [
            adminData.username,
            adminData.password,
            adminData.role || 'admin',
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    // Get admin by username
    getAdminByUsername: (username) => {
        let q = `SELECT * FROM admins WHERE username = ?`;
        return db.query(q, [username]);
    },

    // Get admin by ID
    getById: (adminId) => {
        let q = `SELECT * FROM admins WHERE id = ?`;
        return db.query(q, [adminId]);
    },

    getAdminDashboardStats: () => {
        let q = `
            SELECT 
                /* Total Users */
                (SELECT COUNT(*) FROM users) AS total_users,
    
                /* Total Blood Banks */
                (SELECT COUNT(*) FROM blood_banks) AS total_blood_banks,
    
                /* Total Orders */
                (SELECT COUNT(*) FROM orders) AS total_orders,
    
                /* Completed Orders */
                (SELECT COUNT(*) FROM orders WHERE status = 'COMPLETED') AS completed_orders,
    
                /* Pending Orders */
                (SELECT COUNT(*) FROM orders WHERE status = 'PENDING') AS pending_orders,
    
                /* Rejected Orders */
                (SELECT COUNT(*) FROM orders WHERE status = 'REJECTED') AS rejected_orders,
    
                /* Urgent Orders */
                (SELECT COUNT(*) FROM orders WHERE urgency_level = 'URGENT') AS urgent_orders,
    
                /* Normal Orders */
                (SELECT COUNT(*) FROM orders WHERE urgency_level = 'NORMAL') AS normal_orders,
    
                /* Total Blood Units Ordered */
                (SELECT SUM(quantity) FROM orders) AS total_blood_units_ordered,
    
                /* Total Revenue from Completed Orders (Revenue for Blood Banks) */
                (SELECT SUM(quantity * price_at_purchase) FROM orders WHERE status = 'COMPLETED') AS total_revenue_generated,
    
                /* Total Money Spent by Users */
                (SELECT SUM(quantity * price_at_purchase) FROM orders WHERE status = 'COMPLETED') AS total_money_spent_by_users,
    
                /* Total Orders Placed by Users */
                (SELECT COUNT(*) FROM orders WHERE user_id_fk IS NOT NULL) AS total_orders_by_users,
    
                /* Total Orders Handled by Blood Banks */
                (SELECT COUNT(*) FROM orders WHERE blood_bank_id_fk IS NOT NULL) AS total_orders_by_blood_banks,
    
                /* Total Blood Units Available in All Blood Banks */
                (SELECT SUM(quantity) FROM blood_stock) AS total_blood_stock_available
        `;

        return db.query(q);
    },


};

module.exports = adminModel;
