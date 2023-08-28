const Movie = require("../../models/movie/movie");

async function findAll(req, res, next) {
  try {
    const movie = await Movie.findAll();
    res.data = movie;
    next();
  } catch (err) {
    console.log(err);
  }
}
module.exports = { findAll };
