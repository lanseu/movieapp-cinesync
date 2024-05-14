import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/cinesynclogo.png";
import Search from "./Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import "./navbar.css";

const Navbar = ({
  searchedMovie,
  setSearchedMovie,
  fetchSearch,
  isLoggedIn,
  setLoggedIn,
}) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    navigate("/");
    setLoggedIn(false);
    setLogoutModalOpen(false);
  };

  const closeModal = () => {
    setLogoutModalOpen(false);
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
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
      <Dialog
        open={isLogoutModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            height: "auto",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out? Logging out will redirect you to
            the homepage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} sx={{ color: "red" }}>
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            autoFocus
            sx={{
              color: "white",
              backgroundColor: "red",
              "&:hover": {
                color: "red",
                backgroundColor: "white",
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default Navbar;
