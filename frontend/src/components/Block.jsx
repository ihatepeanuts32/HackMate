// Vaishali - Block Function 
// Description: this code implements a block button

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/GroupView.css';
import { useBlockedUsers } from '../context/BlockedUsersContext';

// set as blocked or not
const BlockButton = ({ children, className = '', user }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { blockUser, unblockUser, isUserBlocked, getCurrentUserId } = useBlockedUsers();

  // Get the ACTUAL USER ID
  const getUserId = (user) => {
    console.log('Raw user object received:', JSON.stringify(user, null, 2));
    
    if (!user) {
      console.error('No user provided to getUserId');
      return null;
    }

    // If user is already a string, return it
    if (typeof user === 'string') {
      return user;
    }

    // Extract ID from user object
    let id = null;

    // Handle nested id object structure
    if (user.id && user.id._id) {
      id = user.id._id;
    } else if (user._id) {
      id = user._id;
    } else if (user.userId) {
      id = user.userId;
    } else if (user.blockedId) {
      // Handle case where user might be from blocked users list
      id = typeof user.blockedId === 'object' ? user.blockedId._id : user.blockedId;
    }

    if (!id) {
      console.error('No valid ID found in user object:', user);
      return null;
    }

    // Convert to string if it's not already and clean it
    const idString = id.toString().trim();
    console.log('Extracted user ID:', idString);
    return idString;
  };

  // GEt current logged-in user ID
  const currentUserId = getCurrentUserId && getCurrentUserId();
  const targetUserId = getUserId(user);
  const isSelf = currentUserId && targetUserId && currentUserId === targetUserId;

  useEffect(() => {
    const checkBlockStatus = async () => {
      if (user && !isSelf) {
        const userId = getUserId(user);
        if (userId) {
          console.log('Checking block status for user:', userId);
          const blocked = isUserBlocked(userId);
          console.log('Is user blocked?', blocked);
          setIsBlocked(blocked);
        }
      }
    };
    checkBlockStatus();
  }, [user, isUserBlocked, isSelf]);

  const handleBlock = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      console.error('No user provided to handleBlock');
      return;
    }

    const userId = getUserId(user);
    if (!userId) {
      console.error('Failed to get valid user ID for blocking');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Attempting to toggle block for user:', userId);
      if (isBlocked) {
        await unblockUser(userId);
        console.log('Successfully unblocked user:', userId);
      } else {
        await blockUser(userId);
        console.log('Successfully blocked user:', userId);
      }
      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error('Error toggling block status:', error);
      alert('Failed to ' + (isBlocked ? 'unblock' : 'block') + ' user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // button details
  if (isSelf) {
    return null; // HIDeS the block button if trying to block self
  }
  return (
    <button
      onClick={handleBlock}
      disabled={isLoading}
      className={`px-6 py-2 rounded font-semibold transition-colors duration-300
        ${isBlocked ? 'bg-red-600 text-white' : 'bg-pink-500 text-black hover:bg-red-100'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
    >
      {children}
      <span>{isLoading ? 'Loading...' : isBlocked ? 'Blocked' : 'Block'}</span>
    </button>
  );
};

BlockButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      _id: PropTypes.string,
      userId: PropTypes.string,
      id: PropTypes.string,
      blockedId: PropTypes.string
    })
  ]).isRequired,
};

export default BlockButton;
