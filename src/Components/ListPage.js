import React, { useState } from "react";
import { Link } from "react-router-dom"; // Only import Link from react-router-dom
import { FaEdit } from "react-icons/fa"; // Import the Edit icon from react-icons
import "../App.css";

const List = () => {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited
  const [newName, setNewName] = useState(""); // Track the new name while editing

  const addItem = () => {
    const newItemName = `Item ${items.length + 1}`;
    const newItem = { name: newItemName };
    setItems([...items, newItem]);
  };

  const handleOptionChange = (index, option) => {
    // Handle option change for specific item
  };

  const handleNumberChange = (index, value) => {
    // Handle number change for specific item
  };

  const handleEditClick = (index) => {
    setEditingIndex(index); // Set the editing index when edit button is clicked
    setNewName(items[index].name); // Set the current name as initial value for editing
  };

  const handleRename = (index) => {
    const updatedItems = [...items];
    updatedItems[index].name = newName;
    setItems(updatedItems);
    setEditingIndex(null); // Reset editing index after renaming
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
            {editingIndex === index ? ( // Check if the item is being edited
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={() => handleRename(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <FaEdit onClick={() => handleEditClick(index)} />{" "}
                {/* Add edit icon */}
              </>
            )}
            <div className="item-controls">
              <select
                className="select"
                onChange={(e) => handleOptionChange(index, e.target.value)}
              >
                <option value="option1">Active</option>
                <option value="option2">Done</option>
                <option value="option3">Rejected</option>
              </select>
              <input
                type="number"
                onChange={(e) => handleNumberChange(index, e.target.value)}
              />
              <button>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List; // Don't wrap List component with BrowserRouter
