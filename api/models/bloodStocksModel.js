const db = require("../config/db.connect");

const bloodStocksModel = {
    /**
     * Adds a new blood stock entry.
     * @param {Object} stockData - Blood stock details.
     * @returns {Promise} - Database query result.
     */
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

    /**
     * Updates blood stock quantity.
     * @param {Object} stockData - Updated blood stock details.
     * @returns {Promise} - Database query result.
     */
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

    updatePrice: (updatedStockDetails) => {
        let q = `
            INSERT INTO blood_stock (blood_bank_id_fk, blood_type, price_per_unit, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())
            ON DUPLICATE KEY UPDATE 
                price_per_unit = VALUES(price_per_unit),
                updatedAt = NOW()
        `;

        const updateArray = [
            updatedStockDetails.blood_bank_id_fk,
            updatedStockDetails.blood_type,
            updatedStockDetails.price_per_unit
        ];

        return db.query(q, updateArray);
    },


    /**
 * Increases blood stock quantity or inserts a new entry if not existing.
 * @param {Object} stockData - Blood stock details with increment amount.
 * @returns {Promise} - Database query result.
 */
    increaseStock: (stockData) => {
        let q = `
        INSERT INTO blood_stock (blood_bank_id_fk, blood_type, quantity, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE 
            quantity = quantity + VALUES(quantity), 
            updatedAt = NOW()
    `;

        const updateArray = [
            stockData.blood_bank_id_fk,
            stockData.blood_type,
            stockData.quantity
        ];

        return db.query(q, updateArray);
    },

    /**
     * Decreases blood stock quantity but ensures it doesn't go below 0.
     * If the combination does not exist, it does nothing.
     * @param {Object} stockData - Blood stock details with decrement amount.
     * @returns {Promise} - Database query result.
     */
    decreaseStock: (stockData) => {
        let q = `
        UPDATE blood_stock 
        SET quantity = GREATEST(quantity - ?, 0), 
            updatedAt = NOW()
        WHERE blood_bank_id_fk = ? 
            AND blood_type = ? 
            AND quantity >= ?
    `;

        const updateArray = [
            stockData.quantity,
            stockData.blood_bank_id_fk,
            stockData.blood_type,
            stockData.quantity
        ];

        return db.query(q, updateArray);
    },


    /**
     * Retrieves blood banks with a specific blood type and optional location filtering.
     * @param {string} bloodType - Blood type.
     * @param {string} [state] - Optional state filter.
     * @param {string} [district] - Optional district filter.
     * @returns {Promise} - List of matching blood banks.
     */
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
    },

    /**
     * Retrieves total stock for each blood type across all blood banks.
     * @returns {Promise} - Stock summary.
     */
    getTotalStockSummary: () => {
        let q = `
            SELECT 
                blood_type, 
                SUM(quantity) AS total_units 
            FROM blood_stock 
            GROUP BY blood_type
        `;

        return db.query(q);
    },

    /**
     * Retrieves stock levels for a specific blood bank.
     * @param {number} bloodBankId - Blood bank ID.
     * @returns {Promise} - Stock details for the blood bank.
     */
    getStockByBloodBank: (bloodBankId) => {
        let q = `
            SELECT 
                blood_type, 
                quantity,
                price_per_unit
            FROM blood_stock 
            WHERE blood_bank_id_fk = ?
        `;

        return db.query(q, [bloodBankId]);
    },

    /**
     * Retrieves stock history for tracking stock changes.
     * @param {number} bloodBankId - Blood bank ID.
     * @returns {Promise} - Stock change history.
     */
    getStockHistory: (bloodBankId) => {
        let q = `
            SELECT 
                blood_type, 
                quantity, 
                price_per_unit,
                updatedAt 
            FROM blood_stock 
            WHERE blood_bank_id_fk = ?
            ORDER BY updatedAt DESC
        `;

        return db.query(q, [bloodBankId]);
    },


    getBloodStockByBloodType: (bloodType, bloodBankId) => {
        let q = `
            SELECT COALESCE(quantity, 0) AS stock_quantity 
            FROM blood_stock 
            WHERE blood_type = ? AND blood_bank_id_fk = ?
        `;

        return db.query(q, [bloodType, bloodBankId]);
    },


    /**
     * Checks if a blood stock entry exists for a given blood bank and type.
     * @param {number} bloodBankId - Blood bank ID.
     * @param {string} bloodType - Blood type.
     * @returns {Promise} - True if exists, False otherwise.
     */
    stockExists: (bloodBankId, bloodType) => {
        let q = `
            SELECT COUNT(*) AS count 
            FROM blood_stock 
            WHERE blood_bank_id_fk = ? 
                AND blood_type = ?
        `;

        return db.query(q, [bloodBankId, bloodType]).then(result => result[0].count > 0);
    },


    addToAddtionRecord: (recordData) => {
        let q = `INSERT INTO additions
                (
                    blood_type,
                    quantity,
                    blood_bank_id_fk
                ) VALUES (?, ?, ?)`

        return db.query(q, [recordData.blood_type, recordData.quantity, recordData.blood_bank_id_fk])
    }
};

module.exports = bloodStocksModel;
