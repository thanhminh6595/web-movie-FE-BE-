const express = require("express");

const router = express.Router();
const movie = require("../controllers/movie");

router.get("/video/:film_id", movie.getTrailer);

router.get("/trending/:typeId", movie.getTrending);

router.get("/top-rate", movie.getTopRated);

router.get("/discover/:typeId", movie.getOrigin);

router.get("/discover", movie.getTypeMovies);

router.get("/search", movie.getSearchMovies);

module.exports = router;
