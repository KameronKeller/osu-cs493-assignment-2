const { DataTypes } = require("sequelize");

const reviewModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  dollars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

module.exports = reviewModel;
