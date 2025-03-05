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
};

module.exports = adminModel;
