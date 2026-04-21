const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const { processPayment } = require("./services/paymentService");
const { sendNotification } = require("./services/notificationService");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST /payments
app.post("/payments", async (req, res) => {
  try {
    const { orderId, userId, method } = req.body;

    if (!orderId || !userId || !method) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const status = await processPayment(orderId, userId, method);

    sendNotification(userId, orderId);

    res.json({
      message: "Payment successful",
      orderId,
      paymentStatus: status,
      note: "Frontend cần gọi Order Service để update trạng thái đơn",
    });
  } catch (error) {
    console.error("❌ Payment error:", error.message);

    res.status(500).json({
      message: "Payment failed",
    });
  }
});

app.get("/payments", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM payments");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching payments" });
  }
});

async function testDB() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MariaDB");
    conn.release();
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
}

testDB();

const PORT = 8084;
app.listen(PORT, () => {
  console.log(`🚀 Payment Service running at http://localhost:${PORT}`);
});
