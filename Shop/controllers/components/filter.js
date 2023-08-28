const { QueryTypes, Op } = require("sequelize");
const { sequelize } = require("../../sequelize");
const Movie = require("../../models/movie/movie");
const Genres = require("../../models/movie/genres");
const Release_day = require("../../models/movie/release_day");
const _ = require("lodash");

// dem so luon fiter
async function countDataToFilter(req, res, next) {
  try {
    const a = await sequelize.query(
      `SELECT
      COUNT(DISTINCT genres) FROM genres`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const b = await sequelize.query(
      `SELECT
      COUNT(DISTINCT year) FROM release_days`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const countGenres = parseInt(a.map((val) => val.count)[0]);
    const countYear = parseInt(b.map((val) => val.count)[0]);
    res.countGenres = countGenres;
    res.countYear = countYear;
    // res.json({ msg: "success counted" });
    next();
  } catch (err) {
    console.log(err);
  }
}

async function filter(req, res, next) {
  try {
    // lay mang input genres
    const genresArray = [];
    for (let i = 1; i <= res.countGenres; i++) {
      const genre = "genre" + i;
      const Genres = req.body[genre];
      if (Genres != undefined) genresArray.push(Genres);
    }
    const resultGenres = await Genres.findAll({
      where: {
        genres: {
          [Op.or]: genresArray,
        },
      },
    });

    const Year = req.body.year;
    const yearArray = [];
    if (Year != undefined || Year == "") yearArray.push(Year);
    const resultYear = await Release_day.findAll({
      where: {
        year: {
          [Op.or]: yearArray,
        },
      },
    });
    const idYear = resultYear.map((data) => data.movie_id);
    const idGenres = resultGenres.map((data) => data.movie_id);
    const idResult = _.intersection(idGenres, idYear);
    res.data = idResult;
    next();
    // return res.json({
    //   total: idResult.length,
    //   movie_id: idResult,
    // });
  } catch (err) {
    console.log(err);
  }
}
async function filterMovie(req, res, next) {
  const movie = await Movie.findAll({
    where: {
      movie_id: {
        [Op.or]: res.data,
      },
    },
    order: [[`title`, `asc`]],
  });
  res.data = movie;
  next();
}
module.exports = { countDataToFilter, filter, filterMovie };
