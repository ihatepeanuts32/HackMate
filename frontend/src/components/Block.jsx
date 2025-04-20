// Vaishali - Block Function 
// Description: this code implements a block button

import React, { useState } from 'react';
import '../styles/GroupView.css';

// set as blocked or not
const BlockButton = ({ children, className = '' })=> {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlock = () => {
    setIsBlocked(prev => !prev);
  };

  // button details
  return (
    <button
      onClick={handleBlock}
      className={`px-6 py-2 rounded font-semibold transition-colors duration-300
        ${isBlocked ? 'bg-red-600 text-white' : 'bg-pink-500 text-black hover:bg-red-100'}
        ${className}`}
    >
      {children}
      <span>{isBlocked ? 'Blocked' : 'Block'}</span>
    </button>
  );
};

export default BlockButton;
