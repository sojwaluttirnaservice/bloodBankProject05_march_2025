const db = require("../config/db.connect");

const bloodStockModel = {
    // Add new blood stock entry
    add: (stockData) => {
        let q = `
            INSERT INTO blood_stock (
                blood_bank_id_fk, 
                blood_type, 
                quantity, 
                createdAt, 
                updatedAt
            ) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const insertArray = [
            stockData.blood_bank_id_fk,
            stockData.blood_type,
            stockData.quantity || 0,
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    // Update blood stock quantity
    updateStock: (stockData) => {
        let q = `
            UPDATE blood_stock 
            SET quantity = ?, 
                updatedAt = ? 
            WHERE blood_bank_id_fk = ? 
                AND blood_type = ?
        `;

        const updateArray = [
            stockData.quantity,
            new Date(),
            stockData.blood_bank_id_fk,
            stockData.blood_type
        ];

        return db.query(q, updateArray);
    },

    // Increase stock quantity
    increaseStock: (stockData) => {
        let q = `
            UPDATE blood_stock 
            SET quantity = quantity + ?, 
                updatedAt = ? 
            WHERE blood_bank_id_fk = ? 
                AND blood_type = ?
        `;

        const updateArray = [
            stockData.quantity,
            new Date(),
            stockData.blood_bank_id_fk,
            stockData.blood_type
        ];

        return db.query(q, updateArray);
    },

    // Decrease stock quantity (ensure it doesn't go below 0)
    decreaseStock: (stockData) => {
        let q = `
            UPDATE blood_stock 
            SET quantity = GREATEST(quantity - ?, 0), 
                updatedAt = ? 
            WHERE blood_bank_id_fk = ? 
                AND blood_type = ?
                AND quantity >= ?
        `;

        const updateArray = [
            stockData.quantity,
            new Date(),
            stockData.blood_bank_id_fk,
            stockData.blood_type,
            stockData.quantity
        ];

        return db.query(q, updateArray);
    },

    // Get blood banks with a specific blood type (only if stock > 0)
    getBloodBanksByBloodType: (bloodType, state = null, district = null) => {
        let q = `
            SELECT 
                bb.id, 
                bb.name, 
                bb.state, 
                bb.district, 
                bb.address_lines, 
                bs.quantity
            FROM blood_stock bs
            JOIN blood_banks bb ON bs.blood_bank_id_fk = bb.id
            WHERE bs.blood_type = ? 
                AND bs.quantity > 0
        `;

        const queryParams = [bloodType];

        if (state) {
            q += ` AND bb.state = ?`;
            queryParams.push(state);
        }

        if (district) {
            q += ` AND bb.district = ?`;
            queryParams.push(district);
        }

        return db.query(q, queryParams);
    }
};

module.exports = bloodStockModel;
