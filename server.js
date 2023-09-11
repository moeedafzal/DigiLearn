// Importing the express library
const express = require("express");

// Creates an express application
const app = express();

// Sets the port number from the environment variables or default to 3000
const port = process.env.PORT || 3000;

// Log a message to the console for debugging purposes
console.log("Logging in the server!!!");

// Enables parsing of JSON objects in the body of HTTP requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Using the external route handlers for different API endpoints
// Using the "get-modules" route handler for the "/get-modules" endpoint
app.use("/get-modules", require("./api/get-modules.js"));
// Using the "get-page-data" route handler for the "/get-page-data" endpoint
app.use("/get-page-data", require("./api/get-page-data.js"));
// Using the "edit-page-data" route handler for the "/edit-page-data" endpoint
app.use("/edit-page-data", require("./api/edit-page-data.js"));

// Handles requests to the "/pages" endpoint and serve the 'pages.html' file
app.get('/pages', (req, res) => {
  res.sendFile(__dirname + '/public/pages.html');
});

// Handles requests to the "/edit-page" endpoint and serve the 'edit-page.html' file
app.get('/edit-page', (req, res) => {
  res.sendFile(__dirname + '/public/edit-page.html');
});

// Starts the Express server on the given port
app.listen(port, () => {
  // Logs a message indicating on which port the server is running
  console.log(`Server is running on port ${port}`);
});
