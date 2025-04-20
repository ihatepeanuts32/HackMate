import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BlockedUsersContext = createContext();

export const BlockedUsersProvider = ({ children }) => {
  const [blockedUsers, setBlockedUsers] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('blockedUsers');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever blockedUsers changes
  useEffect(() => {
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
  }, [blockedUsers]);

  const blockUser = (user) => {
    setBlockedUsers(prev => {
      // Check if user is already blocked
      if (prev.some(u => u.id === user.id)) {
        return prev;
      }
      // Add user with current date
      return [...prev, { ...user, date: new Date().toLocaleDateString() }];
    });
  };

  const unblockUser = (userId) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <BlockedUsersContext.Provider value={{ blockedUsers, blockUser, unblockUser }}>
      {children}
    </BlockedUsersContext.Provider>
  );
};

BlockedUsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBlockedUsers = () => {
  const context = useContext(BlockedUsersContext);
  if (!context) {
    throw new Error('useBlockedUsers must be used within a BlockedUsersProvider');
  }
  return context;
}; 