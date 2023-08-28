const pagination = (req, res) => {
  try {
    // define page and how many movie are there in one page
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    // first movie and last movie of a page, slice method not include the last item
    const firstIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const totalPage = Math.ceil(res.data.length / limit);
    const result = res.data.slice(firstIndex, lastIndex);
    res.json({
      totalMovie: res.data.length,
      totalPage: totalPage,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { pagination };
