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


// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});