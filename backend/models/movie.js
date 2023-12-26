const fs = require("fs");
const path = require("path");

// Khai bao duong dan
const pathListMovie = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);

const pathGenre = path.join(
  path.dirname(require.main.filename),
  "data",
  "genreList.json"
);

const pathType = path.join(
  path.dirname(require.main.filename),
  "data",
  "mediaTypeList.json"
);

const pathToken = path.join(
  path.dirname(require.main.filename),
  "data",
  "userToken.json"
);

const pathVideoList = path.join(
  path.dirname(require.main.filename),
  "data",
  "videoList.json"
);

module.exports = class Movie {
  static fetchAll(cb) {
    fs.readFile(pathListMovie, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }

  static fetchGenreList(cb) {
    fs.readFile(pathGenre, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }

  static fetchTypeList(cb) {
    fs.readFile(pathType, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }

  static fetchVideoList(cb) {
    fs.readFile(pathVideoList, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }

  static fetchUserToken(cb) {
    fs.readFile(pathToken, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }
};
