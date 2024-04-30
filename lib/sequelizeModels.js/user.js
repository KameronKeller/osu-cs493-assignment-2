const { DataTypes } = require('sequelize');

const userModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
};

module.exports = userModel;