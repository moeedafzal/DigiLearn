const express = require('express');
const app = express();
const routes = require('./routes/pages.js')
const port = process.env.PORT || 3000; // Use the specified port or default to 3000
const { Pool } = require('pg'); // PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Database connection URL
  ssl: process.env.NODE_ENV === 'production' // Enable SSL for production
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));

// Define your API routes (e.g., /api/modules, /api/pages)
// app.use('/api/modules', require('./routes/modules'));
app.use('/', routes);
// app.use('/api/sections', require('./routes/sections'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
