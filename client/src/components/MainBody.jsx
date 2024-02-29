// client/src/components/MainBody.jsx
import React, { useState } from "react";
import "./MainBody.css";
import Login from "./Login";
import Signup from "./Signup";
import Transactions from "./Transactions";

function MainBody() {
  const [currentPage, setCurrentPage] = useState("login"); // Default to login page

  // Function to switch to signup page
  const goToSignup = () => {
    setCurrentPage("signup");
  };

  // Function to switch to transactions page
  const goToTransactions = () => {
    setCurrentPage("transactions");
  };

  // Render the current page based on state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "signup":
        return <Signup />;
      case "transactions":
        return <Transactions />;
      case "login":
      default:
        return <Login />;
    }
  };

  return (
    <div className="container">
      {renderCurrentPage()}
    </div>
  );
}

export default MainBody;
