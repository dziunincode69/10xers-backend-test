const { Product } = require("../models");

class Product {
  static async GetAllProduct(req, res, next) {
    try {
      const { access_token } = req.header;
    } catch (error) {
      next(error);
    }
  }
}
