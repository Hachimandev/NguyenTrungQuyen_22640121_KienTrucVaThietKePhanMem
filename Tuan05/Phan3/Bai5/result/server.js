const express = require("express");
const { Pool } = require("pg");
const app = express();
const pool = new Pool({
  user: "voteuser",
  host: "postgres",
  database: "votedb",
  password: "votepass",
  port: 5432,
});

app.get("/results", async (req, res) => {
  const result = await pool.query(
    "SELECT choice, count(*) as votes FROM votes GROUP BY choice",
  );
  res.json(result.rows);
});

app.listen(5001, () => console.log("Result service running on 5001"));
