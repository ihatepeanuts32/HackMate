// Ifrah
// Description: Explore page to find other users
import hackmateLogo from "../assets/hackmateLogo.png"
import blankProfile from "../assets/profile.png"   
import React, { useState } from 'react';
import '../styles/Explore.css';


//test data for now, should add to our database
//need to add image urls later, auto set to "No Image Available"
const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    bio: 'Frontend enthusiast who loves React.',
    year: 'Freshman',
    type: 'Frontend',
    inGroup: 'Yes'
  },
  {
    id: 2,
    name: 'Brian Kim',
    bio: 'Backend wizard working with Node.js.',
    year: 'Sophomore',
    type: 'Backend',
    inGroup: 'No'
  },
  {
    id: 3,
    name: 'Carla Gomez',
    bio: 'Fullstack dev passionate about UX and APIs.',
    year: 'Junior',
    type: 'Fullstack',
    inGroup: 'No'
  },
  {
    id: 4,
    name: 'Daniel Smith',
    bio: 'Loves working on backend services and DevOps.',
    year: 'Senior',
    type: 'Backend',
    inGroup: 'Yes'
  },
  {
    id: 5,
    name: 'Emily Davis',
    bio: 'Building responsive UI with Vue and React.',
    year: 'Sophomore',
    type: 'Frontend',
    inGroup: 'No'
  },
  {
    id: 6,
    name: 'Frankie Lee',
    bio: 'Enjoys building full apps solo – front to back!',
    year: 'Junior',
    type: 'Fullstack',
    inGroup: 'No'
  },
  {
    id: 7,
    name: 'Grace Lin',
    bio: 'Exploring frontend performance optimization.',
    year: 'Freshman',
    type: 'Frontend',
    inGroup: 'No'
  },
  {
    id: 8,
    name: 'Henry Patel',
    bio: 'Specializes in serverless backend systems.',
    year: 'Senior',
    type: 'Backend',
    inGroup: 'No'
  },
  {
    id: 9,
    name: 'Isla Nguyen',
    bio: 'Fullstack hacker & hackathon regular.',
    year: 'Sophomore',
    type: 'Fullstack',
    inGroup: 'No'
  },
  {
    id: 10,
    name: 'Jake Rivera',
    bio: 'Frontend dev who loves animations and CSS art.',
    year: 'Junior',
    type: 'Frontend',
    inGroup: 'Yes'
  },
  {
    id: 11,
    name: 'Kara Wang',
    bio: 'Backend-focused but learning frontend.',
    year: 'Senior',
    type: 'Backend',
    inGroup: 'Yes'
  },
  {
    id: 12,
    name: 'Leo Martin',
    bio: 'Fullstack developer building portfolio projects.',
    year: 'Freshman',
    type: 'Fullstack',
    inGroup: 'No'
  },
];

const Explore = () => {
  //need to add more filters
  //need to align filtering with backend data points!
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [page, setPage] = useState(0);
  const usersPerPage = 9;

  const filteredUsers = mockUsers.filter((user) => {
    return (
      (!yearFilter || user.year === yearFilter) &&
      (!typeFilter || user.type === typeFilter) &&
      (!groupFilter || user.inGroup === groupFilter)
    );
  });

  const paginatedUsers = filteredUsers.slice(
    page * usersPerPage,
    (page + 1) * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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

        <select value={groupFilter} onChange={(e) => { setPage(0); setGroupFilter(e.target.value); }}>
          <option value="">All Status</option>
          <option value="Yes">In Group</option>
          <option value="No">Not In Group</option>
        </select>
      </div>


      <div className="card-grid">
        {paginatedUsers.map((user) => (
          <div className="card" key={user.id}>
            <img
            src={user.imageUrl || blankProfile}
            alt={user.name}
            className="user-image"
            />
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
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

export default Explore;
