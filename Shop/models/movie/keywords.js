const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const movie = require("./movie");

const keywords = sequelize.define("keywords", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  keywords: {
    type: DataTypes.STRING,
  },
});
movie.hasMany(keywords, {
  foreignKey: "movie_id",
});
module.exports = keywords;
