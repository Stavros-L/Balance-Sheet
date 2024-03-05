// File: client/src/App.jsx
import React, { useState } from "react";
import "./App.css";

import TopBar from "./components/TopBar";
import Image from "./components/Image.jsx";
import LeftBar from "./components/LeftBar";
import MainBody from "./components/MainBody";

function App() {
  const [currentPage, setCurrentPage] = useState(null);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="TopBar"><TopBar /></div>
        <div className="Image"><Image /></div>
        <div className="LeftBar">
          <LeftBar handlePageChange={handlePageChange} />
        </div>
        <div className="MainBody">
          <MainBody currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
