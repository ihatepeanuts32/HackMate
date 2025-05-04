import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Explore.css';

const ExploreGroup = () => {
  const [groups, setGroups] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [hackathonFilter, setHackathonFilter] = useState('');
  const [hackathons, setHackathons] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true); // <-- New loading flag

  const groupsPerPage = 6;
  const navigate = useNavigate();

  // Fetch hackathons on mount
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get('/api/hackathons/get');
        setHackathons(res.data);
      } catch (err) {
        console.error('Failed to fetch hackathons:', err);
        setHackathons([]);
      }
    };
    fetchHackathons();
  }, []);

  // Fetch groups when filters change
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true); 
      try {
        const params = { isPublic: true };
        if (statusFilter) params.groupType = statusFilter.toLowerCase();
        if (hackathonFilter) params.hackathon = hackathonFilter;

        const res = await axios.get('/api/groups/search', { params });
        setGroups(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
        setGroups([]);
      }
      setLoading(false); 
    };
    fetchGroups();
  }, [statusFilter, hackathonFilter]);

  const paginatedGroups = groups.slice(
    page * groupsPerPage,
    (page + 1) * groupsPerPage
  );
  const totalPages = Math.ceil(groups.length / groupsPerPage);

  const handleGroupClick = (group) => {
    navigate(`/group/${group._id}`, { state: { group } });
  };

  return (
    <div className="explore-container">
      <h3>Explore Groups</h3>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => { setPage(0); setStatusFilter(e.target.value); }}>
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Invite-Only">Invite-Only</option>
        </select>

        <select value={hackathonFilter} onChange={(e) => { setPage(0); setHackathonFilter(e.target.value); }}>
          <option value="">All Hackathons</option>
          {hackathons.map((hack) => (
            <option key={hack._id} value={hack.id}>{hack.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ color: 'white', padding: '1rem' }}>Loading groups...</div>
      ) : groups.length === 0 ? (
        <div style={{ color: 'white', padding: '1rem' }}>No groups found.</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ExploreGroup;
