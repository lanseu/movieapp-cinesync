import React, { useState } from "react";

const ProfilePage = () => {
  const [watchlists, setWatchlists] = useState([
    { id: "Backburner", title: "Back", movies: [] },
    { id: "watchlist2", title: "Watchlist 2", movies: [] },
  ]);

  const addMovieToWatchlist = (movie, watchlistId) => {
    setWatchlists(
      watchlists.map((watchlist) =>
        watchlist.id === watchlistId
          ? { ...watchlist, movies: [...watchlist.movies, movie] }
          : watchlist
      )
    );
  };

  const updateMovieInWatchlist = (updatedMovie, watchlistId) => {
    setWatchlists(
      watchlists.map((watchlist) =>
        watchlist.id === watchlistId
          ? {
              ...watchlist,
              movies: watchlist.movies.map((movie) =>
                movie.id === updatedMovie.id ? updatedMovie : movie
              ),
            }
          : watchlist
      )
    );
  };

  const deleteMovieFromWatchlist = (movieId, watchlistId) => {
    setWatchlists(
      watchlists.map((watchlist) =>
        watchlist.id === watchlistId
          ? {
              ...watchlist,
              movies: watchlist.movies.filter((movie) => movie.id !== movieId),
            }
          : watchlist
      )
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h2 className="username">backburner25!</h2>
        <p className="bio">Nagmahal nang wagas sa wala namang label.</p>
        <button className="edit-bio-button">Edit</button>
        <input
          type="password"
          className="password-input"
          placeholder="Password"
        />
        <button className="change-password-button">Change Password</button>
        <h3 className="watchlist-title">Watchlists:</h3>
        {watchlists.map((watchlist) => (
          <div key={watchlist.id}>
            <h4>{watchlist.title}</h4>
            <ul className="watchlist">
              {watchlist.movies.map((movie) => (
                <li key={movie.id}>
                  {movie.title}
                  <button
                    onClick={() =>
                      deleteMovieFromWatchlist(movie.id, watchlist.id)
                    }
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    value={movie.title}
                    onChange={(e) =>
                      updateMovieInWatchlist(
                        { ...movie, title: e.target.value },
                        watchlist.id
                      )
                    }
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                addMovieToWatchlist({ id: Date.now(), title: "" }, watchlist.id)
              }
            >
              Add Movie
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
