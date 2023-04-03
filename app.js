const express = require("express");
const CORS = require('./util/handleCORS');

const apiEndpoints = require("./endpoints/api-endpoints");

const app = express();

app.use(CORS);

app.use("/api-endpoints", apiEndpoints);

app.listen(8080);
