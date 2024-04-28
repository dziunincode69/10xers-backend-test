const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  console.log(err.message);
  switch (err.name) {
    case "MissingInput":
      return res.status(400).json({
        message: err.message,
      });
    case "SequelizeValidationError": {
      return res.status(400).json({
        message: err.message.replace("Validation error: ", ""),
      });
    }
    case "Email Exist": {
      return res.status(400).json({
        message: err.message,
      });
    }
    case "Forbidden": {
      return res.status(403).json({
        message: err.message,
      });
    }
    case "NotFound":
      return res.status(404).json({
        message: err.message,
      });
    case "WrongLogin":
      return res.status(401).json({
        message: err.message,
      });
    case "JsonWebTokenError":
      return res.status(400).json({
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
