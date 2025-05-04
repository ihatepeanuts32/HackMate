// Vaishali - Delete Chat Functionality
// Description: This code implements a delete chat functionality using React

import React, { useState } from 'react';
import '../styles/Delete.css';
import trashIcon from '../assets/trash-03.png';

const DeleteChat = ({ onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsConfirming(false);
  };

  // delete button details
  return (
    <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
      {isConfirming ? (
        <div className="flex items-center space-x-4">
          <p className="text-red-600 dark:text-red-400">Are you sure?</p>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white dark:bg-red-700 dark:text-white rounded font-semibold transition-colors duration-300 hover:bg-red-700 dark:hover:bg-red-800"
          >
            Yes
          </button>
          <button
            onClick={() => setIsConfirming(false)}
            className="px-4 py-2 bg-gray--black dark:bg-gray-700 dark:text-white rounded font-semibold transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsConfirming(true)}
          className="delete-icon-button"
          style={{ background: 'none', border: 'none', padding: 0, marginLeft: 8, cursor: 'pointer' }}
          title="Delete Chat"
        >
          <img src={trashIcon} alt="Delete" style={{ width: 24, height: 24, display: 'block' }} />
        </button>
      )}
    </div>
  );
};

export default DeleteChat;