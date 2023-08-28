const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const user = sequelize.define("User_Details", {
  userId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailToken: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = user;
