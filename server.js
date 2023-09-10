const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

console.log("Logging in the server!!!");

app.use(express.json());

app.use(express.static("public"));

app.use("/get-modules", require("./api/get-modules.js"));
app.use("/get-page-data", require("./api/get-page-data.js"));
app.use("/edit-page-data", require("./api/edit-page-data.js"));

app.get('/pages', (req, res) => {
  res.sendFile(__dirname + '/public/pages.html');
});

app.get('/edit-page', (req, res) => {
  res.sendFile(__dirname + '/public/edit-page.html');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
