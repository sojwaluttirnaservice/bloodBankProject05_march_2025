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

    // Get user list
    list: () => {
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
            ORDER BY full_name ASC
        `;

        return db.query(q);
    },
};


module.exports = userModel;
