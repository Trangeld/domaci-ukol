import React, { useState } from "react";
import "../App.css";

const ListInfo = ({ name, handleEditListFormToggle, handleListNameChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleClick = () => {
    setEditMode(true); // Activate edit mode
  };

  const handleInputChange = (e) => {
    setEditedName(e.target.value); // Update edited name
  };

  const handleSave = () => {
    handleListNameChange(editedName); // Pass the edited name to the parent component
    setEditMode(false); // Deactivate edit mode
  };

  return (
    <div className="list-info">
      {editMode ? (
        <input
          type="text"
          value={editedName}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <>
          <span className="List-identifier">List</span>
          <span className="List-name">{name}</span>
          <button onClick={handleClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default ListInfo;
