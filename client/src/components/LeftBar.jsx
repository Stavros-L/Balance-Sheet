import React from "react";
import "./LeftBar.css"

function LeftBar({ handlePageChange }) {
  const handleClick = (page) => {
    console.log("Clicked:", page);
    handlePageChange(page);
  };

if (localStorage.getItem("user")) // Check if user has logged in
return (
  <div className="Menu">
    <h3 onClick={() => handleClick("transactions")}>Transactions</h3>
    <h3 onClick={() => handleClick("overview")}>Overview</h3>
    <h3 onClick={() => handleClick("profile")}>Profile</h3>

    <div className="Signature">
    <p><a href="https://github.com/Stavros-L/Balance-Sheet">GitHub page</a> </p>
  </div>
  </div>

);
else {
  return null; // Render nothing if user is not logged in
}

}

export default LeftBar;
