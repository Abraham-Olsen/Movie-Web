import { useEffect, useState } from "react";
import "./MovieWeb.css";
import imgNotFound from "./assets/notAvaliblep.jpg";
export const MovieWeb = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("Batman");
  // const [img, setImg] = useState([]);
  let starts = "";

  const ApiKey = "160fc190e7f405aca5e6719f2cfa5c2f";
  const url = `https://api.themoviedb.org/3/search/movie?query="Batman"&api_key=${ApiKey}`;
  //https://api.themoviedb.org/3/movie/157336?api_key=${ApiKey}
  //https://api.themoviedb.org/3/search/movie?query=Batman&api_key=${ApiKey}
  //   const imgUrl = `https://image.tmdb.org/t/p/w500${img}`
  const getMovies = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    const results = data.results;
    const Allmovies = await Promise.all(results.map(async (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            vote_average: movie.vote_average,
            img: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            release_date: movie.release_date,
            overview: movie.overview,
            genre_ids: movie.genre_ids
        };
    }));
    setMovies(Allmovies);
};

useEffect(() => {
    getMovies();
}, []);


  const getMovieByName = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${ApiKey}`
    );

    const data = await resp.json();
    const results = data.results;
    const Allmovies = await Promise.all(results.map(async (movie) => {
      return {
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          img: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : `${imgNotFound}`,
          release_date: movie.release_date,
          overview: movie.overview,
          genre_ids: movie.genre_ids
      };
  }));
  setMovies(Allmovies);
  };

  const onChange = (e) => {
    setMovieName(e.target.value);
    console.log(movieName);
    
  };

  const getStars = (avarage) => {
    avarage = Math.round(avarage);

    if (avarage === 0) {
      starts = "☆";
    } else if (avarage === 1) {
      starts = "★";
    } else if (avarage === 2) {
      starts = "★★";
    } else if (avarage === 3) {
      starts = "★★★";
    } else if (avarage === 4) {
      starts = "★★★★";
    } else if (avarage === 5) {
      starts = "★★★★★";
    } else if (avarage === 6) {
      starts = "★★★★★★";
    } else if (avarage === 7) {
      starts = "★★★★★★★";
    } else if (avarage === 8) {
      starts = "★★★★★★★★";
    } else if (avarage === 9) {
      starts = "★★★★★★★★★";
    } else if (avarage === 10) {
      starts = "★★★★★★★★★★";
    }
  };

  return (
    <div className="pagina">
      <header className="Title">
        <h1> Movie Search Web</h1>
      </header>
      <div className="MovieContainer">
        <div className="inputBOX">
          <input
            onChange={(value) => onChange(value)}
            type="text"
            id="movie"
            placeholder="Search a movie"
          />
          <button
            onClick={() => {
              getMovieByName();
            }}
          >
            Search
          </button>
        </div>
          <div className="card">





          
            {/* Movie Card */}
            {movies?.map((movie) => {
              return (
                <div className="movie" key={movie.id}>
                    <div className="imagenes">
                      <img
                        src={movie.img}
                        alt=""
                      />
                      <p>{movie.release_date}</p>
                      <h3>{movie.title}</h3>
                    </div>



           {/* Hover Card */}
                  <div
                    onGotPointerCapture={getStars(movie.vote_average)}
                    className="infoMovie">
                    <h3>{movie.title}</h3>
                    <p className="stars">
                      {movie.vote_average}/10 {starts}
                    </p>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              );
            })}

          </div>
       
      </div>
      <footer> By yo</footer>
    </div>
  );
};
