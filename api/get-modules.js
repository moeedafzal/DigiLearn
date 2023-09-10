const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.get("/", async (req, res) => {
  try {
    const query = `SELECT m.id, m.name, m.title, m.description, m.total_pages, p.id as "page_id"
    FROM modules m
    JOIN pages p ON p.module_id = m.id WHERE page_number = 1
    ORDER BY m.id`;

    const client = await pool.connect();
    const modules = await client.query(query);
    client.release();

    if (!modules.rows.length) {
      throw new Error("No modules found");
    }

    const rows = modules.rows;
    return res.status(200).json({ rows });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
