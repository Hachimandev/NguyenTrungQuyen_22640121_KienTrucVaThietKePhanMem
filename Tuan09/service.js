const express = require("express");
const cors = require("cors");
const mariadb = require("mariadb");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8082;

// 🔌 Kết nối MariaDB
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "sapassword", 
  database: "travel_db",
  connectionLimit: 5
});


// ✅ GET /tours - Lấy danh sách tour
app.get("/tours", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const rows = await conn.query("SELECT * FROM tours");

    res.json({
      success: true,
      data: rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Database error"
    });
  } finally {
    if (conn) conn.release();
  }
});


// ✅ GET /tours/:id - Lấy chi tiết tour
app.get("/tours/:id", async (req, res) => {
  let conn;
  try {
    const id = parseInt(req.params.id);

    conn = await pool.getConnection();

    const rows = await conn.query(
      "SELECT * FROM tours WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Database error"
    });
  } finally {
    if (conn) conn.release();
  }
});


// 🚀 Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Tour Service running at http://0.0.0.0:${PORT}`);
});