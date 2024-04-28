"use strict";
const { Model } = require("sequelize");
const product = require("./product");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.product);
      // define association here
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
