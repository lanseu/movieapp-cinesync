import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "./data";
import { checkCredentials } from "./data";
import "./login.css";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform basic validation
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password.");
      return;
    }

    // Check credentials
    if (checkCredentials(username, password)) {
      setLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid username or password.");
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
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
        <button onClick={navigateToSignUp}>Sign Up</button>{" "}
      </div>
    </div>
  );
};

export default Login;
