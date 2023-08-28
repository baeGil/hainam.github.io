const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");

const movie = sequelize.define("movie", {
  movie_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
  },

  original_language: {
    type: DataTypes.STRING,
  },

  overview: {
    type: DataTypes.STRING(2550),
  },
  popularity: {
    type: DataTypes.FLOAT,
  },

  budget: {
    type: DataTypes.FLOAT,
  },

  revenue: {
    type: DataTypes.FLOAT,
  },

  runtime: {
    type: DataTypes.INTEGER,
  },

  tagline: {
    type: DataTypes.STRING,
  },

  poster_path: {
    type: DataTypes.STRING,
  },
});

module.exports = movie;
