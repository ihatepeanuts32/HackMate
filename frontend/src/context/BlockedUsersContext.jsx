import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const BlockedUsersContext = createContext();

export const BlockedUsersProvider = ({ children }) => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const fetchBlockedUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const currentUserId = getCurrentUserId();
      if (!currentUserId) {
        console.error('No user ID found in token');
        return;
      }

      console.log('Fetching blocked users for:', currentUserId);
      const response = await axios.get(`${API_URL}/api/block/${currentUserId}/blocked-users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Blocked users response:', response.data);
      setBlockedUsers(response.data || []);
    } catch (err) {
      console.error('Error fetching blocked users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const blockUser = async (targetId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const currentUserId = getCurrentUserId();
      if (!currentUserId) throw new Error('No user ID found in token');

      // Ensure targetId is a string and remove any whitespace
      const targetIdStr = targetId.toString().trim();
      
      console.log('Blocking user:', { currentUserId, targetId: targetIdStr });

      // Then attempt to block
      const response = await axios.put(
        `${API_URL}/api/block/${currentUserId}/block/${targetIdStr}`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Block response:', response.data);

      if (response.status === 200) {
        console.log('Block successful');
        await fetchBlockedUsers(); // Refresh the blocked users list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error blocking user:', error.response?.data || error.message);
      if (error.response?.status === 404) {
        throw new Error('User not found');
      } else if (error.response?.status === 500) {
        console.error('Server error details:', error.response.data);
        throw new Error('Server error while blocking user');
      }
      throw error;
    }
  };

  const unblockUser = async (targetId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const currentUserId = getCurrentUserId();
      if (!currentUserId) throw new Error('No user ID found in token');

      // Ensure targetId is a string and remove any whitespace
      const targetIdStr = targetId.toString().trim();

      console.log('Unblocking user:', { currentUserId, targetId: targetIdStr });
      const response = await axios.put(
        `${API_URL}/api/block/${currentUserId}/unblock/${targetIdStr}`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Unblock response:', response.data);

      if (response.status === 200) {
        console.log('Unblock successful');
        await fetchBlockedUsers(); // Refresh the blocked users list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unblocking user:', error.response?.data || error.message);
      if (error.response?.status === 404) {
        throw new Error('User not found');
      } else if (error.response?.status === 500) {
        console.error('Server error details:', error.response.data);
        throw new Error('Server error while unblocking user');
      }
      throw error;
    }
  };

  const isUserBlocked = (userId) => {
    if (!userId) return false;
    
    // Ensure userId is a string for comparison
    const userIdStr = userId.toString().trim();
    console.log('Checking if user is blocked:', userIdStr);
    console.log('Current blocked users:', blockedUsers);
    return blockedUsers.some(block => {
      const blockedId = block.blockedId || block;
      const blockIdStr = typeof blockedId === 'object' ? blockedId._id : blockedId;
      return blockIdStr.toString().trim() === userIdStr;
    });
  };

  return (
    <BlockedUsersContext.Provider value={{ 
      blockedUsers, 
      loading, 
      error, 
      blockUser, 
      unblockUser, 
      isUserBlocked,
      refreshBlockedUsers: fetchBlockedUsers,
      getCurrentUserId
    }}>
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