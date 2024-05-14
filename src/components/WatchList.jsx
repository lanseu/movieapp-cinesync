import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';

const WatchList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies logic, for example:
    const fetchMovies = async () => {
      const response = await fetch('https://api.example.com/movieshttps://api.themoviedb.org/3/movie/${movieId}?api_key=75002009f55d0126dfdc3d258f18b958&append_to_response=credits');
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  const addToPlaylist = (movie) => {
    // Add to playlist logic
  };

  return (
    <div className="profile-page">
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              {/* <MDBCardBody className="text-center">
                <MDBCardImage src={userProfile.avatarUrl}
                  className="rounded-circle mb-4" fluid style={{ width: '150px' }} />
                <MDBTypography tag="h4">{userProfile.username}</MDBTypography>
              </MDBCardBody> */}
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody>
                <MDBCardTitle className="pb-3">Bio</MDBCardTitle>
               
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody>
                <MDBCardTitle className="pb-3">Username and Password Change</MDBCardTitle>
                <div className="d-flex flex-column align-items-center mb-3">
                 
                 
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody className="text-center">
                <MDBCardTitle className="pb-3">My Watchlist</MDBCardTitle>
                {/* <MDBIcon
                  fas
                  icon="plus-circle"
                  size="2x"
                  style={{ cursor: 'pointer' }}
                  onClick={goToWatchlist}
                /> */}
                <div>
                  {/* {playlist.map(movie => (
                    <div key={movie.id}>
                      <MDBCardImage
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="img-fluid mb-3"
                        style={{ cursor: 'pointer' }}
                      />
                      <MDBTypography tag="h5">{movie.title}</MDBTypography>
                    </div>
                  ))} */}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default WatchList;
