const { validateJWT } = require("../helper/jwt");

const Authentication = (req, res, next) => {
  try {
    const { accss_token } = req.headers;
    const checkValid = validateJWT(accss_token);
    req.user = checkValid;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Authentication,
};
