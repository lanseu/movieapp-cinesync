// WatchList.jsx
import React, { useContext } from "react";
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
import { FavoritesContext } from "./FavoritesContext"; // Import the context

const WatchList = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext); // Use the context

  return (
    <div className="profile-page">
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: "rgba(255, 255, 255, 0.127)" }}>
              <MDBCardBody className="text-center">
                <MDBCardTitle className="pb-3">My Watchlist</MDBCardTitle>
                <MDBRow className="justify-content-center">
                  {favorites.map((movie) => (
                    <MDBCol key={movie.id} md="3" className="mb-4">
                      <MDBCard
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.127)",
                        }}
                      >
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
                            alt={movie.title}
                            className="img-fluid mb-3"
                            style={{ cursor: "pointer" }}
                          />
                          <MDBTypography tag="h5">{movie.title}</MDBTypography>
                          <MDBBtn
                            color="danger"
                            onClick={() => removeFromFavorites(movie.id)}
                          >
                            Remove Movie
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default WatchList;
