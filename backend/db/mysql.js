require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
  port: process.env.DB_PORT, // important
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Railway requires SSL
  }
});

module.exports = db.promise();