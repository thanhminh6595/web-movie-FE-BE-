import { useState, useCallback, useEffect } from "react";

const useHttps = () => {
  const requests = {
    fetchNetflixOriginals: `http://localhost:5000/api/movie/discover/tv?token=8qlOkxz4wq`,
    fetchTrending: `http://localhost:5000/api/movie/trending/all?token=8qlOkxz4wq`,
    fetchTopRated: `http://localhost:5000/api/movie/top-rate?token=8qlOkxz4wq`,
    fetchActionMovies: `http://localhost:5000/api/movie/discover?page=1&with_genres=28&token=8qlOkxz4wq`,
    fetchComedyMovies: `http://localhost:5000/api/movie/discover?page=1&with_genres=35&token=8qlOkxz4wq`,
    fetchHorrorMovies: `http://localhost:5000/api/movie/discover?page=1&with_genres=27&token=8qlOkxz4wq`,
    fetchRomanceMovies: `http://localhost:5000/api/movie/discover?page=1&with_genres=10749&token=8qlOkxz4wq`,
    fetchDocumentaries: `http://localhost:5000/api/movie/discover?page=1&with_genres=99&token=8qlOkxz4wq`,
    fetchSearch: `https://api.themoviedb.org/3/search/movie?api_key=ee30bf8cad3af09970ebff1dff73d61f`,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState();
  const [originals, setOriginals] = useState();
  const [trending, setTrending] = useState();
  const [topRated, setTopRated] = useState();
  const [actionMovies, setActionMovies] = useState();
  const [comedyMovies, setComedyMovies] = useState();
  const [horrorMovies, setHorrorMovies] = useState();
  const [romanceMovies, setRomanceMovies] = useState();
  const [documentaries, setDocumentaries] = useState();

  const fetchNetflixOriginals = useCallback(async () => {
    try {
      setIsLoading(true);

      //FetchNetflixOriginals
      const responseOri = await fetch(`${requests.fetchNetflixOriginals}`);

      if (!responseOri.ok) {
        throw new Error("Something went wrong!");
      }

      const dataOri = await responseOri.json();

      setBanner(
        dataOri.results[Math.floor(Math.random() * dataOri.results.length - 1)]
      );
      setOriginals(dataOri.results);

      //Fetch--Trending
      const responseTrending = await fetch(`${requests.fetchTrending}`);

      if (!responseTrending.ok) {
        throw new Error("Something went wrong!");
      }

      const dataTrending = await responseTrending.json();

      setTrending(dataTrending.results);

      //Fetch--TopRated
      const responseTopRated = await fetch(`${requests.fetchTopRated}`);

      if (!responseTopRated.ok) {
        throw new Error("Something went wrong!");
      }

      const dataTopRated = await responseTopRated.json();

      setTopRated(dataTopRated.results);

      //Fetch--ActionMovies
      const responseActionMovies = await fetch(`${requests.fetchActionMovies}`);

      if (!responseActionMovies.ok) {
        throw new Error("Something went wrong!");
      }

      const dataActionMovies = await responseActionMovies.json();

      setActionMovies(dataActionMovies.results);

      //Fetch--ComedyMovies
      const responseComedyMovies = await fetch(`${requests.fetchComedyMovies}`);

      if (!responseComedyMovies.ok) {
        throw new Error("Something went wrong!");
      }

      const dataComedyMovies = await responseComedyMovies.json();

      setComedyMovies(dataComedyMovies.results);

      //Fetch--HorrorMovies
      const responseHorrorMovies = await fetch(`${requests.fetchHorrorMovies}`);

      if (!responseHorrorMovies.ok) {
        throw new Error("Something went wrong!");
      }

      const dataHorrorMovies = await responseHorrorMovies.json();

      setHorrorMovies(dataHorrorMovies.results);

      //Fetch--RomanceMovies
      const responseRomanceMovies = await fetch(
        `${requests.fetchRomanceMovies}`
      );

      if (!responseRomanceMovies.ok) {
        throw new Error("Something went wrong!");
      }

      const dataRomanceMovies = await responseRomanceMovies.json();

      setRomanceMovies(dataRomanceMovies.results);

      //Fetch--Documentaries
      const responseDocumentaries = await fetch(
        `${requests.fetchDocumentaries}`
      );

      if (!responseDocumentaries.ok) {
        throw new Error("Something went wrong!");
      }

      const dataDocumentaries = await responseDocumentaries.json();

      setDocumentaries(dataDocumentaries.results);

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }, [
    requests.fetchNetflixOriginals,
    requests.fetchTrending,
    requests.fetchTopRated,
    requests.fetchActionMovies,
    requests.fetchComedyMovies,
    requests.fetchHorrorMovies,
    requests.fetchRomanceMovies,
    requests.fetchDocumentaries,
  ]);

  //re-render fetch whenever changed
  useEffect(() => {
    fetchNetflixOriginals();
  }, [fetchNetflixOriginals]);

  return {
    isLoading,
    banner,
    originals,
    trending,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  };
};

export default useHttps;
