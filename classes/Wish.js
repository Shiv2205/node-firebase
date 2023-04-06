const db = require("../firebase/databaseOps");

class Wish {

  constructor() {
  }
  /**
   *
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next Calls next middleware function
   * @returns JSON file with wishes data
   */
  async fetchWishes(req, res, next) {
    const response = await db.fetchWishes();
    return res.status(201).json(response);
  }

  /**
   *
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next Calls next middleware function
   * @returns JSON file with wishes data
   */
  async makeWish(req, res, next) {
    //const filePath = path.join(rootPath, "wishes.json");
    const wishObj = req.body;
    await db.makeWish(wishObj.wish, wishObj.isAdmin);

    return res.status(200).json(wishObj);
  }
}

module.exports = Wish;
