const db = require("../config/db.connect");

const bloodBankModel = {
    // Add a new blood bank
    add: (bankData) => {
        let q = `
            INSERT INTO blood_banks (
                name, 
                email, 
                phone, 
                password, 
                state, 
                district, 
                address_lines, 
                latitude, 
                longitude, 
                availability_status, 
                operating_hours, 
                verified, 
                createdAt, 
                updatedAt
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertArray = [
            bankData.name,
            bankData.email,
            bankData.phone,
            bankData.password,
            bankData.state,
            bankData.district,
            bankData.address_lines,
            bankData.latitude || null,
            bankData.longitude || null,
            bankData.availability_status || true,
            bankData.operating_hours || null,
            bankData.verified || false,
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    // Update blood bank details
    update: (bankData) => {
        let q = `
            UPDATE blood_banks 
            SET 
                name = ?, 
                email = ?, 
                phone = ?, 
                password = ?, 
                state = ?, 
                district = ?, 
                address_lines = ?, 
                latitude = ?, 
                longitude = ?, 
                availability_status = ?, 
                operating_hours = ?, 
                verified = ?, 
                updatedAt = ?
            WHERE id = ?
        `;

        const updateArray = [
            bankData.name,
            bankData.email,
            bankData.phone,
            bankData.password,
            bankData.state,
            bankData.district,
            bankData.address_lines,
            bankData.latitude || null,
            bankData.longitude || null,
            bankData.availability_status || true,
            bankData.operating_hours || null,
            bankData.verified || false,
            new Date(),
            bankData.id
        ];

        return db.query(q, updateArray);
    }
};

module.exports = bloodBankModel;