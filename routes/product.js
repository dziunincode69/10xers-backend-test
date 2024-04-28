const express = require("express");
// const { Authentication } = require("../middlewares/guard");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/show", ProductController.GetAllProduct);
router.post("/add", ProductController.CreateProduct);
router.delete("/delete/:product_id", ProductController.DeleteProduct);
router.put("/edit/:product_id", ProductController.EditProduct);

module.exports = router;
