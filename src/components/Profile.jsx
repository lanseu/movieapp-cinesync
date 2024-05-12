import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

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
      <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h4">Julie L. Arsenault</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                </MDBCardText>
                <div className="mb-4 pb-2">
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="facebook" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating className="mx-1">
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="skype" size="lg" />
                  </MDBBtn>
                </div>
                <MDBBtn rounded size="lg">
                  Message now
                </MDBBtn>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">4751</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
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
