// import '../styles/Navbar.css'; 

// const Navbar = () => {
//     return (
//         <div>Navbar</div>
//     )
// }

// export default Navbar;

// Navbar.jsx code below
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Navbar.css'; 

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <ul>
//         <li><Link to="/dashboard">Dashboard</Link></li>
//         <li><Link to="/login">Login</Link></li>
//         <li><Link to="/register">Register</Link></li>
//         <li><Link to="/editProfile">Edit Profile</Link></li>
//         <li><Link to="/bugReport">Report Bugs</Link></li>
//         <li><Link to="/groupViewExample">Group View Example</Link></li>
//         <li><Link to="/home">Home</Link></li>
//       </ul>
//     </nav>
//   )
// }

// export default Navbar;

// const Navbar = () => {
//     return (
//       <nav className="off-screen-menu">
//         <ul>
//           <li><Link to="/dashboard">Dashboard</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/register">Register</Link></li>
//           <li><Link to="/editProfile">Edit Profile</Link></li>
//           <li><Link to="/bugReport">Report Bugs</Link></li>
//           <li><Link to="/groupViewExample">Group View Example</Link></li>
//           <li><Link to="/home">Home</Link></li>
//         </ul>
//       </nav>

    // <nav>
    // <div class="ham-menu">
    // <span></span>
    // <span></span>
    // <span></span>
    // </div>
    // </nav>
    // )
    // <script src="../nav.js"></script>
//   }

// export default Navbar;

//Menu code below
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  useEffect(() => {
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");

    const toggleMenu = () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
    };

    hamMenu.addEventListener("click", toggleMenu);

    // Cleanup
    return () => {
      hamMenu.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <div>
      <nav className="off-screen-menu">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/editProfile">Edit Profile</Link></li>
          <li><Link to="/bugReport">Report Bugs</Link></li>
          <li><Link to="/groupViewExample">Group View Example</Link></li>
          <li><Link to="/home">Home</Link></li>
        </ul>
      </nav>

      <nav>
        <div className="ham-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
