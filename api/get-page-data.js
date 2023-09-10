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
    const page_details_query = `SELECT page_content, modules.name, modules.title
    FROM pages
    JOIN modules ON modules.id = pages.module_id
    WHERE pages.id = ${page_id}`;
    const all_pages_data_query = `SELECT all_pages.id, all_pages.page_number
    FROM pages p
    JOIN pages all_pages ON all_pages.module_id = p.module_id
    WHERE p.id = ${page_id}`;

    const client = await pool.connect();
    const pageDetailsRes = await client.query(page_details_query);
    const allPagesData = await client.query(all_pages_data_query);
    client.release();

    const pageContentData = pageDetailsRes.rows[0].page_content;
    const moduleName = pageDetailsRes.rows[0].name;
    const moduleTitle = pageDetailsRes.rows[0].title;
    const pageTitle = `${moduleName}: ${moduleTitle}`;

    const parsedContent = pageContentData.content
      ? pageContentData.content
      : JSON.parse(pageContentData).content;

    const pageContent = pageContentData ? parsedContent : null;

    let allPages = allPagesData.rows;

    let nextPageId = null;
    let backPageId = null;

    allPages = allPages.sort((a, b) => a.page_number - b.page_number);

    if (allPages.length > 1) {
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
    }

    const data = {
      page_content: pageContent,
      page_title: pageTitle,
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
