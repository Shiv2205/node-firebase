const express = require("express");

const apiEndpoints = require("./endpoints/api-endpoints");

const app = express();

app.use("/api-endpoints", apiEndpoints);

app.listen(8080);
