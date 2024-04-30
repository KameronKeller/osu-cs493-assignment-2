const { DataTypes } = require('sequelize');

export const reviewModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  businessid: {
    type: DataTypes.INTEGER,
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