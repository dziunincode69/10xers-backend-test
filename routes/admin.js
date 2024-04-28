const express = require("express");
// const { Authentication } = require("../middlewares/guard");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.post("/register", AdminController.register);
router.post("/login", AdminController.login);

module.exports = router;
