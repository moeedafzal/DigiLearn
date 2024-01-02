const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.get("/", async (req, res) => {
  try {
    const modules_data_query = `SELECT title, heading, description, index, entry_page_number
    From modules`;

    const client = await pool.connect();
    const modulesDataRes = await client.query(modules_data_query);
    client.release();

    const modulesData = modulesDataRes.rows.sort((a, b) => a.index - b.index);

    return res.status(200).json({ data: modulesData });
  } catch (error) {
    console.error("Error fetching modules:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
