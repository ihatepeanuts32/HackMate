import React from 'react';
import '../styles/GroupView.css';
import hackmateLogo from "../assets/hackmateLogo.png"

//Created by Hrishikesh Srirangam
const GroupView = () => {
    return (
        <div className="group-view">
            {/* Hero Section with Background Image */}
            <div className="hero-section">
                <div className="group-header">
                    <div className="group-avatar">
                        {/* Group icon/avatar */}
                    </div>
                    <h1>Group 1</h1>
                    <div className="group-actions">
                        <button className="btn-request">
                            <span className="icon-user-plus"></span>
                            Request to Join
                        </button>
                        <button className="btn-contact">
                            <span className="icon-message"></span>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-section">
                <div className="description-section">
                    <h2>Description</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie 
                        ultricies urna, nec vehicula purus porttitor id. Nullam porta ligula 
                        eget mi finibus, finibus mollis libero tincidunt.
                    </p>
                    
                    {/* Skills/Tags */}
                    <div className="skills-container">
                        <span className="skill-tag engineering">Engineering</span>
                        <span className="skill-tag ui-ux">UI/UX</span>
                        <span className="skill-tag casual">Casual</span>
                        <span className="skill-tag tech">React.js</span>
                        <span className="skill-tag tech">Next.js</span>
                    </div>
                </div>

                <div className="members-section">
                    <h2>Members</h2>
                    <div className="members-list">
                        <div className="member-card">
                            <div className="member-avatar"></div>
                            <div className="member-info">
                                <h3>Rajit Goel</h3>
                                <span className="member-role">Leader</span>
                            </div>
                            <button className="btn-message"></button>
                        </div>

                        <div className="member-card">
                            <div className="member-avatar"></div>
                            <div className="member-info">
                                <h3>Earl Velasquez</h3>
                                <span className="member-role">Member</span>
                            </div>
                            <button className="btn-message"></button>
                        </div>

                        <div className="member-card">
                            <div className="member-avatar"></div>
                            <div className="member-info">
                                <h3>Ifrah Zainab</h3>
                                <span className="member-role">Member</span>
                            </div>
                            <button className="btn-message"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupView;