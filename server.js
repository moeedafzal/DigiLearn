const express = require("express");

// Creates an express application
const app = express();

const port = process.env.PORT || 3000;

console.log("Logging in the server!!!");

// We get the data in static json format
app.use(express.json());
app.use(express.static("public"));

// Defining API endpoints
app.use("/get-modules", require("./api/get-modules.js"));
app.use("/get-page-data", require("./api/get-page-data.js"));
app.use("/edit-page-data", require("./api/edit-page-data.js"));
app.use("/insert_contact_information", require("./api/insert_contact_information.js"));

// Handling requests
app.get('/pages', (req, res) => {
  res.sendFile(__dirname + '/public/pages.html');
});

app.get('/edit-page', (req, res) => {
  res.sendFile(__dirname + '/public/edit-page.html');
});

// Initiates our site on Port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
