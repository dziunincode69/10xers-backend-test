const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case value:
      break;

    default:
      return res.status(500).json({
        message: "Internal server error",
      });
  }
};
