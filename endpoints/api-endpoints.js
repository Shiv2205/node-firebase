const express = require("express");
const db = require("../firebase/databaseOps");
const path = require("path");
const fs = require("fs");

const router = express.Router();
router.use(express.json());

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.removeHeader('x-powered-by');
  res.setHeader("Access-Control-Allow-Methods", req.method); //"GET,OPTIONS,POST,DELETE,PATCH,PUT"
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //Content-Type, Authorization
  //res.status(200);
  next();
});

// api-endpoints/fetchpics, GET method
router.get("/fetchpics", fetchPictures);
router.get("/fetchtables", fetchTableList);
router.get("/fetchwishes", fetchWishes);

// api-endpoints/post/, POST method
router.post('/post/makewish', makeWish);

module.exports = router;

const rootPath = path.join(__dirname, "..", "jsonData");

/**
 *
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Calls next middleware function
 * @returns JSON file with pictures data
 */
async function fetchPictures(req, res, next) {
  const filePath = path.join(rootPath, "pics.json");
  if (fs.existsSync(filePath)) {
    return res.status(200).sendFile(filePath);
  }
  const response = await db.fetchPictures();
  fs.writeFile(filePath, JSON.stringify(response), (err) => {
    if (err) console.log(err);
  });
  return res.status(201).json(response);
}

/**
 *
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Calls next middleware function
 * @returns JSON file with tables data
 */
async function fetchTableList(req, res, next) {
  const filePath = path.join(rootPath, "tables.json");
  if (fs.existsSync(filePath)) {
    return res.status(200).sendFile(filePath);
  }
  const response = await db.fetchTableList();
  fs.writeFile(filePath, JSON.stringify(response), (err) => {
    if (err) console.log(err);
  });
  return res.status(201).json(response);
}

/**
 *
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Calls next middleware function
 * @returns JSON file with wishes data
 */
async function fetchWishes(req, res, next) {
  const filePath = path.join(rootPath, "wishes.json");
  if (fs.existsSync(filePath)) {
    return res.status(200).sendFile(filePath);
  }
  const response = await db.fetchWishes();
  fs.writeFile(filePath, JSON.stringify(response), (err) => {
    if (err) console.log(err);
  });
  return res.status(201).json(response);
}

/**
 *
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Calls next middleware function
 * @returns JSON file with wishes data
 */
async function makeWish(req, res, next) {
    const filePath = path.join(rootPath, "wishes.json");
    const wishObj = req.body.json();
    await db.makeWish(wishObj.wish, wishObj.isAdmin);

    return res.status(201);
  }
