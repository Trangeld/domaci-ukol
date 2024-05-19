import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Users = () => {
  const [items, setItems] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Bob" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState(""); // State for filter value
  const [inputValue, setInputValue] = useState("");

  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const saveUser = async () => {
    try {
      await axios.post("http://localhost:5000/user", {
        name: userName,
        rights: "user",
      });
      setUserName("");
      fetchUsers();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  const createNewUser = async () => {
    console.log("Submitted value:", inputValue);
    setIsDialogOpen(false);
    setInputValue("");
    const newUserName = `${inputValue}`;
    try {
      const response = await axios.post("http://localhost:5000/user", {
        name: newUserName,
      });
      setNewUserName("");
      fetchUsers();
    } catch (error) {
      console.error("Error creating new item", error);
    }
  };

  const addItem = () => {
    setIsDialogOpen(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter value when select changes
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setInputValue("");
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
      <header className="toolbar">
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
        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h2>Create new User</h2>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text..."
              />
              <div>
                <button onClick={handleDialogClose}>Cancel</button>
                <button onClick={createNewUser}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="item-list">
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </div>
    </div>
  );
};

export default Users;
