import "./App.css";

import TopBar from "./components/TopBar";
import Image from "./components/Image.jsx";
import LeftBar from "./components/LeftBar";
import MainBody from "./components/MainBody";

function App() {
  return (
    <div classNameName="App">
      <div className="container">
        <div className="TopBar"><TopBar /></div>
        <div className="Image"><Image /></div>
        <div className="LeftBar"><LeftBar /></div>
        <div className="MainBody"><MainBody /></div>
      </div>
    </div>
  );
}

export default App;
