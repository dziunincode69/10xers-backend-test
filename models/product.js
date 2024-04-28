"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.user, { foreignKey: "user_id" });
      // define association here
    }
  }
  product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product name is required",
          },
          notNull: {
            msg: "Product name is required",
          },
        },
      },
      description: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
          isInt: {
            args: true,
            msg: "Please Input Valid integer",
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "user_id is required",
          },
          isInt: {
            args: true,
            msg: "Please input user as integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
