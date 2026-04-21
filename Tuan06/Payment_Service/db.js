const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123",
  database: "payment_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
