const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
