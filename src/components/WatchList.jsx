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
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies logic, for example:
    const fetchMovies = async () => {
      const response = await fetch("https://api.example.com/movies");
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  const addToPlaylist = (movie) => {
    // Add to playlist logic
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        {movies.map((movie) => (
          <MDBCol key={movie.id} className="mb-4" md="4">
            <MDBCard style={{ backgroundColor: "rgba(255, 255, 255, 0.127)" }}>
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={movie.poster_path}
                  fluid
                  style={{ width: "100%" }}
                />
                <MDBCardTitle>{movie.title}</MDBCardTitle>
                <MDBTypography>{movie.overview}</MDBTypography>
                <MDBBtn onClick={() => addToPlaylist(movie)}>
                  Add to Playlist
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default WatchList;
