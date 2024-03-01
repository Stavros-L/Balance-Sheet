import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";

function Signup() {
  const [showLogin, setShowLogin] = useState(false); // State to track whether to show Login
  const [username, setUsername] = useState(""); // State to store username input value
  const [password, setPassword] = useState(""); // State to store password input value

// Function to handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to signup endpoint
    axios
      .post(`http://localhost:5000/api/auth/register`, {
        username,
        password,
      })
      .then((response) => {
        // Handle successful signup, redirecting to another page
        console.log("Signup successful:", response.data);
        toggleLogin(); // Redirect to login page

      })
      .catch((error) => {
       // Handle signup error, displaying an error message to the user
        console.error("Signup failed:", error);
        alert("Signup Error");

      });
  
    console.log("Signing up with username:", username, "and password:", password);
  };

  // Function to toggle Login component
  const toggleLogin = () => {
    setShowLogin(!showLogin); // Toggle the showLogin state
  };

  return (
    <div>
      {/* Render Login component if showLogin is true */}
      {showLogin ? <Login /> : (
        <div>
          <h2>Sign Up</h2>
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
            <button type="submit">Sign Up</button>
          </form>
          {/* Text link to toggle Login component */}
          <p onClick={toggleLogin} style={{ cursor: "pointer", color: "blue" }}>Go back to Login</p>
        </div>
      )}
    </div>
  );
}

export default Signup;
