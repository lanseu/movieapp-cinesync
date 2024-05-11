import React from "react";
import { Link } from "react-router-dom";
import "./moviecard.css";

const MovieCard = (props) => {
  const handleClick = () => {
    props.setMovieId(props.id);
  };

  return (
    <div className="movie-card">
      {/* Attach the handleClick function to the onClick event of the Link component */}
      <Link to={`/movie/${props.id}`} onClick={handleClick}>
        <div className="movie-img-container">
          <img
            src={`https://image.tmdb.org/t/p/original/${props.poster}`}
            alt="movie"
            className="movie-img"
          />
          <div className="movie-info">
            <p className="movie-title">{props.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
