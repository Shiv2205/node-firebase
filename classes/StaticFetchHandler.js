const db = require("../firebase/databaseOps");

class StaticFetchHandler {
    constructor() {
    }

  /**
   *
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next Calls next middleware function
   * @returns JSON file with pictures data
   */
  async fetchPictures(req, res, next) {
    const response = await db.fetchPictures();
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
    const response = await db.fetchTableList();
    return res.status(201).json(response);
  }
}

module.exports = StaticFetchHandler;