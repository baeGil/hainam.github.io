const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const movie = require("./movie");

const vote = sequelize.define("vote", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  vote_count: {
    type: DataTypes.INTEGER,
  },

  vote_average: {
    type: DataTypes.FLOAT,
  },
});
movie.hasMany(vote, {
  foreignKey: "movie_id",
});
module.exports = vote;
