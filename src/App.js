import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
 


  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
            <li className="nav-item">
              <Link to={"/Search"} className="nav-link">
                Search
              </Link>
            </li>
          </div>
        
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />}/> 
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
