import React, { useState } from "react";
import {
  MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage,
  MDBTypography, MDBCardTitle, MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom"; 

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    username: "JulieArsenault",
    password: "password123",
    bio: "Love coding and watching movies",
    avatarUrl: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
  });

  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const handleBioChange = (event) => {
    setUserProfile({
     ...userProfile,
      bio: event.target.value
    });
  };

  const handleUsernameChange = (event) => {
    setUserProfile({
     ...userProfile,
      username: event.target.value
    });
  };

  const handlePasswordChange = (event) => {
    setUserProfile({
     ...userProfile,
      password: event.target.value
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const goToWatchlist = () => {
    navigate('/watchlist'); // Navigate to watchlist page
  };

  return (
    <div className="profile-page">
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody className="text-center">
                <MDBCardImage src={userProfile.avatarUrl}
                  className="rounded-circle mb-4" fluid style={{ width: '150px' }} />
                <MDBTypography tag="h4">{userProfile.username}</MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody>
                <MDBCardTitle className="pb-3">Bio</MDBCardTitle>
                <div className="d-flex align-items-center">
                  <input
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)', width: 'calc(100% - 40px)', padding: '10px', borderRadius: '5px' }}
                    value={userProfile.bio}
                    onChange={handleBioChange}
                    className="form-control me-2 text-white"
                    placeholder="Edit your bio"
                  />
                  <MDBIcon fas icon="edit" size="sm" style={{ cursor: 'pointer' }} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody>
                <MDBCardTitle className="pb-3">Username and Password Change</MDBCardTitle>
                <div className="d-flex flex-column align-items-center mb-3">
                  <div className="d-flex align-items-center mb-3">
                    <input
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)', width: 'calc(100% - 40px)', padding: '10px', borderRadius: '5px' }}
                      value={userProfile.username}
                      onChange={handleUsernameChange}
                      className="form-control me-2 text-white"
                      placeholder="Edit your username"
                    />
                    <MDBIcon fas icon="edit" size="sm" style={{ cursor: 'pointer' }} />
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)', width: 'calc(100% - 40px)', padding: '10px', borderRadius: '5px' }}
                      type="password"
                      value={userProfile.password}
                      onChange={handlePasswordChange}
                      className="form-control me-2 text-white"
                      placeholder="New Password"
                    />
                    <MDBIcon fas icon="edit" size="sm" style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-5 text-white" md="8">
            <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.127)' }}>
              <MDBCardBody className="text-center">
                <MDBCardTitle className="pb-3">My Watchlist</MDBCardTitle>
                <MDBIcon  className="pb-2"
                  fas 
                  icon="plus-circle" 
                  size="2x" 
                  style={{ cursor: 'pointer' }} 
                  onClick={goToWatchlist} 
                />
                <div>
                  {/* Render movies here */}
                </div>

                <MDBTypography tag="p">Manage your watchlist</MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ProfilePage;
