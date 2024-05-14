import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/cinesynclogo.png";
import ProfilePage from "./Profile";
import Search from "./Search";

const Navbar = ({ searchedMovie, setSearchedMovie, fetchSearch }) => {
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
        <Link to="/Profile" element={<ProfilePage />}>
          <button className="yellow-button">Profile</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
