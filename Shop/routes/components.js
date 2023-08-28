const express = require("express");
const { searchMovie } = require("../controllers/components/search");
const { findAll } = require("../controllers/components/findAll");
const { pagination } = require("../controllers/components/pagination");
const {
  countDataToFilter,
  filter,
  filterMovie,
} = require("../controllers/components/filter");
const { sortVote, sortYear } = require("../controllers/components/sort");
const router = express.Router();

router.post("/searchMovie", searchMovie, pagination);
router.post("/allMovie", findAll, pagination);
router.get("/filter", countDataToFilter, filter, filterMovie, pagination);
router.get("/sortVote", sortVote, pagination);
router.get("/sortYear", sortYear, pagination);
module.exports = router;
