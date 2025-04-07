// import '../styles/Navbar.css'; 

// const Navbar = () => {
//     return (
//         <div>Navbar</div>
//     )
// }

// export default Navbar;

// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/editProfile">Edit Profile</Link></li>
        <li><Link to="/bugReport">Report Bugs</Link></li>
        <li><Link to="/groupViewExample">Group View Example</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
