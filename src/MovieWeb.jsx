import { useEffect, useState } from "react";
import "./MovieWeb.css";
import imgNotFound from "./assets/notAvaliblep.jpg";
export const MovieWeb = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("Batman");
  // const [stars, setStars] = useState("");
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
    setMovies(results);

    console.log(results);
    
    
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
    setMovies(results);
    console.log(movieName);
  };

  const onChange = (e) => {
    setMovieName(e.target.value);
    console.log(movieName);
  };

  const getStars = (avarage) => {
    avarage = Math.round(avarage);
    
    if (avarage === 0) {
      starts=("☆");
    } else if (avarage === 1) {
      starts=("★");
    } else if (avarage === 2) {
      starts=("★★");
    } else if (avarage === 3) {
      starts=("★★★");
    } else if (avarage === 4) {
      starts=("★★★★");
    } else if (avarage === 5) {
      starts=("★★★★★");
    }else if (avarage === 6) {
      starts=("★★★★★★");
    }else if (avarage === 7) {
      starts=("★★★★★★★");
    }else if (avarage === 8) {
      starts=("★★★★★★★★");
    }else if (avarage === 9) {
      starts=("★★★★★★★★★");
    }else if (avarage === 10) {
      starts=("★★★★★★★★★★");
    }

   
  }

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

      {movies[0] ? (
        <div className="card">
          {movies?.map((movie) => {
            return (
              <div className="movie" key={movie.id}>
                {movie.poster_path ? (
                  <div className="imagenes">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt=""
                    />

                    <p>{movie.release_date}</p>
                    <h3 >{movie.title}</h3>
                  </div>
                  
                ) : (
                  <div>
                    <img src={imgNotFound} alt="" />
                  </div>
                )}

                <div onGotPointerCapture={getStars(movie.vote_average)} className="infoMovie">
                  <h3>{movie.title}</h3>
                  <p className="stars">{movie.vote_average}/10 {starts}</p>
                  <p>{movie.overview}</p>
                  
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No hay</h1>
      )}


      
    </div>
    <footer> By yo</footer>
    </div>
  );
};
