const db = require("../config/db.connect");



const bloodBanksModel = {
    /**
     * Adds a new blood bank to the database.
     * @param {Object} bankData - Blood bank details.
     * @returns {Promise} - Database query result.
     */
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
            bankData.availability_status ?? true,
            bankData.operating_hours || null,
            bankData.verified ?? false,
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    /**
     * Updates an existing blood bank's details.
     * @param {Object} bankData - Updated blood bank details.
     * @returns {Promise} - Database query result.
     */
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
            bankData.availability_status ?? true,
            bankData.operating_hours || null,
            bankData.verified ?? false,
            new Date(),
            bankData.id
        ];

        return db.query(q, updateArray);
    },

    /**
     * Retrieves all blood banks with optional filters.
     * @param {Object} [filters] - Optional filters (state, district, availability).
     * @returns {Promise} - List of blood banks.
     */
    // getAll: (filters = {}) => {
    //     let q = `SELECT * FROM blood_banks WHERE 1=1`;
    //     let params = [];

    //     if (filters.state) {
    //         q += ` AND state = ?`;
    //         params.push(filters.state);
    //     }
    //     if (filters.district) {
    //         q += ` AND district = ?`;
    //         params.push(filters.district);
    //     }
    //     if (filters.availability_status !== undefined) {
    //         q += ` AND availability_status = ?`;
    //         params.push(filters.availability_status);
    //     }

    //     return db.query(q, params);
    // },


    /**
 * Retrieves all blood banks with optional filters, including total blood stock, total requests, and total revenue.
 * @param {Object} [filters] - Optional filters (state, district, availability_status).
 * @returns {Promise} - List of blood banks with additional metrics.
 */
    getAll: (filters = {}) => {
        let q = `
            SELECT 
                bb.*, 
                COALESCE(SUM(bs.quantity), 0) AS total_blood_stock,
                COALESCE(COUNT(DISTINCT o.id), 0) AS total_requests,
                COALESCE(SUM(CASE WHEN o.status = 'COMPLETED' THEN o.quantity * o.price_at_purchase ELSE 0 END), 0) AS total_revenue
            FROM blood_banks bb
            LEFT JOIN blood_stock bs ON bb.id = bs.blood_bank_id_fk
            LEFT JOIN orders o ON bb.id = o.blood_bank_id_fk
            WHERE 1=1
        `;

        let params = [];

        // Apply Filters
        if (filters.state) {
            q += ` AND bb.state = ?`;
            params.push(filters.state);
        }
        if (filters.district) {
            q += ` AND bb.district = ?`;
            params.push(filters.district);
        }
        if (filters.availability_status !== undefined) {
            q += ` AND bb.availability_status = ?`;
            params.push(filters.availability_status);
        }

        q += ` 
            GROUP BY bb.id
            ORDER BY bb.name ASC
        `;

        return db.query(q, params);
    },
    /**
     * Retrieves a blood bank by its ID.
     * @param {number} id - Blood bank ID.
     * @returns {Promise} - Blood bank details.
     */
    getById: (id) => {
        let q = `SELECT * FROM blood_banks WHERE id = ?`;
        return db.query(q, [id]);
    },

    // getByEmail: (email) => {
    //     let q = `SELECT * FROM blood_banks WHERE email = ?`;
    //     return db.query(q, [email]);
    // },


    /**
     * Soft deletes a blood bank by marking it as unavailable.
     * @param {number} id - Blood bank ID.
     * @returns {Promise} - Database query result.
     */
    delete: (id) => {
        let q = `UPDATE blood_banks SET availability_status = false WHERE id = ?`;
        return db.query(q, [id]);
    },

    /**
     * Retrieves blood bank statistics including total count, verified count, and active blood banks.
     * @returns {Promise} - Blood bank statistics.
     */
    getStats: () => {
        let q = `
            SELECT 
                COUNT(*) AS total_banks, 
                SUM(CASE WHEN verified = true THEN 1 ELSE 0 END) AS verified_banks,
                SUM(CASE WHEN availability_status = true THEN 1 ELSE 0 END) AS active_banks
            FROM blood_banks
        `;
        return db.query(q);
    },

    /**
     * Searches blood banks by name (partial match).
     * @param {string} searchQuery - Search keyword.
     * @returns {Promise} - List of matching blood banks.
     */
    searchByName: (searchQuery) => {
        let q = `SELECT * FROM blood_banks WHERE name LIKE ?`;
        return db.query(q, [`%${searchQuery}%`]);
    },

    /**
     * Gets blood banks near a given latitude and longitude within a radius.
     * @param {number} lat - Latitude.
     * @param {number} lng - Longitude.
     * @param {number} radius - Radius in kilometers.
     * @returns {Promise} - List of nearby blood banks.
     */
    getNearbyBanks: (lat, lng, radius = 10) => {
        let q = `
            SELECT *, 
                (6371 * acos(
                    cos(radians(?)) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians(?)) + 
                    sin(radians(?)) * sin(radians(latitude))
                )) AS distance
            FROM blood_banks
            HAVING distance <= ?
            ORDER BY distance
        `;
        return db.query(q, [lat, lng, lat, radius]);
    },

    getBloodBankByEmail: (email) => {
        return db.query(`SELECT * FROM blood_banks WHERE email = ?`, [email])
    },

    // search: (filters) => {
    //     let { bloodType, state, district, bloodBankId, searchName, availability, verified } = filters;

    //     let query = `
    //         SELECT 
    //             bb.id, 
    //             bb.name, 
    //             bb.state, 
    //             bb.district, 
    //             bb.address_lines, 
    //             bb.latitude, 
    //             bb.longitude, 
    //             bb.operating_hours, 
    //             bb.verified, 
    //             JSON_ARRAYAGG(bs.blood_type) AS available_blood_types,
    //             SUM(bs.quantity) AS total_quantity
    //         FROM blood_banks bb
    //         LEFT JOIN blood_stock bs ON bb.id = bs.blood_bank_id_fk
    //         WHERE 1=1
    //     `;

    //     let queryParams = [];

    //     // Apply Filters
    //     if (bloodType) {
    //         query += ` AND bs.blood_type = ?`;
    //         queryParams.push(bloodType);
    //     }
    //     if (state) {
    //         query += ` AND bb.state LIKE ?`;
    //         queryParams.push(`%${state}%`);
    //     }
    //     if (district) {
    //         query += ` AND bb.district LIKE ?`;
    //         queryParams.push(`%${district}%`);
    //     }
    //     if (bloodBankId) {
    //         query += ` AND bb.id = ?`;
    //         queryParams.push(bloodBankId);
    //     }
    //     if (searchName) {
    //         query += ` AND bb.name LIKE ?`;
    //         queryParams.push(`%${searchName}%`);
    //     }
    //     if (availability === "true") {
    //         query += ` AND bs.quantity > 0`;
    //     }
    //     if (verified === "true") {
    //         query += ` AND bb.verified = 1`;
    //     }

    //     query += ` 
    //         GROUP BY bb.id 
    //         ORDER BY bb.name ASC
    //     `;

    //     return db.query(query, queryParams);
    // }


    search: (filters) => {
        let { bloodType, state, district, bloodBankId, searchName, availability, verified } = filters;

        let query = `
            SELECT 
                bb.id, 
                bb.name, 
                bb.state, 
                bb.district, 
                bb.address_lines, 
                bb.latitude, 
                bb.longitude, 
                bb.operating_hours, 
                bb.verified,
                JSON_ARRAYAGG(bs.blood_type) AS available_blood_types,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'blood_type', bs.blood_type, 
                        'price_per_unit', bs.price_per_unit
                    )
                ) AS available_blood_types_prices,
                SUM(bs.quantity) AS total_quantity
            FROM blood_banks bb
            LEFT JOIN blood_stock bs ON bb.id = bs.blood_bank_id_fk
            WHERE 1=1
        `;

        let queryParams = [];

        // Apply Filters
        if (bloodType) {
            query += ` AND bs.blood_type = ?`;
            queryParams.push(bloodType);
        }
        if (state) {
            query += ` AND bb.state LIKE ?`;
            queryParams.push(`%${state}%`);
        }
        if (district) {
            query += ` AND bb.district LIKE ?`;
            queryParams.push(`%${district}%`);
        }
        if (bloodBankId) {
            query += ` AND bb.id = ?`;
            queryParams.push(bloodBankId);
        }
        if (searchName) {
            query += ` AND bb.name LIKE ?`;
            queryParams.push(`%${searchName}%`);
        }
        if (availability === "true") {
            query += ` AND bs.quantity > 0`;
        }
        if (verified === "true") {
            query += ` AND bb.verified = 1`;
        }

        query += ` 
            GROUP BY bb.id 
            ORDER BY bb.name ASC
        `;

        return db.query(query, queryParams);
    }


};

module.exports = bloodBanksModel;
