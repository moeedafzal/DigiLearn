const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const query = `INSERT INTO contact_forms(name, email_address, message)
    VALUES ('${name}', '${email}', '${message}')`;

    const client = await pool.connect();
    client.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`Added contact information for ${name}`);
    });
    client.release();

    return res.status(200).json({ name, email, message });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
