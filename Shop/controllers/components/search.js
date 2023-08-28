const { Op } = require("sequelize");
const Movie = require("../../models/movie/movie");
async function searchMovie(req, res, next) {
  try {
    const title = req.body.query;
    const movie = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      order: [[`title`, `asc`]],
    });
    // const result = movie.filter((movie) =>
    //   movie.title
    //     .toLowerCase()
    //     .replace(/\s+/g, "")
    //     .includes(title.toLowerCase().replace(/\s+/g, ""))
    // );
    res.data = movie;
    next();
  } catch (error) {
    console.log(error);
  }
}
module.exports = { searchMovie };
