import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard"; // Assuming MovieCard.jsx is in the same directory
import ReactPaginate from "react-paginate";
import "./homepage.css";

const Collections = (props) => {
  const apiKey = "75002009f55d0126dfdc3d258f18b958";

  const [isActive, setIsActive] = useState([true, false, false, false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [activeUrl, setActiveUrl] = useState(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);

  const fetchMovies = useCallback(
    (url, page = 1) => {
      fetch(`${url}&page=${page}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setMovies(data.results);

          // Calculate total pages based on total results and desired results per page
          const totalResults = data.total_results || 0;
          const resultsPerPage = 20; // Adjust this as needed
          const totalPages = Math.ceil(totalResults / resultsPerPage);
          setTotalPages(totalPages);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    },
    []
  );

  useEffect(() => {
    fetchMovies(activeUrl, currentPage);
  }, [fetchMovies, activeUrl, currentPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const toggleClass = (index, url) => {
    const newState = isActive.map((_, i) => i === index);
    setIsActive(newState);
    setActiveUrl(url);
    setCurrentPage(1); // Reset to first page when changing collections
  };

  const collections = [
    {
      name: "Trending",
      url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
      icon: <i className="fa-solid fa-bolt"></i>,
    },
    {
      name: "Now Playing",
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`,
      icon: <i className="fa-solid fa-film"></i>,
    },
    {
      name: "Top Rated",
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`,
      icon: <i className="fa-solid fa-star"></i>,
    },
    {
      name: "Upcoming",
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`,
      icon: <i className="fa-solid fa-calendar"></i>,
    },
  ];

  return (
    <div>
      <div className="collections">
        {collections.map((collection, index) => (
          <div
            key={index}
            className={isActive[index] ? "collections-inner active" : "collections-inner"}
            onClick={() => {
              props.setActiveList(collection.name);
              props.setActiveUrl(collection.url);
              toggleClass(index, collection.url);
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
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Collections;
