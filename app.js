const express = require("express");
const util = require("./util/handleCORS");

const apiEndpoints = require("./endpoints/api-endpoints");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT"); //GET, POST, ...
  //res.setHeader('Access-Control-Allow-Headers', '*'); //Content-Type, Authorization
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.status(200);
  next();
});

app.use("/api-endpoints", apiEndpoints);

app.listen(8080);
