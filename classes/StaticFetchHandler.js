const db = require("../firebase/databaseOps");
const path = require("path");
const fs = require("fs");

class StaticFetchHandler {
    rootPath;
    constructor() {
        this.rootPath = path.join(__dirname, "..", "jsonData");
    }

  /**
   *
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next Calls next middleware function
   * @returns JSON file with pictures data
   */
  async fetchPictures(req, res, next) {
    const filePath = path.join(this.rootPath, "pics.json");
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
  async fetchTableList(req, res, next) {
    const filePath = path.join(this.rootPath, "tables.json");
    if (fs.existsSync(filePath)) {
      return res.status(200).sendFile(filePath);
    }
    const response = await db.fetchTableList();
    fs.writeFile(filePath, JSON.stringify(response), (err) => {
      if (err) console.log(err);
    });
    return res.status(201).json(response);
  }
}

module.exports = StaticFetchHandler;