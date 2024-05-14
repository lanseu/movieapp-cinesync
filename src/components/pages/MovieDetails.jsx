// MovieDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-spring-3d-carousel";
import Rating from "react-rating";
import Swal from "sweetalert2"; // Import SweetAlert
import { FavoritesContext } from "../FavoritesContext"; // Import the context
import "./MovieDetails.css";
import "./addbutton.css";

const MovieDetails = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToFavorites } = useContext(FavoritesContext); // Use the context

  useEffect(() => {
    if (props.movieDetails.cast && props.movieDetails.cast.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % props.movieDetails.cast.length);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [props.movieDetails.cast]);

  if (!props.movieDetails) {
    return <div>Loading...</div>;
  }

  const trimInfo = (str, endIndex) => str.substring(0, endIndex);

  const getHours = (runtime) => Math.floor(runtime / 60);

  const getMins = (runtime) => runtime % 60;

  const styles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movieDetails.backdropPath})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const slides = props.movieDetails.cast.map((actor) => ({
    key: actor.id,
    content: (
      <div className="actor-card">
        <img
          src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
          alt="actor-thumbnail"
          className="actor-img"
        />
        <h3 className="actor-name">{actor.name}</h3>
        <p className="character">{actor.character}</p>
      </div>
    ),
  }));

  const handleAddToFavorites = () => {
    addToFavorites(props.movieDetails);
    Swal.fire({
      title: "Success",
      text: "Added to Watchlist!",
      icon: "success"}); // Use SweetAlert to display a message
  };

  return (
    <div className="movie-details-container">
      <div className="back-btn-container">
        <button className="back-btn">
          <Link to="/">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </Link>
        </button>
      </div>
      <div className="movie-details-inner" style={styles}>        
      <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/original/${props.movieDetails.posterPath}`}
            alt="movie-poster"
            className="movie-poster"
          />
        </div>
        <div className="detail-container">
          <h1 className="movie-title">{props.movieDetails.title}</h1>
          <span className="year-and-genre">
            {trimInfo(props.movieDetails.releaseDate, 4)}
            {" | "}
            {props.movieDetails.genres}
          </span>
          <h3 className="overview-title">Overview</h3>
          <p className="overview">{props.movieDetails.overview}</p>
          <div className="rating-container">
            <span className="rating-text">Rating:</span>
            <span className="numeric-rating">
              {props.movieDetails.rating / 2}
            </span>
            <Rating
              className="star-rating"
              initialRating={props.movieDetails.rating / 2}
              readonly
              emptySymbol="fa fa-star-o fa-lg"
              fullSymbol="fa fa-star fa-lg"
            />
          </div>

          <p className="release-date">
            Release date: <span>{props.movieDetails.releaseDate}</span>
          </p>
          <p className="director">
            Directed by: <span>{props.movieDetails.director}</span>
          </p>
          <p className="producer">
            Produced by: <span>{props.movieDetails.productionCompany}</span>
          </p>
          <p className="runtime">
            Runtime: <span>{getHours(props.movieDetails.runtime)}h {getMins(props.movieDetails.runtime)}m</span>
          </p>
          <p className="original-lang">
            Original Language: <span>{props.movieDetails.originalLanguage}</span>
          </p>
          <button onClick={handleAddToFavorites} className="watchlist-btn">
            Add to Watchlist
          </button>
        </div>
      </div>
      <div className="cast-container">
        <h2 className="cast-title">Cast</h2>
        {props.movieDetails.cast.length > 0 && <Carousel slides={slides} goToSlide={currentSlide} />}
      </div>
      <div className="reviews-container">
        <h1 className="reviews-title">Reviews</h1>
        {props.movieDetails.reviews && props.movieDetails.reviews.length > 0 ? (
          props.movieDetails.reviews.map((review) => (
            <div key={review.id} className="review-card">
              <h3 className="review-author">{review.author}</h3>
              <p className="review-content">{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
