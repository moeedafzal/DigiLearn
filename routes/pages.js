const express = require('express');
const router = express.Router();
const { Pool } = require('pg'); // PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Database connection URL
  ssl: process.env.NODE_ENV === 'production' // Enable SSL for production
});

// Route to get all pages
router.get('/page', async (req, res) => {
  try {
    res.json("Hello World")
    // const client = await pool.connect();
    // const result = await client.query('SELECT * FROM pages'); // Replace 'pages' with your actual table name
    // client.release();
    // res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a specific page by ID
router.get('/:pageId', async (req, res) => {
  const pageId = req.params.pageId;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pages WHERE id = $1', [pageId]); // Replace 'pages' with your actual table name
    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Page not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes for creating, updating, or deleting pages as needed

module.exports = router;
