const express = require("express");
const util = require("./util/handleCORS");

const apiEndpoints = require("./endpoints/api-endpoints");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,DELETE,PATCH,PUT");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //Content-Type, Authorization
  res.status(200);
  next();
});

app.use("/api-endpoints", apiEndpoints);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
