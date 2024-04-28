const { validateJWT } = require("../helper/jwt");

const Authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const checkValid = validateJWT(access_token);
    req.user = checkValid;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Authentication,
};
