import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/cinesynclogo.png";
import ProfilePage from "./Profile";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="title">
          <Link to="/">
            <img
              className="logo"
              style={{ width: "200px", height: "auto" }}
              src={Logo}
              alt="Cinepedia Logo"
            />
          </Link>
        </h1>
      </div>
      <div className="navbar-right">
        <Link to="/Profile" element={<ProfilePage />}>
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
