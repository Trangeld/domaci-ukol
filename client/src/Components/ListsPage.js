import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import ListInfo from "./EditListForm";
import Modal from "./Modal";
import "../App.css";

const Lists = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "List 1",
      owner: "User 1",
      option: "option1",
      isOpen: false,
    },
    {
      id: 2,
      name: "List 2",
      owner: "Admin",
      option: "option2",
      isOpen: false,
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState(""); // State for filter value
  const [listName, setListName] = useState("Your List Name");
  const [isEditListFormOpen, setIsEditListFormOpen] = useState(false); // State to manage the visibility of the edit list form
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage the visibility of the form
  const [showModal, setShowModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null); // State to store the index of the item to be removed
  const [listToDelete, setListToDelete] = useState(""); // State to store the name of the list to be deleted
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter value when select changes
  };

  const addItem = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setItems(updatedItems);
  };

  const handleOptionChange = (index, option) => {
    const updatedItems = [...items];
    updatedItems[index].option = option; // Update the option value for the specific item
    setItems(updatedItems);
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

  const handleEditListFormToggle = () => {
    setIsEditListFormOpen(!isEditListFormOpen); // Toggle the visibility of the edit list form
  };

  const handleListNameChange = (name) => {
    setListName(name); // Update the list name
  };

  const handleRemoveButtonClick = (index) => {
    setRemoveIndex(index); // Set the index of the item to be removed
    setListToDelete(items[index].name); // Set the name of the list to be deleted
    setShowModal(true);
  };

  const handleConfirm = () => {
    handleDelete(removeIndex); // Remove the item from the list
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setInputValue("");
  };

  const handleDialogSubmit = () => {
    // Handle submission of the input value here
    console.log("Submitted value:", inputValue);
    setIsDialogOpen(false);
    setInputValue("");
    const newItemName = `${inputValue} ${items.length + 1}`;
    const newItem = { name: newItemName, option: "option1", owner: "User1" }; // Set default option value
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
              <Link to="/lists">Lists</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
      <header>
        <span className="filter-identifyer">Filter</span>
        <select className="filter" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="option1">Active</option>
          <option value="option2">Archived</option>
          <option value="option3">Done</option>
        </select>
        <button onClick={addItem} className="new-button">
          New
        </button>
        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h2>Create new List</h2>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text..."
              />
              <div>
                <button onClick={handleDialogClose}>Cancel</button>
                <button onClick={handleDialogSubmit}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </header>
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
                  <span>Owner: {item.owner}</span>
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
                  <option value="option2">Archived</option>
                  <option value="option3">Done</option>
                </select>
                <button onClick={() => handleRemoveButtonClick(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        {showModal && (
          <Modal
            message={`Do you wish to delete "${listToDelete}" list?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Lists;
