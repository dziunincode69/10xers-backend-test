const express = require("express");
const router = express.Router();
const product = require("./product");
const user = require("./user");
const admin = require("./admin");
const { Authentication } = require("../middlewares/guard");

router.use("/", user);
router.use("/admin", admin);
router.use(Authentication);
router.use("/product", product);

module.exports = router;
