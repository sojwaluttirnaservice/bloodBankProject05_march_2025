const { DATE, literal, INTEGER, STRING, BOOLEAN, DECIMAL } = require("sequelize");
const sequelize = require("../config/sequelize");

const bloodBankSchema = sequelize.define(
    "blood_banks",
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: STRING(255),
            allowNull: false,
            unique: true,
            comment: "Vendor's name",
        },

        email: {
            type: STRING(255),
            allowNull: false,
            unique: true,
            comment: "Vendor's email",
        },

        phone: {
            type: STRING(20),
            allowNull: false,
            comment: "Vendor's phone number",
        },

        password: {
            type: STRING(255),
            allowNull: false,
            comment: "Vendor's password",
        },

        state: {
            type: STRING(100),
            allowNull: false,
            comment: "State where the blood bank is located"
        },

        district: {
            type: STRING(100),
            allowNull: false,
            comment: "District where the blood bank is located"
        },

        address_lines: {
            type: STRING(255),
            allowNull: false,
            comment: "Detailed address lines of the blood bank"
        },

        latitude: {
            type: DECIMAL(10, 8),
            allowNull: true,
            comment: "Latitude coordinate for precise location search"
        },

        longitude: {
            type: DECIMAL(11, 8),
            allowNull: true,
            comment: "Longitude coordinate for precise location search"
        },

        availability_status: {
            type: BOOLEAN,
            defaultValue: true,
            comment: "Indicates if the blood bank is actively accepting requests"
        },

        operating_hours: {
            type: STRING(100),
            allowNull: true,
            comment: "Operating hours of the blood bank"
        },

        verified: {
            type: BOOLEAN,
            defaultValue: false,
            comment: "Verification status of the blood bank"
        },

        createdAt: {
            type: DATE,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        timestamps: true,
        tableName: "blood_banks",
        comment: "Stores blood banks registration details",
    }
);

module.exports = bloodBankSchema;
