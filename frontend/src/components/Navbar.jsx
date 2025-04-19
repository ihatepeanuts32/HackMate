// import '../styles/Navbar.css'; 

// const Navbar = () => {
//     return (
//         <div>Navbar</div>
//     )
// }

// export default Navbar;

// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import hackmateLogo from "../assets/hackmateLogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <img src={hackmateLogo} className="logo" alt="hackmate logo" />
            <h1>
              <strong>Hack</strong><span className="mate">Mate</span>
            </h1>
          </div>
        </div>
      </nav>

      <div className={`slide-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <button className="hamburger-btn" onClick={toggleMenu}>
            <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <div className="menu-content">
          <Link to="/home" className="menu-item">
            <span className="icon">🏠</span>
            home
          </Link>
          <Link to="/editProfile" className="menu-item">
            <span className="icon">👤</span>
            profile
          </Link>
          <Link to="/settings" className="menu-item">
            <span className="icon">⚙️</span>
            settings
          </Link>
          <Link to="/messages" className="menu-item">
            <span className="icon">💬</span>
            messages
          </Link>
          <Link to="/groupViewExample" className="menu-item">
            <span className="icon">👥</span>
            groups
          </Link>
          <Link to="/support" className="menu-item">
            <span className="icon">📞</span>
            support
          </Link>
          <Link to="/login" className="menu-item">
            <span className="icon">↵</span>
            login
          </Link>
          <Link to="/register" className="menu-item">
            <span className="icon">📝</span>
            register
          </Link>
          <Link to="/bugReport" className="menu-item">
            <span className="icon">🪲</span>
            report a bug
          </Link>
          <Link to="/explore" className="menu-item">
            <span className="icon">🔍</span>
            explore
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
