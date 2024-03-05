// Signup.jsx

import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";
import "./LoginSignup.css"; // Import the same CSS file used for Login styling

function Signup() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/auth/register`, {
        username,
        password,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        toggleLogin();
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        alert("Signup Error");
      });
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="LoginRender">
      {showLogin ? (
        <Login />
      ) : (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-login">
              Sign Up
            </button>
          </form>
          <p onClick={toggleLogin} className="login-link">
            Go back to Login
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
