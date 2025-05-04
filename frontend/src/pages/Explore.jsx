import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Explore.css';
import blankProfile from "../assets/profile.png";
import pfp from "../assets/Profile icon.png";
import axios from 'axios';

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [page, setPage] = useState(0);
  const usersPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); 
        
        if (!token) {
          setError('Please log in to view users');
          setLoading(false);
          return;
        }
        
        const response = await axios.get('/api/auth/allUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        if (err.response?.status === 401) {
          setError('Please log in to view users');
        } else {
          setError('Failed to load users. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

//   const filteredUsers = users.filter((user) => {
//     return (
//     //   (!yearFilter || user.year === yearFilter) &&
//       (!typeFilter || user.type === typeFilter) &&
//       (!collegeFilter || user.college === collegeFilter)
//     );
//   });


const filteredUsers = users.filter((user) => {
    const matchesCollege = !collegeFilter || 
      (collegeFilter === "University of Texas at Dallas" ? 
        (user.college === "University of Texas at Dallas" ||
         user.college === "UTD" ||
         user.college?.includes("UT Dallas") ||
         user.college?.toLowerCase().includes("utd")) :
        user.college === collegeFilter);
  
    return (
        (!yearFilter || user.year === yearFilter) && (!typeFilter || user.type === typeFilter) &&
      matchesCollege
    );
  });

  const paginatedUsers = filteredUsers.slice(
    page * usersPerPage,
    (page + 1) * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleUserClick = (user) => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="explore-container">
      <h3>Explore Users</h3>

      <div className="filters">
        <select value={yearFilter} onChange={(e) => { setPage(0); setYearFilter(e.target.value); }}>
          <option value="">All Years</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>

        <select value={typeFilter} onChange={(e) => { setPage(0); setTypeFilter(e.target.value); }}>
          <option value="">All Developer Types</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>

        <select value={collegeFilter} onChange={(e) => { setPage(0); setCollegeFilter(e.target.value); }}>
          <option value="">All Colleges</option>
          <option value="University of Texas at Dallas">UTD</option>
        </select>
      </div>

      {paginatedUsers.length === 0 ? (
        <div className="no-results">No users match your filters. Try adjusting your search criteria.</div>
      ) : (
        <div className="card-grid">
            {paginatedUsers.map((user) => (
              <div 
                className="card" 
                key={typeof user.id === 'object' ? `user-${Math.random().toString(36).substring(2, 9)}` : user.id} 
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={user.imageUrl || pfp}
                  alt={user.name}
                  className="user-image"
                />
                <h3>{user.name}</h3>
                <p>{user.bio}</p>
              </div>
            ))}
          </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
          ← Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Explore;