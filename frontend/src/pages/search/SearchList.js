import React, { useState } from "react";
import SearchListItem from "./SearchListItem";
import ModalMovie from "./ModalMovie/ModalMovie";

const SearchList = ({ results }) => {
  //Khai báo
  const [isClicked, setIsClicked] = useState(false);
  const [idMovie, setIdMovie] = useState();
  const [key, setKey] = useState();
  const [dataMovie, setDataMovie] = useState([]);

  //Lấy dữ liệu https movie chi tiết theo id của movie
  const movieItem = results.map((result) => {
    const fetchYoutube = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/movie/video/" +
            result.id +
            "?token=8qlOkxz4wq"
        );

        if (!response.ok) {
          setKey([]);
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        setKey(() => {
          return data.results;
        });
      } catch (err) {
        console.error(err);
      }
    };

    const clickDetailMovieHandler = () => {
      //Xử lý điều kiện

      if (result.id === idMovie && isClicked) {
        setIsClicked(false);
      } else if (!(result.id === idMovie && isClicked)) {
        setDataMovie(result);
        setIdMovie(result.id);
        setIsClicked(true);
        fetchYoutube();
      }
    };

    return (
      <li key={result.id} onClick={clickDetailMovieHandler}>
        <SearchListItem dataMovie={result} />
      </li>
    );
  });

  return (
    <div>
      {results.length > 0 && (
        <ul className="grid grid-cols-9 gap-3 mx-10">
          {movieItem}

          {/* Kiểm tra điều kiện khi nhấn vào ảnh movie sẽ ẩn/ hiện movie và khi nhấn vào reset sẽ ẩn  */}
          {isClicked && <ModalMovie keyMovie={key} dataMovie={dataMovie} />}
        </ul>
      )}
      {results.length === 0 && (
        <h1 className="text-center mt-10 text-2xl text-white">
          No movies found
        </h1>
      )}
    </div>
  );
};

export default SearchList;
