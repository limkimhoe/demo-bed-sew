const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var app = require("./controller");

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 5000

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }.`);
});