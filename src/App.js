import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";

const Home = () => (
  <div className="content">
    <h2>Home Page</h2>
    {/* Add your home page content here */}
  </div>
);

const List = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItemName = `Item ${items.length + 1}`;
    const newItem = { name: newItemName };
    setItems([...items, newItem]);
  };

  return (
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
          </ul>
        </nav>
      </div>
      <header>
        <button onClick={addItem} className="new-button">
          New
        </button>
      </header>
      <div className="item-list">
        {items.map((item, index) => (
          <div className="item" key={index}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
        </header>
        <div className="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
