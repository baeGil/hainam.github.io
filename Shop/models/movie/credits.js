const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const movie = require("./movie");

const credits = sequelize.define("credits", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  credits: {
    type: DataTypes.STRING,
  },
});
movie.hasMany(credits, {
  foreignKey: "movie_id",
});
module.exports = credits;
