const { DATE, literal, INTEGER, STRING, ENUM } = require("sequelize");
const sequelize = require("../config/sequelize");
const userSchema = require("./userSchema");
const bloodBankSchema = require("./bloodBankSchema");

const orderSchema = sequelize.define(
    "orders",
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        user_id_fk: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: userSchema,
                key: "id",
            },
            comment: "Reference to the user who placed the order",
        },

        blood_bank_id_fk: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: bloodBankSchema,
                key: "id",
            },
            comment: "Reference to the blood bank fulfilling the order",
        },

        blood_type: {
            type: ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
            allowNull: false,
            comment: "Requested blood type",
        },

        quantity: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "Number of blood units requested (1 unit = 450mL)",
        },

        status: {
            type: ENUM("PENDING", "COMPLETED", "REJECTED"),
            allowNull: false,
            defaultValue: "PENDING",
            comment: "Order status - PENDING, COMPLETED, REJECTED",
        },

        reason: {
            type: STRING(255),
            allowNull: true,
            comment: "Reason for rejection (if status = REJECTED)",
        },

        urgency_level: {
            type: ENUM("NORMAL", "URGENT"),
            allowNull: false,
            defaultValue: "NORMAL",
            comment: "Indicates if the order is an emergency",
        },

        delivery_method: {
            type: ENUM("PICKUP", "DELIVERY"),
            allowNull: true,
            comment: "Indicates whether the user picks up or it's delivered",
        },

        fulfilled_at: {
            type: DATE,
            allowNull: true,
            comment: "Timestamp when the order was completed (if applicable)",
        },

        createdAt: {
            type: DATE,
            defaultValue: literal("CURRENT_TIMESTAMP"),
            comment: "Timestamp when the order was placed",
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        timestamps: true,
        tableName: "orders",
        comment: "Stores blood requests from users",
    }
);

module.exports = orderSchema;
