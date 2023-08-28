const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const movie = require("./movie");

const production_companies = sequelize.define("production_companies", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  production_companies: {
    type: DataTypes.STRING,
  },
});
movie.hasMany(production_companies, {
  foreignKey: "movie_id",
});
module.exports = production_companies;
