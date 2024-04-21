import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import ListInfo from "./EditListForm";
import Form from "./Form"; // Import Form component
import "../App.css";

const ListPage = () => {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState(""); // State for filter value
  const [listName, setListName] = useState("Your List Name");
  const [isEditListFormOpen, setIsEditListFormOpen] = useState(false); // State to manage the visibility of the edit list form
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage the visibility of the form

  const addItem = () => {
    const newItemName = `Item ${items.length + 1}`;
    const newItem = { name: newItemName, option: "option1" }; // Set default option value
    setItems([...items, newItem]);
  };

  const handleOptionChange = (index, option) => {
    const updatedItems = [...items];
    updatedItems[index].option = option; // Update the option value for the specific item
    setItems(updatedItems);
  };

  const handleNumberChange = (index, value) => {
    // Handle number change for specific item
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewName(items[index].name);
  };

  const handleRename = (index) => {
    const updatedItems = [...items];
    updatedItems[index].name = newName;
    setItems(updatedItems);
    setEditingIndex(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter value when select changes
  };

  const handleEditListFormToggle = () => {
    setIsEditListFormOpen(!isEditListFormOpen); // Toggle the visibility of the edit list form
  };

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen); // Toggle the visibility of the form
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setItems(updatedItems);
  };

  const handleListNameChange = (name) => {
    setListName(name); // Update the list name
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
          </ul>
        </nav>
      </div>
      <header className="toolbar">
        <ListInfo
          name={listName}
          handleEditListFormToggle={handleEditListFormToggle}
          isEditListFormOpen={isEditListFormOpen}
          handleListNameChange={handleListNameChange} // Pass the function to update the list name
        />
        <span className="filter-identifyer">Filter</span>
        <select className="filter" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="option1">Active</option>
          <option value="option2">Done</option>
          <option value="option3">Rejected</option>
        </select>
        <button onClick={addItem} className="new-button">
          New
        </button>
      </header>
      {isFormOpen ? (
        <Form onClose={handleFormToggle} />
      ) : (
        <div className="item-list">
          {items
            .filter((item) => (filter ? item.option === filter : true))
            .map((item, index) => (
              <div
                className={`item ${item.option === "option2" ? "done" : ""} ${
                  item.option === "option3" ? "rejected" : ""
                } ${item.option === "option1" ? "active" : ""}`}
                key={index}
              >
                {editingIndex === index ? (
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
                    <FaEdit onClick={() => handleEditClick(index)} />
                  </>
                )}
                <div className="item-controls">
                  <select
                    className="select"
                    value={item.option}
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
                  <button onClick={() => handleDelete(index)}>Remove</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ListPage;
