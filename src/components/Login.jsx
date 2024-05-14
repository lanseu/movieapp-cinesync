import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkCredentials } from "./data";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./login.css";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform basic validation
    if (username.trim() === "" || password.trim() === "") {
      setAlert("Please enter both username and password.");
      setSuccess(false);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    // Check credentials
    if (checkCredentials(username, password)) {
      setLoggedIn(true);
      setSuccess(true);
      navigate("/");
    } else {
      setAlert("Invalid username or password.");
      setSuccess(false);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{alert}</Alert>
          </Stack>
        )}
        {success && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Login successful!</Alert>
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
        <button onClick={handleLogin}>Login</button>
        <button onClick={navigateToSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
