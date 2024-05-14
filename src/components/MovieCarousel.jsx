import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import "./MovieCarousel.css";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=75002009f55d0126dfdc3d258f18b958`);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const movieSlides = movies.map((movie, index) => ({
      key: index,
      content: (
        <div className="carousel-item">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="carousel-img" />
          <div className="carousel-caption">
            <h5>{movie.title}</h5>
            <p>{movie.overview.substring(0, 100)}...</p>
          </div>
        </div>
      ),
    }));

    setSlides(movieSlides);

    // Set initial background image if movies exist
    if (movies.length > 0) {
      setBackgroundImage(`https://image.tmdb.org/t/p/original${movies[0].poster_path}`);
    }
  }, [movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    // Update background image based on the current slide
    if (slides.length > 0) {
      setBackgroundImage(`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`);
    }
  }, [currentIndex, slides, movies]);

  return (
    <div className="carousel-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {slides.length > 0 && (
        <Carousel
          slides={slides}
          goToSlide={currentIndex}
          offsetRadius={2}
          showNavigation={true}
          animationConfig={config.gentle}
        />
      )}
    </div>
  );
};

export default MovieCarousel;
