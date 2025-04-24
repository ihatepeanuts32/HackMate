import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import '../styles/Explore.css';

const ExploreGroup = () => {
  const [groups, setGroups] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const groupsPerPage = 6;
  const navigate = useNavigate();
  
  //Grab the groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('/api/groups/search');
        setGroups(Array.isArray(res.data)? res.data :[]);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
        setGroups([]);
      }
    };
    fetchGroups();
  }, []);

  if (groups.length === 0) {
    return <div style={{ color: 'white', padding: '1rem' }}>Loading groups...</div>;
  }
  
  const filteredGroups = groups.filter((group) => {
    return !statusFilter || group.groupType === statusFilter.toLowerCase();
  });

  const paginatedGroups = filteredGroups.slice(
    page * groupsPerPage,
    (page + 1) * groupsPerPage
  );

  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);
 
  //when clicked take to the uniquely constructed group view 
  const handleGroupClick = (group) => {
    navigate(`/group/${group._id}`, { state: {group} });
  };
  
  return (
    <div className="explore-container">
      <h3>Explore Groups</h3>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => { setPage(0); setStatusFilter(e.target.value); }}>
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="card-grid">
        {paginatedGroups.map((group) => (
          <div className="card" key={group._id} onClick={() => handleGroupClick(group)}>
            <h3>{group.name}</h3>
            <p>Status: {group.groupType}</p>
          </div>
        ))}
      </div>

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

export default ExploreGroup;
