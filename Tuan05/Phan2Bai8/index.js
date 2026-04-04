const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Tạo connection tới MySQL
const db = mysql.createConnection({
  host: "mysql", // QUAN TRỌNG: tên service
  user: "user",
  password: "password",
  database: "mydb",
});

// Kết nối DB
db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// API test
app.get("/", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) {
      return res.send("DB Error");
    }
    res.send(`Kết quả: ${results[0].result}`);
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
