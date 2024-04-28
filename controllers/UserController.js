const { Admin, User } = require("../models");
const { generateJWT, compareBcrypt, validateJWT } = require("../helper/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "MissingInput",
          message: "Email cannot blank",
        };
      }
      const admincheck = await Admin.findOne({
        where: {
          email,
        },
      });
      console.log(admincheck);
      if (admincheck) {
        throw {
          name: "Email Exist",
          message: "Please Use Another Email",
        };
      }
      if (!password) {
        throw {
          name: "MissingInput",
          message: "Password cannot blank",
        };
      }
      const { body } = req;
      const createuser = await User.create(body);
      const payload = {
        id: createuser.id,
        email,
        role: "User",
      };
      const acess_token = generateJWT(payload);
      payload.access_token = acess_token;
      res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "MissingInput",
          message: "Email cannot blank",
        };
      }
      if (!password) {
        throw {
          name: "MissingInput",
          message: "Password cannot blank",
        };
      }
      console.log(req.body);
      const findEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (!findEmail) {
        throw {
          name: "WrongLogin",
          message: "Wrong Email / Password",
        };
      }
      const comparePassword = compareBcrypt(password, findEmail.password);
      if (!comparePassword) {
        throw {
          name: "WrongLogin",
          message: "Wrong Email / Password",
        };
      }
      const jwtpayload = {
        id: findEmail.id,
        email,
        role: "User",
      };
      const acess_token = generateJWT(jwtpayload);
      jwtpayload.access_token = acess_token;
      return res.status(200).json(jwtpayload);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
