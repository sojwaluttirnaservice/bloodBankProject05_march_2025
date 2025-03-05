const { DATE, literal, INTEGER, STRING, ENUM } = require("sequelize");
const sequelize = require("../config/sequelize");

const userSchema = sequelize.define(
    "users",
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        full_name: {
            type: STRING(255),
            allowNull: false,
            comment: "Full name of the user",
        },

        email: {
            type: STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            comment: "User's email address",
        },

        phone: {
            type: STRING(20),
            allowNull: false,
            unique: true,
            comment: "User's phone number",
        },

        password: {
            type: STRING(255),
            allowNull: false,
            comment: "Hashed password for authentication",
        },

        state: {
            type: STRING(100),
            allowNull: true,
            comment: "State of residence",
        },

        user_type: {
            type: ENUM('person', 'hospital'),
            allowNull: true,
            comment: "Type of user",
        },

        district: {
            type: STRING(100),
            allowNull: true,
            comment: "District of residence",
        },

        address: {
            type: STRING(255),
            allowNull: true,
            comment: "Full address of the user",
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
        tableName: "users",
        comment: "Stores registered users' basic details",
    }
);

module.exports = userSchema;
