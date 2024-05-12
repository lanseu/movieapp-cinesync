import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard"; // Assuming MovieCard.jsx is in the same directory
import ReactPaginate from "react-paginate";
import "./homepage.css";

const Collections = (props) => {
  const [isActive, setIsActive] = useState([true, false, false, false, false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);

  const apiKey = "75002009f55d0126dfdc3d258f18b958";

  const fetchMovies = useCallback(
    (page = currentPage) => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            throw new Error("Expected JSON response, received something else.");
          }
        })
        .then((data) => {
          const moviesToSet = isActive[0]
            ? data.results.sort((a, b) => a.title.localeCompare(b.title))
            : data.results;
          setMovies(moviesToSet);

          // Calculate total pages based on total results and desired results per page
          const totalResults = data.total_results || 0;
          const resultsPerPage = 16;
          const totalPages = Math.ceil(totalResults / resultsPerPage);
          setTotalPages(totalPages);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    },
    [currentPage, isActive, apiKey]
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    fetchMovies(selectedPage);
  };

  const toggleClass = (index) => {
    const newState = isActive.map((_, i) => i === index);
    setIsActive(newState);
  };

  const collections = [
    {
      name: "Trending",
      url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
      icon: <i className="fa-solid fa-bolt"></i>,
    },
    {
      name: "Now Playing",
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`,
      icon: <i className="fa-solid fa-film"></i>,
    },
    {
      name: "Top Rated",
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`,
      icon: <i className="fa-solid fa-star"></i>,
    },
    {
      name: "Upcoming",
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`,
      icon: <i className="fa-solid fa-calendar"></i>,
    },
  ];

  return (
    <div>
      <div className="collections">
        {collections.map((collection, index) => (
          <div
            key={index}
            className={
              isActive[index] ? "collections-inner active" : "collections-inner"
            }
            onClick={() => {
              props.setActiveList(collection.name);
              props.setActiveUrl(collection.url);
              toggleClass(index);
            }}
          >
            {collection.icon}
            <p>{collection.name}</p>
          </div>
        ))}
      </div>

      {/* Render movie cards */}
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            setMovieId={props.setMovieId}
          />
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Collections;
