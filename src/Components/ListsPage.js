import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "../App.css";

const Lists = () => {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState(""); // State for filter value

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter value when select changes
  };

  const addItem = () => {
    const newItemName = `Item ${items.length + 1}`;
    const newItem = { name: newItemName, option: "option1" }; // Set default option value
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
            <li>
              <Link to="/lists">List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <header>
        <select className="select" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <button onClick={addItem} className="new-button">
          New
        </button>
      </header>
    </div>
  );
};

export default Lists;
