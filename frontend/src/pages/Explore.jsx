import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Explore.css';
import blankProfile from "../assets/profile.png";
import axios from 'axios';

//mock user data to show example of how explore page would work
/*const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    bio: 'Frontend enthusiast who loves React.',
    year: 'Freshman',
    type: 'Frontend',
    inGroup: 'Yes',
    numHackathons: 2,
    college: 'UTD',
    skills: ['React', 'CSS', 'JavaScript'],
    desiredQualities: ['Team Player', 'Creative'],
  },
  {
    id: 2,
    name: 'Brian Kim',
    bio: 'Backend wizard working with Node.js.',
    year: 'Sophomore',
    type: 'Backend',
    inGroup: 'No',
    numHackathons: 5,
    college: 'UT Austin',
    skills: ['Node.js', 'Express', 'MongoDB'],
    desiredQualities: ['Communicative', 'Reliable'],
  },
  {
    id: 3,
    name: 'Carla Gomez',
    bio: 'Fullstack dev passionate about UX and APIs.',
    year: 'Junior',
    type: 'Fullstack',
    inGroup: 'No',
    numHackathons: 3,
    college: 'UTD',
    skills: ['React', 'Figma', 'Postman'],
    desiredQualities: ['Design-focused', 'Adaptable'],
  },
  {
    id: 4,
    name: 'Daniel Smith',
    bio: 'Loves working on backend services and DevOps.',
    year: 'Senior',
    type: 'Backend',
    inGroup: 'Yes',
    numHackathons: 4,
    college: 'Texas A&M',
    skills: ['Docker', 'AWS', 'Python'],
    desiredQualities: ['Detail-Oriented', 'Focused'],
  },
  {
    id: 5,
    name: 'Emily Davis',
    bio: 'Building responsive UI with Vue and React.',
    year: 'Sophomore',
    type: 'Frontend',
    inGroup: 'No',
    numHackathons: 2,
    college: 'UTD',
    skills: ['Vue.js', 'React', 'HTML/CSS'],
    desiredQualities: ['Creative', 'Fast Learner'],
  },
  {
    id: 6,
    name: 'Frankie Lee',
    bio: 'Enjoys building full apps solo – front to back!',
    year: 'Junior',
    type: 'Fullstack',
    inGroup: 'No',
    numHackathons: 6,
    college: 'UTD',
    skills: ['React Native', 'Node.js', 'Firebase'],
    desiredQualities: ['Independent', 'Efficient'],
  },
  {
    id: 7,
    name: 'Grace Lin',
    bio: 'Exploring frontend performance optimization.',
    year: 'Freshman',
    type: 'Frontend',
    inGroup: 'No',
    numHackathons: 1,
    college: 'UTD',
    skills: ['JavaScript', 'Chrome DevTools'],
    desiredQualities: ['Curious', 'Problem Solver'],
  },
  {
    id: 8,
    name: 'Henry Patel',
    bio: 'Specializes in serverless backend systems.',
    year: 'Senior',
    type: 'Backend',
    inGroup: 'No',
    numHackathons: 4,
    college: 'Texas State',
    skills: ['AWS Lambda', 'Node.js', 'MongoDB'],
    desiredQualities: ['Organized', 'Strategic'],
  },
  {
    id: 9,
    name: 'Isla Nguyen',
    bio: 'Fullstack hacker & hackathon regular.',
    year: 'Sophomore',
    type: 'Fullstack',
    inGroup: 'No',
    numHackathons: 7,
    college: 'UT Austin',
    skills: ['React', 'Firebase', 'Node.js'],
    desiredQualities: ['Energetic', 'Collaborative'],
  },
  {
    id: 10,
    name: 'Jake Rivera',
    bio: 'Frontend dev who loves animations and CSS art.',
    year: 'Junior',
    type: 'Frontend',
    inGroup: 'Yes',
    numHackathons: 3,
    college: 'UTD',
    skills: ['CSS', 'GSAP', 'HTML'],
    desiredQualities: ['Creative', 'Detail-Oriented'],
  },
  {
    id: 11,
    name: 'Kara Wang',
    bio: 'Backend-focused but learning frontend.',
    year: 'Senior',
    type: 'Backend',
    inGroup: 'Yes',
    numHackathons: 5,
    college: 'UTD',
    skills: ['Node.js', 'SQL', 'React'],
    desiredQualities: ['Versatile', 'Quick Learner'],
  },
  {
    id: 12,
    name: 'Leo Martin',
    bio: 'Fullstack developer building portfolio projects.',
    year: 'Freshman',
    type: 'Fullstack',
    inGroup: 'No',
    numHackathons: 2,
    college: 'UTD',
    skills: ['React', 'MongoDB', 'Node.js'],
    desiredQualities: ['Initiative', 'Collaborative'],
  },
];*/

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [page, setPage] = useState(0);
  const usersPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); 
        
        const response = await axios.get('/api/auth/allUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
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

        <select value={groupFilter} onChange={(e) => { setPage(0); setGroupFilter(e.target.value); }}>
          <option value="">All Status</option>
          <option value="Yes">In Group</option>
          <option value="No">Not In Group</option>
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
                  src={user.imageUrl || blankProfile}
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