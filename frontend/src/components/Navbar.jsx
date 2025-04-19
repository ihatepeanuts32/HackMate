// import '../styles/Navbar.css'; 

// const Navbar = () => {
//     return (
//         <div>Navbar</div>
//     )
// }

// export default Navbar;

// Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import hackmateLogo from "../assets/hackmateLogo.png";
import hamburgerIcon from "../assets/hamburger.png";
import clearIcon from "../assets/clear.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if click is outside menu and not on the hamburger button
      if (menuRef.current && 
          !menuRef.current.contains(event.target) && 
          !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <img src={hackmateLogo} className="logo" alt="hackmate logo" />
            <h1><strong>Hack</strong><span className="mate">Mate</span></h1>
          </div>
        </div>
      </nav>

      <button 
        ref={buttonRef}
        className="hamburger-btn" 
        onClick={toggleMenu}
      >
        <img 
          src={isMenuOpen ? clearIcon : hamburgerIcon} 
          alt={isMenuOpen ? "close menu" : "open menu"}
          className="menu-icon"
        />
      </button>

      <div 
        ref={menuRef}
        className={`slide-menu ${isMenuOpen ? 'open' : ''}`}
      >
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
          <Link to="/groups" className="menu-item">
            <span className="icon">👥</span>
            groups
          </Link>
          <Link to="/contact" className="menu-item">
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
