import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Users = () => {
  const [items, setItems] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Bob" },
  ]);
  const [selectedItem, setSelectedItem] = useState("");
  const [viewSelectedItem, setViewSelectedItem] = useState(false);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleViewSelected = () => {
    setViewSelectedItem(true);
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
      <div className="main-content">
        <h1>Simple Dialog App</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="radio"
                  name="item"
                  value={item.name}
                  onChange={() => handleItemClick(item.name)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleViewSelected}>View Selected Item</button>
        {viewSelectedItem && (
          <div>
            <h2>Selected Item: {selectedItem}</h2>
            {/* Render additional content for selected item if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
