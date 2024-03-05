import React, { useEffect } from "react";
import "./MainBody.css";
import Login from "./Login";
import Signup from "./Signup";
import Transactions from "./Transactions";
import Profile from "./Profile";
import Overview from "./Overview";

function MainBody({ currentPage, setCurrentPage }) {
  useEffect(() => {
    console.log("Current Page:", currentPage);
    const token = localStorage.getItem("token");
    if (token && token !== "" && currentPage == null) {
      setCurrentPage("transactions");
      // setCurrentPage(currentPage);
    }
    if (!token) {
      setCurrentPage("login");
    }
  }, [currentPage, setCurrentPage]);

  const renderCurrentPage = () => {
    console.log("Current Page2:", currentPage);
    switch (currentPage) {
      case "signup":
        return <Signup />;
      case "login":
        return <Login />;
      case "overview":
        return <Overview />;
      case "profile":
        return <Profile />;
      case "transactions":
      default:
        return <Transactions />;
    }
  };

  return <div className="Maincontainer">{renderCurrentPage()}</div>;
}

export default MainBody;
