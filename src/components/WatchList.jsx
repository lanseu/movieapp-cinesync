import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";

const WatchList = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Perfect", poster_path: "https://via.placeholder.com/150" },
    { id: 2, title: "Perfect", poster_path: "https://via.placeholder.com/150" },
    { id: 3, title: "Perfect", poster_path: "https://via.placeholder.com/150" },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const addToPlaylist = (movie) => {
    if (!movies.includes(movie)) {
      setMovies([...movies, movie]);
    }
  };

  const removeFromPlaylist = (movieId) => {
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="profile-page">
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: "rgba(255, 255, 255, 0.127)" }}>
              <MDBCardBody className="text-center">
                <MDBCardTitle className="pb-3">My Watchlist</MDBCardTitle>
                <MDBRow className="justify-content-center">
                  {movies.map((movie) => (
                    <MDBCol key={movie.id} md="3" className="mb-4">
                      <MDBCard
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.127)",
                        }}
                      >
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src={movie.poster_path}
                            alt={movie.title}
                            className="img-fluid mb-3"
                            style={{ cursor: "pointer" }}
                          />
                          <MDBTypography tag="h5">{movie.title}</MDBTypography>
                          <MDBBtn
                            color="danger"
                            onClick={() => removeFromPlaylist(movie.id)}
                          >
                            Remove Movie
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))}
                </MDBRow>
                <MDBBtn
                  color="primary"
                  onClick={() =>
                    setSelectedMovie({
                      id: Math.floor(Math.random() * 100),
                      title: "Perfect",
                      poster_path: "https://via.placeholder.com/150",
                    })
                  }
                >
                  Add Movie
                </MDBBtn>
                {selectedMovie && (
                  <div>
                    <MDBCardImage
                      src={selectedMovie.poster_path}
                      alt={selectedMovie.title}
                      className="img-fluid mb-3"
                      style={{ cursor: "pointer" }}
                    />
                    <MDBTypography tag="h5">
                      {selectedMovie.title}
                    </MDBTypography>
                    <MDBBtn
                      color="success"
                      onClick={() => addToPlaylist(selectedMovie)}
                    >
                      Add Movie
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      onClick={() => setSelectedMovie(null)}
                    >
                      Cancel
                    </MDBBtn>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default WatchList;
