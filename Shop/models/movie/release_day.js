const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const movie = require("./movie");

const release_day = sequelize.define("release_day", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  day: {
    type: DataTypes.INTEGER,
  },

  month: {
    type: DataTypes.INTEGER,
  },

  year: {
    type: DataTypes.INTEGER,
  },
});
movie.hasMany(release_day, {
  foreignKey: "movie_id",
});
module.exports = release_day;
