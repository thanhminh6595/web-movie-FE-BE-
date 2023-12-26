const Movie = require("../models/movie");
const pageSize = 20;

const pagination = (arrayValue, req, res) => {
  const totalResult = arrayValue.length;

  const numPages = Math.ceil(totalResult / pageSize - 1);
  const page = +req.query.page || 1;

  const updatedMovie = arrayValue.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const returnMovieObject = {
    page,
    pageSize,
    numPages,
    totalResult,
    results: updatedMovie,
  };

  return res.send(returnMovieObject);
};

exports.getOrigin = (req, res) => {
  const typeId = req.params.typeId;
  const tokenId = req.query.token;

  Movie.fetchUserToken((tokenList) => {
    const existingToken = tokenList.some((token) => token.token === tokenId);

    if (existingToken) {
      Movie.fetchAll((movies) => {
        Movie.fetchTypeList((type) => {
          switch (typeId) {
            case type[2]:
              const updatedMovies = movies.filter(
                (mov) => mov.media_type === typeId
              );

              pagination(updatedMovies, req, res);
          }
        });
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

exports.getTrending = (req, res) => {
  const typeId = req.params.typeId;
  const tokenId = req.query.token;

  Movie.fetchUserToken((tokenList) => {
    const existingToken = tokenList.some((token) => token.token === tokenId);
    if (existingToken) {
      Movie.fetchAll((movie) => {
        Movie.fetchTypeList((type) => {
          switch (typeId) {
            case "all": {
              const movieTrending = movie.filter(
                (mov) =>
                  mov.media_type !== type[1] || mov.media_type !== type[2]
              );

              pagination(movieTrending, req, res);
              break;
            }

            case "tv": {
              const movieTrending = movie.filter(
                (mov) => mov.media_type === type[2]
              );

              pagination(movieTrending, req, res);
              break;
            }

            case "movie": {
              const movieTrending = movie.filter(
                (mov) => mov.media_type === type[1]
              );

              pagination(movieTrending, req, res);
              break;
            }

            case "person": {
              const movieTrending = movie.filter(
                (mov) => mov.media_type === type[3]
              );

              pagination(movieTrending, req, res);
              break;
            }

            default:
              res.status(400).json({ message: "No found movie" });
          }
        });
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

exports.getTopRated = (req, res) => {
  const tokenId = req.query.token;

  Movie.fetchUserToken((tokenList) => {
    const existingToken = tokenList.some((token) => token.token === tokenId);
    if (existingToken) {
      Movie.fetchAll((movie) => {
        movie.sort((a, b) => b.vote_average - a.vote_average);

        pagination(movie, req, res);
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

exports.getTypeMovies = (req, res) => {
  const tokenId = req.query.token;

  Movie.fetchUserToken((tokenList) => {
    const existingToken = tokenList.some((token) => token.token === tokenId);
    if (existingToken) {
      Movie.fetchGenreList((genres) => {
        Movie.fetchAll((movie) => {
          const genreQuery = +req.query.with_genres;

          const action = genres.find((gen) => gen.name === "Action");
          const adventure = genres.find((gen) => gen.name === "Adventure");
          const animation = genres.find((gen) => gen.name === "Animation");
          const crime = genres.find((gen) => gen.name === "Crime");
          const drama = genres.find((gen) => gen.name === "Drama");
          const family = genres.find((gen) => gen.name === "Family");
          const fantasy = genres.find((gen) => gen.name === "Fantasy");
          const history = genres.find((gen) => gen.name === "History");
          const music = genres.find((gen) => gen.name === "Music");
          const mystery = genres.find((gen) => gen.name === "Mystery");
          const tvMovie = genres.find((gen) => gen.name === "TV Movie");
          const thriller = genres.find((gen) => gen.name === "Thriller");
          const war = genres.find((gen) => gen.name === "War");
          const western = genres.find((gen) => gen.name === "Western");
          const scienceFiction = genres.find(
            (gen) => gen.name === "Science Fiction"
          );
          const comedy = genres.find((gen) => gen.name === "Comedy");
          const horror = genres.find((gen) => gen.name === "Horror");
          const romance = genres.find((gen) => gen.name === "Romance");
          const docs = genres.find((gen) => gen.name === "Documentary");

          const typeMovie = (id, name) => {
            const typeMovies = movie.filter((mov) =>
              mov.genre_ids.includes(id)
            );

            const totalResult = typeMovies.length;

            const numPages = Math.ceil(totalResult / pageSize - 1);
            const page = +req.query.page || 1;

            const updatedMovie = typeMovies.slice(
              page * pageSize,
              page * pageSize + pageSize
            );

            const returnMovieObject = {
              page,
              pageSize,
              numPages,
              totalResult,
              genre_name: name,
              results: updatedMovie,
            };

            return res.send(returnMovieObject);
          };

          if (genreQuery) {
            switch (genreQuery) {
              case action.id: {
                typeMovie(action.id, action.name);
                break;
              }

              case comedy.id: {
                typeMovie(comedy.id, comedy.name);
                break;
              }

              case horror.id: {
                typeMovie(horror.id, horror.name);
                break;
              }

              case romance.id: {
                typeMovie(romance.id, romance.name);
                break;
              }

              case docs.id: {
                typeMovie(docs.id, docs.name);
                break;
              }
              case adventure.id: {
                typeMovie(adventure.id, adventure.name);
                break;
              }

              case animation.id: {
                typeMovie(animation.id, animation.name);
                break;
              }

              case crime.id: {
                typeMovie(crime.id, crime.name);
                break;
              }

              case drama.id: {
                typeMovie(drama.id, drama.name);
                break;
              }

              case family.id: {
                typeMovie(family.id, family.name);
                break;
              }

              case fantasy.id: {
                typeMovie(fantasy.id, fantasy.name);
                break;
              }

              case history.id: {
                typeMovie(history.id, history.name);
                break;
              }

              case music.id: {
                typeMovie(music.id, music.name);
                break;
              }

              case mystery.id: {
                typeMovie(mystery.id, mystery.name);
                break;
              }

              case scienceFiction.id: {
                typeMovie(scienceFiction.id, scienceFiction.name);
                break;
              }

              case tvMovie.id: {
                typeMovie(tvMovie.id, tvMovie.name);
                break;
              }

              case thriller.id: {
                typeMovie(thriller.id, thriller.name);
                break;
              }

              case war.id: {
                typeMovie(war.id, war.name);
                break;
              }

              case western.id: {
                typeMovie(western.id, western.name);
                break;
              }

              default:
                res.status(400).json({ message: "Not found that genre id" });
            }
          } else {
            res.status(400).json({ message: "Not found genre parrams" });
          }
        });
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

exports.getTrailer = (req, res, next) => {
  const film_id = +req.params.film_id;
  const tokenId = req.query.token;

  Movie.fetchUserToken((tokenList) => {
    const existingToken = tokenList.some((token) => token.token === tokenId);
    if (existingToken) {
      Movie.fetchVideoList((videos) => {
        const resultVideo = videos.find((vid) => vid.id === film_id);
        if (resultVideo) {
          const teaserVideo = resultVideo.videos
            .filter((vid) => vid.official === true)
            .filter((vid) => vid.site === "YouTube")
            .filter((vid) => vid.type === "Trailer" || vid.type === "Teaser");

          const trailerVideo = teaserVideo.filter(
            (vid) => vid.type === "Trailer"
          );

          const updateTrailerVideoFormatTime =
            trailerVideo.length > 0 &&
            trailerVideo.map((video) => {
              return {
                ...video,
                published_at_getTime: new Date(video.published_at).getTime(),
              };
            });

          const updateTeaserVideoFormatTime =
            teaserVideo.length > 0 &&
            teaserVideo.map((video) => {
              return {
                ...video,
                published_at_getTime: new Date(video.published_at).getTime(),
              };
            });

          if (teaserVideo.length > 0) {
            //
            if (trailerVideo.length > 0) {
              updateTrailerVideoFormatTime.sort(
                (a, b) => b.published_at_getTime - a.published_at_getTime
              );
              res.json({
                text: "matched video",
                results: updateTrailerVideoFormatTime,
              });
              //
            } else {
              updateTeaserVideoFormatTime.sort(
                (a, b) => b.published_at_getTime - a.published_at_getTime
              );
              res.json({
                text: "matched video",
                results: updateTeaserVideoFormatTime,
              });
            }
          } else {
            res.status(404).json({ message: "Not found video", results: [] });
          }
        } else {
          res
            .status(400)
            .json({ message: "Not found film_id parram", results: [] });
        }
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

exports.getSearchMovies = (req, res, next) => {
  const keyword = req.query.keyword;
  const genre = req.query.genre;
  const media_type = req.query.media_type;
  const language = req.query.language;
  const year = req.query.year;

  const tokenId = req.query.token;

  Movie.fetchUserToken((tokenList) => {
    const existingToken = tokenList.some((token) => token.token === tokenId);
    if (existingToken) {
      if (keyword) {
        Movie.fetchAll((movies) => {
          Movie.fetchGenreList((genreList) => {
            Movie.fetchTypeList((typeList) => {
              // initial
              const idGenre =
                genre &&
                genreList.find(
                  (gen) => gen.name.toLowerCase() === genre.toLowerCase()
                ).id;

              const typeId =
                media_type &&
                typeList.find(
                  (type) => type.toLowerCase() === media_type.toLowerCase()
                );

              const queryMovies = movies.filter((movie) => {
                return (
                  (movie.title &&
                    movie.title
                      .toLowerCase()
                      .includes(keyword.toLowerCase())) ||
                  (movie.overview &&
                    movie.overview
                      .toLowerCase()
                      .includes(keyword.toLowerCase()))
                );
              });

              const generMovies = (mainMovies) => {
                return mainMovies.length > 0
                  ? mainMovies.filter((mov) => mov.genre_ids.includes(idGenre))
                  : mainMovies;
              };

              const typeMovies = (mainMovies) => {
                if (typeId === "all") {
                  return mainMovies;
                } else {
                  return mainMovies.length > 0
                    ? mainMovies.filter((mov) =>
                        mov.media_type.includes(typeId)
                      )
                    : mainMovies;
                }
              };

              const languageMovies = (mainMovies) => {
                return mainMovies.length > 0
                  ? mainMovies.filter((mov) =>
                      mov.original_language.includes(language)
                    )
                  : mainMovies;
              };

              const yearMovies = (mainMovies) => {
                return mainMovies.length > 0
                  ? mainMovies.filter(
                      (mov) =>
                        (mov.release_date &&
                          mov.release_date
                            .split("-")[0]
                            .includes(year.toString())) ||
                        (mov.first_air_date &&
                          mov.first_air_date
                            .split("-")[0]
                            .includes(year.toString()))
                    )
                  : mainMovies;
              };

              // 16 case validate:
              // case 1: genre-T / type-T / lang-T/ Year-T
              if (genre && media_type && language && year) {
                console.log("case 1");
                return pagination(
                  yearMovies(
                    languageMovies(typeMovies(generMovies(queryMovies)))
                  ),
                  req,
                  res
                );
              }

              // case 2: genre-T / type-T / lang-T/ Year-F
              if (genre && media_type && language && !year) {
                console.log("case 2");
                return pagination(
                  languageMovies(typeMovies(generMovies(queryMovies))),
                  req,
                  res
                );
              }

              // case 3: genre-T / type-T / lang-F/ Year-T
              if (genre && media_type && !language && year) {
                console.log("case 3");
                return pagination(
                  yearMovies(typeMovies(generMovies(queryMovies))),
                  req,
                  res
                );
              }

              // case 4: genre-T / type-T / lang-F/ Year-F
              if (genre && media_type && !language && !year) {
                console.log("case 4");
                return pagination(
                  typeMovies(generMovies(queryMovies)),
                  req,
                  res
                );
              }

              // case 5: genre-T / type-F / lang-T/ Year-T
              if (genre && !media_type && language && year) {
                console.log("case 5");
                return pagination(
                  yearMovies(languageMovies(generMovies(queryMovies))),
                  req,
                  res
                );
              }

              // case 6: genre-T / type-F / lang-T/ Year-F
              if (genre && !media_type && language && !year) {
                console.log("case 6");
                return pagination(
                  languageMovies(generMovies(queryMovies)),
                  req,
                  res
                );
              }

              // case 7: genre-T / type-F / lang-F/ Year-T
              if (genre && !media_type && !language && year) {
                console.log("case 7");
                return pagination(yearMovies(generMovies(queryMovies)));
              }

              // case 8: genre-T / type-F / lang-F/ Year-F
              if (genre && !media_type && !language && !year) {
                console.log("case 8");
                pagination(generMovies(queryMovies), req, res);
              }

              // case 9: genre-F / type-T / lang-F/ Year-T
              if (!genre && media_type && !language && year) {
                console.log("case 9");
                return pagination(
                  yearMovies(typeMovies(queryMovies)),
                  req,
                  res
                );
              }

              // case 10: genre-F / type-T / lang-F/ Year-F
              if (!genre && media_type && !language && !year) {
                console.log("case 10");
                return pagination(typeMovies(queryMovies), req, res);
              }

              // case 11: genre-F / type-T / lang-T/ Year-T
              if (!genre && media_type && language && year) {
                console.log("case 11");
                return pagination(
                  yearMovies(languageMovies(typeMovies(queryMovies))),
                  req,
                  res
                );
              }

              // case 12: genre-F / type-T / lang-T/ Year-F
              if (!genre && media_type && language && !year) {
                console.log("case 12");
                return pagination(
                  languageMovies(typeMovies(queryMovies)),
                  req,
                  res
                );
              }

              // case 13: genre-F / type-F / lang-T/ Year-T
              if (!genre && !media_type && language && year) {
                console.log("case 13");
                return pagination(
                  yearMovies(languageMovies(queryMovies)),
                  req,
                  res
                );
              }

              // case 14: genre-F / type-F / lang-T/ Year-F
              if (!genre && !media_type && language && !year) {
                console.log("case 14");
                return pagination(languageMovies(queryMovies), req, res);
              }

              // case 15: genre-F / type-F / lang-F/ Year-T
              if (!genre && !media_type && !language && year) {
                console.log("case 15");
                return pagination(yearMovies(queryMovies), req, res);
              }

              // case 16: genre-F / type-F / lang-F/ Year-F
              if (!genre && !media_type && !language && !year) {
                return queryMovies.length > 0
                  ? pagination(queryMovies, req, res)
                  : queryMovies;
              }

              //...
            });
          });
        });
      } else {
        res
          .status(400)
          .json({ message: "Not found keyword parram", results: [] });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

exports.get404 = (req, res, next) => {
  // res.status(404).send({ message: "Route not found" });
  res.status(404).json({ message: "Route not found" });
};
