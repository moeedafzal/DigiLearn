const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.get("/", async (req, res) => {
  const page_id = req.query.pageId;

  try {
    const page_content_query = `SELECT page_content FROM pages  WHERE pages.id = ${page_id}`;
    const all_pages_data_query = `SELECT all_pages.id, all_pages.page_number
    FROM pages p
    JOIN pages all_pages ON all_pages.module_id = p.module_id
    WHERE p.id = ${page_id}`;

    const client = await pool.connect();
    const pageContentDataRes = await client.query(page_content_query);
    const allPagesData = await client.query(all_pages_data_query);
    client.release();

    const pageContentData = pageContentDataRes.rows[0].page_content;

    const pageContent = pageContentData ? pageContentData.content : null;

    let allPages = allPagesData.rows;

    let nextPageId = null;
    let backPageId = null;

    allPages = allPages.sort((a, b) => a.page_number - b.page_number);

    for (let i = 0; i < allPages.length; i++) {
      if (allPages[i].id == page_id) {
        if (i == 0) {
          backPageId = null;
          nextPageId = allPages[i + 1].id;
        } else if (i == allPages.length - 1) {
          backPageId = allPages[i - 1].id;
          nextPageId = null;
        } else {
          backPageId = allPages[i - 1].id;
          nextPageId = allPages[i + 1].id;
        }
      }
    }

    const data = {
      page_content: pageContent,
      next_page_id: nextPageId,
      back_page_id: backPageId,
    };

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
