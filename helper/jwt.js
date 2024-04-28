const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

function generateJWT(payload) {
  return jwt.sign(payload, JWT_KEY);
}
function validateJWT(token) {
  return jwt.verify(token, JWT_KEY);
}
function hashBcrypt(str) {
  return bcrypt.hashSync(str);
}
function compareBcrypt(pwd, hashedPwd) {
  return bcrypt.compareSync(pwd, hashedPwd);
}

module.exports = {
  generateJWT,
  validateJWT,
  hashBcrypt,
  compareBcrypt,
};
