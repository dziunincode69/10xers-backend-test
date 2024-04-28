const { Product } = require("../models");

class Product {
  static async GetAllProduct(req, res, next) {
    try {
      const { id } = req.user;
      const findProdById = Product.findAll({});
    } catch (error) {
      next(error);
    }
  }
}
