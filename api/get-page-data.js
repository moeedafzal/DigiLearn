const express = require("express");
const router = express.Router();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

router.get("/", async (req, res) => {
  const page_number = req.query.pageNumber;

  try {
    const page_details_query = `SELECT page_content, title
    FROM pages
    WHERE pages.page_number = ${page_number}`;

    const all_pages_data_query = `SELECT title, page_number
    FROM pages
    ORDER BY page_number asc`;

    const client = await pool.connect();
    const pageDetailsRes = await client.query(page_details_query);
    const allPagesData = await client.query(all_pages_data_query);
    client.release();

    const pageContentData = pageDetailsRes.rows[0].page_content;
    const page_title = pageDetailsRes.rows[0].title;

    const parsedContent = pageContentData.content
      ? pageContentData.content
      : JSON.parse(pageContentData).content;

    const page_content = pageContentData ? parsedContent : null;

    const allPages = allPagesData.rows;
    const last_page_number = allPages[allPages.length - 1].page_number;
    let all_pages_data = [];
    allPages.forEach((page) => {
      all_pages_data.push({ page_number: page.page_number, title: page.title });
    });


    const data = {
      page_title,
      page_content,
      all_pages_data,
      last_page_number,
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
