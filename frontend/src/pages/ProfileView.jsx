import React from 'react';
import '../styles/GroupView.css';
import hackmateLogo from '../assets/hackmateLogo2.png';
import exampleBanner from '../assets/examplebanner.jpg';
import personAddAlt1 from '../assets/person_add_alt_1.png';
import messageIcon from '../assets/message.png';
import planeIcon from '../assets/planeIcon.png';
import profileIcon from '../assets/Profile icon.png';
import blankProfile from '../assets/profile.png';

const ProfileView = () => {
    return (
        <div className="group-view">
            {/* Hero Section with Banner */}
            <div className="hero-section">
                <div className="banner-overlay"></div>
                <img src={exampleBanner} alt="group banner" className="banner-image" />
                
                <div className="group-header">
                    <div className="group-info">
                        <img src={blankProfile} alt="group logo" className="group-logo" />
                        <h1>Dhakshin Parimalakumar</h1>
                    </div >
                    <div>
                        {/* <button className="btn-request">
                            <img src={personAddAlt1} alt="join" />
                            Request to Join
                        </button> */}
                        <button className="btn-chat">
                            <img src={planeIcon} alt="message" />
                            Chat
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-section">
                <div className="description-section">
                    <h2>Bio</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce molestie ultricies urna, nec vehicula purus porttitor id.
                    </p>
                    
                    <div className="skills-container">
                        <span className="skill-tag">Python</span>
                        <span className="skill-tag">UI/UX</span>
                        <span className="skill-tag">C++</span>
                        <span className="skill-tag">React.js</span>
                        <span className="skill-tag">Powershell</span>
                    </div>
                </div>
                {/* Secondary Content */}
                <div className="members-section">
                <div className="description-section">
                {/* <h2>Profile Info</h2> */}
                <ul className="profile-info">
                <li>Year: Sophomore</li>
                <li>College: University of Texas at Dallas</li>
                <li>Role: Fullstack</li>
                <li>Hackathons Attended: 3</li>
                <li>Desired Teammate Qualities:  Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
                </div>

                {/* <div className="members-section">
                    <h2>Members</h2>
                    <div className="members-list">
                        <div className="member-card">
                            <div className="member-left">
                                <img src={profileIcon} alt="profile" className="member-avatar" />
                                <div className="member-info">
                                    <h3>Rajit Goel</h3>
                                    <span className="member-role">Leader</span>
                                </div>
                            </div>
                            <button className="message-btn">
                                <img src={messageIcon} alt="message" />
                            </button>
                        </div>

                        <div className="member-card">
                            <div className="member-left">
                                <img src={profileIcon} alt="profile" className="member-avatar" />
                                <div className="member-info">
                                    <h3>Earl Velasquez</h3>
                                    <span className="member-role">Member</span>
                                </div>
                            </div>
                            <button className="message-btn">
                                <img src={messageIcon} alt="message" />
                            </button>
                        </div>

                        <div className="member-card">
                            <div className="member-left">
                                <img src={profileIcon} alt="profile" className="member-avatar" />
                                <div className="member-info">
                                    <h3>Ifrah Zainab</h3>
                                    <span className="member-role">Member</span>
                                </div>
                            </div>
                            <button className="message-btn">
                                <img src={messageIcon} alt="message" />
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProfileView; 