// Importing the Sequelize package for ORM functionality
const Sequelize = require('sequelize');

// Importing the dotenv package to load environment variables from .env file
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

// Creating a new Sequelize instance with MySQL connection details
const sequelize = new Sequelize(
    process.env.DB_DATABASE,     // Database name from environment variables
    process.env.DB_USER,         // Database user from environment variables
    process.env.DB_PASSWORD,     // Database password from environment variables
    {
        dialect: 'mysql',        // Specifies MySQL as the database dialect (for compatibility with MySQL)
        host: process.env.DB_HOST, // Database host (e.g., localhost or remote IP) from environment variables
        define: {
            freezeTableName: true, // Ensures that Sequelize will not pluralize table names automatically
        },
        charset: 'utf8mb4',       // Specifies the character set for the MySQL connection (utf8mb4 supports more characters like emojis)
        collate: 'utf8mb4_general_ci', // Specifies the collation for the MySQL connection (determines how text is compared/sorted in the database)
    }
);

// Exporting the sequelize instance so it can be used in other parts of the application (for querying, syncing, etc.)
module.exports = sequelize;
