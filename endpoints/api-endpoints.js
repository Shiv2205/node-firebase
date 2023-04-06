const express = require("express");
const Wish = require('../classes/Wish');
const StaticFetchHandler = require('../classes/StaticFetchHandler');

const router = express.Router();
const wishHandler = new Wish();
const fetchHandler = new StaticFetchHandler();

router.use(express.json());

// api-endpoints/fetchpics, GET method
router.get("/fetchpics", fetchHandler.fetchPictures);
router.get("/fetchtables", fetchHandler.fetchTableList);
router.get("/fetchwishes", wishHandler.fetchWishes);

// api-endpoints/post/, POST method
router.post('/post/makewish', wishHandler.makeWish);

module.exports = router;
