import React, { useState, useEffect } from "react";
import "./MainBody.css";
import Login from "./Login";
import Signup from "./Signup";
import Transactions from "./Transactions";

function MainBody() {
  const [currentPage, setCurrentPage] = useState("login"); // Default to login page

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "") {
      setCurrentPage("transactions");
    }
  }, []);



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
