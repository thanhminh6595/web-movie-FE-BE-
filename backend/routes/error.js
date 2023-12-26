const express = require("express");

const router = express.Router();

const error = require("../controllers/movie");

router.use(error.get404);

module.exports = router;
