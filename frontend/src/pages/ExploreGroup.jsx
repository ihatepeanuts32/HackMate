import React, { useState } from 'react';
import '../styles/Explore.css';

const mockGroups = [
  { id: 1, name: 'React Wizards', status: 'Open' },
  { id: 2, name: 'Node Ninjas', status: 'Closed' },
  { id: 3, name: 'Fullstack Fusion', status: 'Open' },
  { id: 4, name: 'Design Gurus', status: 'Closed' },
  { id: 5, name: 'AI Explorers', status: 'Open' },
  { id: 6, name: 'Cloud Hackers', status: 'Open' },
  { id: 7, name: 'Data Divas', status: 'Closed' },
  { id: 8, name: 'Security Squad', status: 'Open' },
  { id: 9, name: 'Mobile Mavericks', status: 'Closed' },
];

const ExploreGroup = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const groupsPerPage = 6;

  const filteredGroups = mockGroups.filter((group) => {
    return !statusFilter || group.status === statusFilter;
  });

  const paginatedGroups = filteredGroups.slice(
    page * groupsPerPage,
    (page + 1) * groupsPerPage
  );

  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);

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
          <div className="card" key={group.id}>
            <h3>{group.name}</h3>
            <p>Status: {group.status}</p>
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
