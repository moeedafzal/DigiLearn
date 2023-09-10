const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

console.log("Logging in the server!!!");

app.use(express.json());

app.use(express.static("public"));

app.use("/get-modules", require("./api/get-modules.js"));

app.get('/pages', (req, res) => {
  res.sendFile(__dirname + '/public/pages.html');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
