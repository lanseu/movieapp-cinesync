import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CurrentList from "./components/pages/CurrentList";
import MovieDetails from "./components/pages/MovieDetails";
import Loading from "./components/Loading";
import ProfilePage from "./components/Profile";
import WatchList from "./components/WatchList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { FavoritesProvider } from "./components/FavoritesContext";
import "./index.css";

const App = () => {
  const [activeList, setActiveList] = useState("Trending");
  const [currentArr, setCurrentArr] = useState([]);
  const [activeUrl, setActiveUrl] = useState(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=75002009f55d0126dfdc3d258f18b958`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedIn] = useState();
  const [signedUsers, setUsers] = useState("");
  const [searchedMovie, setSearchedMovie] = useState("");
  const [searchResultArr, setSearchResultArr] = useState([]);
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=75002009f55d0126dfdc3d258f18b958&query=${searchedMovie}`;

  const [movieId, setMovieId] = useState(0);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    overview: "",
    posterPath: "",
    genres: [],
    originalLanguage: "",
    releaseDate: "",
    runtime: "",
    rating: "",
    cast: [],
    director: [],
    productionCompany: "",
    backdropPath: "",
  });
  const [reviews, setReviews] = useState([]);

  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=75002009f55d0126dfdc3d258f18b958&append_to_response=credits`;
  const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=75002009f55d0126dfdc3d258f18b958`;

  const getCurrentList = () => {
    axios.get(activeUrl).then((response) => {
      setCurrentArr(response.data.results);
    });
  };

  const fetchSearch = () => {
    axios.get(searchUrl).then((response) => {
      setSearchResultArr(response.data.results);
    });
  };

  const fetchMovieDetails = () => {
    setIsLoading(true);
    axios
      .get(movieDetailsUrl)
      .then((response) => {
        const details = {
          title: response.data.title,
          overview: response.data.overview,
          posterPath:
            "https://image.tmdb.org/t/p/original/" + response.data.poster_path,
          genres: response.data.genres.map((genre) => genre.name + " "),
          originalLanguage: response.data.original_language,
          releaseDate: response.data.release_date,
          runtime: response.data.runtime,
          rating: response.data.vote_average,
          cast: response.data.credits.cast.filter(
            (person) => person.known_for_department === "Acting"
          ),
          director: response.data.credits.crew.find(
            (person) => person.known_for_department === "Directing"
          )?.name,
          productionCompany: response.data.production_companies[0]?.name,
          backdropPath: response.data.backdrop_path,
        };

        axios
          .get(reviewsUrl)
          .then((reviewsResponse) => {
            details.reviews = reviewsResponse.data.results; // Add reviews to details object
            setMovieDetails(details); // Set movie details including reviews
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCurrentList();

    setMovieId(JSON.parse(window.sessionStorage.getItem("movieId")));
  }, [activeList]);

  useEffect(() => {
    if (movieId !== 0) {
      fetchMovieDetails();
    }

    window.sessionStorage.setItem("movieId", movieId);
  }, [movieId]);

  // This useEffect hook will trigger fetchSearch whenever searchedMovie changes
  useEffect(() => {
    if (searchedMovie.trim() !== "") {
      fetchSearch();
    }
  }, [fetchSearch, searchedMovie]);

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar
        searchedMovie={searchedMovie}
        setSearchedMovie={setSearchedMovie}
        fetchSearch={fetchSearch}
        isLoggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      >
        <Search
          searchedMovie={searchedMovie}
          setSearchedMovie={setSearchedMovie}
          fetchSearch={fetchSearch}
        />
      </Navbar>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              currentArr={currentArr}
              setActiveList={setActiveList}
              setActiveUrl={setActiveUrl}
              setMovieId={setMovieId}
            />
          }
        />
        <Route
          path="/search-results/:query"
          element={
            <>
              {/* Back Button */}
              <div className="back-btn-container">
                <button
                  className="back-btn"
                  onClick={() => {
                    setSearchedMovie("");
                    navigate("/");
                  }}
                >
                  <i className="fa-solid fa-circle-arrow-left"></i>
                </button>
              </div>
              {/* Conditional Rendering */}
              {searchResultArr.length > 0 ? (
                <CurrentList
                  currentArr={searchResultArr}
                  id={movieId}
                  setMovieId={setMovieId}
                />
              ) : (
                <div className="no-results-div">
                  <h1 className="no-results">No results found</h1>
                </div>
              )}
            </>
          }
        />

        <Route
          path="/movie/:id"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <MovieDetails movieDetails={movieDetails} />
            )
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}
        />

        <Route path="/signup" element={<SignUp setUsers={setUsers} />} />
      </Routes>
      {/* <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </Router>
    </MovieProvider> */}
    </div>
  );
};

export default App;
