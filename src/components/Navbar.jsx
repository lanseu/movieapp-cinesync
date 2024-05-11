import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo5.jpg";
import tmdb from "../images/tmdb.svg";
import ProfilePage from "./Profile";

const Navbar = () => {
  return (
    <nav>
      <img className="logo" src={Logo} alt="Cinepedia Logo" />
      <h1 className="title">
        <Link to="/">Cinepedia</Link>
      </h1>
      <img className="attribution" src={tmdb} alt="Attribution" />
      <Link to="/Profile" element={<ProfilePage />}>
        Profile
      </Link>
    </nav>
  );
};

export default Navbar;
