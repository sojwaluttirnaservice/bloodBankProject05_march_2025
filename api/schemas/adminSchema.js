
const { INTEGER, STRING, DATE, literal } = require("sequelize");
const sequelize = require("../config/sequelize");




const adminSchema = sequelize.define(
    "admins",

    {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        username: {
            type: STRING,
            unique: true,
            allowNull: false,
            comment: "Username of the admin"
        },

        password: {
            type: STRING,
            allowNull: false,
            validate: {
                min: 5,
                notEmpty: true,
                notNull: true,
            },
            comment: "Password of the admin"
        },


        role: {
            type: STRING,
            allowNull: false,
            defaultValue: 'admin',
            validate: {
                isIn: [['admin']],
            },
            comment: "Role of the admin (admin)"
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

module.exports = adminSchema;

