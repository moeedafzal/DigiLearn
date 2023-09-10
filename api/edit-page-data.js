const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const pageId = body.pageId;
    let page_content = JSON.stringify({ content: `${body.content}` });

    const client = await pool.connect();
    const res = await client.query(
      `UPDATE pages SET page_content = $1 WHERE id = $2`,
      [JSON.stringify(page_content), pageId],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(`Page modified with ID: ${pageId}`);
      }
    );
    client.release();

    return res.status(200).json({ body });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
