// NewPage.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NewPage = () => {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem || "Default";

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
      <div className="content">
        <h1>New Page</h1>
        <div>
          <h2>Selected Item: {selectedItem}</h2>
        </div>
        <Link to="/users">Go back to Users Page</Link>
      </div>
    </div>
  );
};

export default NewPage;
