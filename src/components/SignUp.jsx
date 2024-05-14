import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./signup.css"; // You can create a CSS file for styling if needed
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const SignUp = ({ setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSignUp = () => {
    // Perform basic validation
    if (username.trim() === "" || password.trim() === "" || bio.trim() === "") {
      setAlert("Please enter username, password, and bio.");
      setSuccess(false); // Set success to false
      setTimeout(() => {
        setAlert(null); // Clear the alert after 3 seconds
      }, 3000);
      return;
    }

    // If validation passes, proceed with sign-up
    setUsers((users) => [...users, { username, password, bio }]);
    setSuccess(true); // Set success to true
    setTimeout(() => {
      setSuccess(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }, 3000);
  };

  const navigateToLogin = () => {
    navigate("/login"); // Navigate to the sign-up page
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{alert}</Alert>
          </Stack>
        )}
        {success && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Sign up successful!</Alert>
          </Stack>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={navigateToLogin}>Login</button>
      </div>
    </div>
  );
};

export default SignUp;
