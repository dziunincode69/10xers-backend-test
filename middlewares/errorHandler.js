const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  console.log(err);
  switch (err.name) {
    case "WrongLogin":
      return res.status(401).json({
        message: err.message,
      });
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({
        message: err.message,
      });
    default:
      return res.status(500).json({
        message: "Internal server error",
      });
  }
};

module.exports = errorHandler;
