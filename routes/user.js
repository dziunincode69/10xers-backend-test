const express = require("express");
// const { Authentication } = require("../middlewares/guard");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).send("Not Found");
});
router.post("/register", UserController.register);
// #swagger.summary = 'Register User...'

router.post("/login", UserController.login);

module.exports = router;
