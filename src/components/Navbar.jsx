import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate hook
import Logo from "../images/cinesynclogo.png";
import Search from "./Search";

const Navbar = ({
  searchedMovie,
  setSearchedMovie,
  fetchSearch,
  isLoggedIn,
  setLoggedIn,
}) => {
  const navigate = useNavigate(); // Declaring the navigate function
  const handleLogout = () => {
    // Handle logout logic here
    setLoggedIn(false);
    isLoggedIn(false); // Update the loggedIn state to false
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="title">
          <Link to="/">
            <img
              className="logo"
              style={{ width: "200px", height: "auto" }}
              src={Logo}
              alt="Cinesync Logo"
            />
          </Link>
        </h1>
      </div>
      <div className="search-container">
        <Search
          searchedMovie={searchedMovie}
          setSearchedMovie={setSearchedMovie}
          fetchSearch={fetchSearch}
        />
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/Profile">
              <button className="yellow-button">Profile</button>
            </Link>
            <button className="yellow-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="yellow-button"
            onClick={() => {
              navigate("/login"); // Redirecting to the Login page
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
