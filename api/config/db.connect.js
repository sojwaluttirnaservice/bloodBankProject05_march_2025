const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();


const pool = mysql.createPool(

  {
    // Host
    host: process.env.DB_HOST,
    // User
    user: process.env.DB_USER,
    // Database
    database: process.env.DB_DATABASE,
    // Password
    password: process.env.DB_PASSWORD,
    // Wait for connections
    waitForConnections: true,
    // Port
    port: process.env.DB_PORT,

    connectionLimit: 20,

    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,

    // acquireTimeout: 60000
  }

)


const db = pool.promise();


module.exports = db