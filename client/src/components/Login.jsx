import React, { useState } from "react";
import Signup from "./Signup";
import axios from "axios";

function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/api/auth/login`, {
        username,
        password,
      })
      .then((response) => {
         // Handle successful login, saving token and redirecting to another page
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        // Redirect to MainBody component
        window.location.href = "/"; // Redirect to the root URL
      })
      .catch((error) => {
       // Handle Login error, displaying an error message to the user
        console.error("Login failed:", error);
        if (error.response.status === 401) {
          alert("Incorrect username or password.");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      });
  };

  const toggleSignup = () => {
    setShowSignup(true);
  };

  return (
    <div>
      {showSignup ? <Signup /> : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p onClick={toggleSignup} style={{ cursor: "pointer", color: "blue" }}>Go to Sign Up</p>
        </div>
      )}
    </div>
  );
}

export default Login;
