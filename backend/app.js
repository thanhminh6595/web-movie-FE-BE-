const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const movieRoutes = require("./routes/movie");
const errorRoutes = require("./routes/error");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/api/movie", movieRoutes);

app.use(errorRoutes);

app.listen(5000);
