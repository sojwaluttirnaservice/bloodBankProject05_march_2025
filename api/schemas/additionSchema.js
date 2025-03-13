const { INTEGER, STRING, DATE, literal, ENUM, TEXT } = require("sequelize");
const sequelize = require("../config/sequelize");
const bloodBankSchema = require("./bloodBankSchema");




const additionSchema = sequelize.define(
    "additions",

    {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        blood_type: {
            type: ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
            allowNull: false,
            comment: "Blood type (ENUM for fixed values)",
        },

        quantity: {
            type: INTEGER,
            allowNull: false,
            comment: 'Quantity of blood added'
        },


        blood_bank_id_fk: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: bloodBankSchema,
                key: 'id'
            },
            comment: "Id of the blood bank which added the quantity"
        },

        remarks: {
            type: TEXT,
            allowNull: true,
            comment: "Any additional remarks just in case"
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: ""
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: ""
        }
    },
    {
        timestamps: true,
        comment: "Table storing the admins"
    }
);

module.exports = additionSchema;
