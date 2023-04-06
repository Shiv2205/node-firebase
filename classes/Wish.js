const db = require("../firebase/databaseOps");
const path = require("path");
const fs = require("fs");

class Wish {
  #directory;

  constructor() {
    this.#directory = path.join(__dirname, "..", "jsonData");;
  }
  /**
   *
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next Calls next middleware function
   * @returns JSON file with wishes data
   */
  async fetchWishes(req, res, next) {
    const filePath = path.join(this.#directory, "wishes.json");
    if (fs.existsSync(filePath)) {
      return res.status(200).sendFile(filePath);
    }
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

    const response = await this.updateWishFile();
    //io.emit("wishUpdate", { updatedWishes: response });

    return res.status(200).json(wishObj);
  }

  /**
   *
   * @returns Array containing all current wishes
   */
  async updateWishFile() {
    const filePath = path.join(this.#directory, "wishes.json");
    const response = await db.fetchWishes();
    fs.writeFile(filePath, JSON.stringify(response), (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Write success');
    });
    //console.log(response);
    return response;
  }
}

module.exports = Wish;
