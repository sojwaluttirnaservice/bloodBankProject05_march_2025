const { DATE, literal, INTEGER, STRING, ENUM } = require("sequelize");
const sequelize = require("../config/sequelize");
const bloodBankSchema = require("./bloodBankSchema");

const bloodStockSchema = sequelize.define(
    "blood_stock",
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        blood_bank_id_fk: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: bloodBankSchema,
                key: "id",
            },
            unique: "unique_blood_bank_type",  // Unique combination
            comment: "Reference to the blood bank",
        },

        blood_type: {
            type: ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
            allowNull: false,
            unique: "unique_blood_bank_type",  // Unique combination
            comment: "Blood type (ENUM for fixed values)",
        },

        quantity: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "Number of blood units available",
        },

        createdAt: {
            type: DATE,
            defaultValue: literal("CURRENT_TIMESTAMP"),
            comment: "Timestamp when stock was created",
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal("CURRENT_TIMESTAMP"),
            comment: "Timestamp when stock was last updated",
        },
    },
    {
        timestamps: true,
        tableName: "blood_stock",
        comment: "Stores blood stock availability per blood bank",
        indexes: [
            {
                unique: true,
                fields: ["blood_bank_id_fk", "blood_type"],  // Ensures unique combination
            },
        ],
    }
);

module.exports = bloodStockSchema;
