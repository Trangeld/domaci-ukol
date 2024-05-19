import React from "react";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Continue</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
