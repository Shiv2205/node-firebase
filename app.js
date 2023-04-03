const express = require("express");
const util = require('./util/handleCORS');

const apiEndpoints = require("./endpoints/api-endpoints");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');//GET, POST, ...
    res.setHeader('Access-Control-Allow-Headers', '*'); //Content-Type, Authorization
    next();
});

app.use("/api-endpoints", apiEndpoints);

app.listen(8080);
