const express = require("express");
// const { Authentication } = require("../middlewares/guard");
const UserController = require("../controllers/User-Controller");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
