const Vote_Average = require("../../models/movie/vote");
const Release_day = require("../../models/movie/release_day");
const { Op } = require("sequelize");
var flag = false;
async function sortVote(req, res, next) {
  try {
    if (!flag) {
      // sap xep nho dan
      const movie = await Vote_Average.findAll({
        order: [[`vote_average`, `desc`]],
      });
      res.data = movie;
      flag = true;
      next();
    } else {
      // sap xep lon dan
      const movie = await Vote_Average.findAll({
        order: [[`vote_average`, `asc`]],
      });
      res.data = movie;
      flag = false;
      next();
    }
  } catch (err) {
    console.log(err);
  }
}
async function sortYear(req, res, next) {
  try {
    if (!flag) {
      // sap xep nho dan
      const movie = await Release_day.findAll({
        where: {
          year: {
            [Op.not]: null,
          },
        },
        order: [[`year`, `desc`]],
      });
      res.data = movie;
      flag = true;
      next();
    } else {
      // sap xep lon dan
      const movie = await Release_day.findAll({
        where: {
          year: {
            [Op.not]: null,
          },
        },
        order: [[`year`, `asc`]],
      });
      res.data = movie;
      flag = false;
      next();
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = { sortVote, sortYear };
