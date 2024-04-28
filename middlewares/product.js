const express = require("express");
const router = express.Router();

function checkProductId(req, res, next) {
  const { product_id } = req.params;
  if (!product_id) {
    return res.status(400).json({ error: "product_id cannot blank" });
  }
  next();
}

module.exports = checkProductId;
