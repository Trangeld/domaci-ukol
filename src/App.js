import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import ListPage from "./Components/ListPage"; // Assuming ListPage component is in the Components folder
import ListsPage from "./Components/ListsPage";
import UsersPage from "./Components/UsersPage";
import NewPage from "./Components/NewPage";

const Home = () => (
  <div className="content">
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
          <li>
            <Link to="/lists">Lists</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <h2>Home Page</h2>
    </div>
    {/* Add your home page content here */}
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="logo-box">
          <img src={logo} className="logo" alt="logo" />
        </header>
        <div className="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/list" element={<ListPage />} />{" "}
            <Route path="/lists" element={<ListsPage />} />{" "}
            <Route path="/users" element={<UsersPage />} />{" "}
            <Route path="/test" element={<NewPage />} />{" "}
            {/* Use ListPage component */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
