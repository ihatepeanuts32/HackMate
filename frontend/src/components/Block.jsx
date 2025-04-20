// Vaishali - Block Function 
// Description: this code implements a block button

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/GroupView.css';
import { useBlockedUsers } from '../context/BlockedUsersContext';

// set as blocked or not
const BlockButton = ({ children, className = '', user }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const { blockUser, unblockUser, blockedUsers } = useBlockedUsers();

  // Check if user is already blocked when component mounts
  useEffect(() => {
    setIsBlocked(blockedUsers.some(u => u.id === user.id));
  }, [blockedUsers, user.id]);

  const handleBlock = () => {
    if (isBlocked) {
      unblockUser(user.id);
    } else {
      blockUser(user);
    }
    setIsBlocked(!isBlocked);
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

BlockButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default BlockButton;
