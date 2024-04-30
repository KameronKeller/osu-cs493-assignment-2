const { DataTypes } = require('sequelize');

const photoModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  }
};

module.exports = photoModel;