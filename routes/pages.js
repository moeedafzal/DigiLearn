const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.get("/modules", async (req, res) => {
  try {
    const moduleName = req.query.moduleName;
    console.log("moduleName: ", moduleName);
    if (!moduleName) {
      throw new Error("Module name is required");
    }

    const query = `SELECT * FROM modules WHERE modules.name = '${moduleName}'`;

    const client = await pool.connect();
    const module = await client.query(query);
    client.release();

    if (!module.rows.length) {
      throw new Error("Module not found");
    }

    const row = module.rows[0];
    return res.status(200).json({ row });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
