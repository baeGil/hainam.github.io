const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const movie = require("./movie");

const genres = sequelize.define("genres", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  genres: {
    type: DataTypes.STRING,
  },
});
movie.hasMany(genres, {
  foreignKey: "movie_id",
});
module.exports = genres;
