const { up } = require("../migrations/20240428105152-create-user");
const { Product } = require("../models");

class ProductController {
  static async GetAllProduct(req, res, next) {
    try {
      const findProdById = await Product.findAll();
      return res.status(200).json(findProdById);
    } catch (error) {
      next(error);
    }
  }
  static async CreateProduct(req, res, next) {
    try {
      const { name, img_url, price } = req.body;
      if (!name) {
        throw {
          name: "MissingInput",
          message: "Product name cannot blank",
        };
      }
      if (!img_url) {
        throw {
          name: "MissingInput",
          message: "image_url cannot blank",
        };
      }
      if (!price) {
        throw {
          name: "MissingInput",
          message: "Price cannot blank",
        };
      }
      req.body.user_id = req.user.id;
      const create_res = await Product.create(req.body);
      return res.status(201).json(create_res);
    } catch (error) {
      next(error);
    }
  }
  static async DeleteProduct(req, res, next) {
    try {
      const role = req.user.role;
      if (role != "Admin") {
        throw {
          name: "Forbidden",
          message: "Cannot Perform This Action",
        };
      }
      const { product_id } = req.params;
      if (!product_id) {
        throw {
          name: "MissingInput",
          message: "product_id cannot blank",
        };
      }
      const findproduct = await Product.findByPk(product_id);
      if (!findproduct) {
        throw {
          name: "NotFound",
          message: "Product Not Found",
        };
      }
      // if (findproduct.user_id != req.user.id) {
      //   throw {
      //     name: "Forbidden",
      //     message: "Cannot Perform This Action",
      //   };
      // }
      await findproduct.destroy();
      res.status(200).json({
        message: "Success Delete Product " + findproduct.name,
      });
    } catch (error) {
      next(error);
    }
  }
  static async EditProduct(req, res, next) {
    try {
      const role = req.user.role;
      console.log(role, "whoami");
      if (role != "Admin") {
        throw {
          name: "Forbidden",
          message: "Cannot Perform This Action",
        };
      }
      const { product_id } = req.params;
      if (!product_id) {
        throw {
          name: "MissingInput",
          message: "product_id cannot blank",
        };
      }
      const findproduct = await Product.findByPk(product_id);
      if (!findproduct) {
        throw {
          name: "NotFound",
          message: "Product Not Found",
        };
      }
      const { name, img_url, price } = req.body;
      if (!name) {
        throw {
          name: "MissingInput",
          message: "Product name cannot blank",
        };
      }
      if (!img_url) {
        throw {
          name: "MissingInput",
          message: "image_url cannot blank",
        };
      }
      if (!price) {
        throw {
          name: "MissingInput",
          message: "Price cannot blank",
        };
      }
      // if (findproduct.user_id != req.user.id) {
      //   throw {
      //     name: "Forbidden",
      //     message: "Cannot Perform This Action",
      //   };
      // }
      const updateproduct = await findproduct.update(req.body);
      res.status(200).json(updateproduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
