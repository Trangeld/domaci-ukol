import React from "react";
import { FaEdit } from "react-icons/fa";

const ListInfo = ({ name, handleEditListFormToggle }) => {
  const handleClick = () => {
    handleEditListFormToggle(); // Open the edit list form
  };

  return (
    <div className="list-info">
      <span>List</span>
      <span>{name}</span>
      <FaEdit onClick={handleClick} />
    </div>
  );
};

export default ListInfo;
