import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/GroupView.css';
import exampleBanner from '../assets/examplebanner.jpg';
import planeIcon from '../assets/planeIcon.png';
import blockIcon from '../assets/blockIcon.png';
import blankProfile from '../assets/profile.png';
import BlockButton from '../components/Block';

const ProfileView = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const userFromState = location.state?.user;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userFromState && userFromState.id.toString() === id) {
                    setUserData(userFromState);
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get(`/api/auth/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user profile');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, userFromState]);

    const formatArrayData = (array) => {
        if (!array) return [];
        
        if (Array.isArray(array)) {
            return array.map(item => 
                typeof item === 'object' ? (item.name || JSON.stringify(item)) : String(item)
            );
        }
        
        if (typeof array === 'string') {
            return array.split(',').map(item => item.trim());
        }
        
        try {
            return [String(array)];
        } catch (e) {
            console.error("Could not format array data:", e);
            return [];
        }
    };

    const handleChatClick = () => {
        const chatUser = {
            id: userData.id || userData.userId,
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.name || 'User',
            year: userData.year || 'Not specified',
            major: userData.preferredRole || userData.type || 'Not specified',
            school: userData.college || 'Not specified'
        };
        
        navigate('/chatInbox', { state: { selectedUser: chatUser } });
    };

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (error || !userData) {
        return <div className="error">{error || 'User not found'}</div>;
    }

    const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 
                     (userData.name || 'User');
    
    const bio = userData.bio || 
                `${userData.preferredRole || 'Developer'} from ${userData.college || 'Unknown Institution'}`;

    const skills = formatArrayData(userData.technicalSkills || userData.skills);
    const qualities = formatArrayData(userData.desiredTeammateQualities || userData.desiredQualities);

    return (
        <div className="group-view">
            {/* left side */}
            <div className="hero-section">
                <div className="banner-overlay"></div>
                <img src={exampleBanner} alt="group banner" className="banner-image" />

                <div className="group-header">
                    <div className="group-info">
                        <img src={userData.profileImage || blankProfile} alt="profile" className="group-logo" />
                        <h1>{fullName}</h1>
                    </div>
                    <div className='split-row'>
                        <button className="btn-chat" onClick={handleChatClick}>
                            <img src={planeIcon} alt="message" />
                            Chat
                        </button>
                        <BlockButton className='btn-chat' user={userData}>
                            <img src={blockIcon} alt="block"/>
                        </BlockButton>
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className="content-section">
                <div className="description-section">
                    <h2>Bio</h2>
                    <p>{bio}</p>

                    <h3>Technical Skills</h3>
                    <div className="skills-container">
                        {skills && skills.length > 0 ? (
                            skills.map((skill, idx) => (
                                <span key={`skill-${idx}`} className="skill-tag">{skill}</span>
                            ))
                        ) : (
                            <span>No skills listed</span>
                        )}
                    </div>
                </div>

                <div className="members-section">
                    <div className="description-section">
                        <h3>Developer Profile</h3>
                        <ul className="profile-info">
                            <li>Role: {userData.preferredRole || userData.type || 'Not specified'}</li>
                            <li>College: {userData.college || 'Not specified'}</li>
                            <li>Hackathons Attended: {userData.hackathonsAttended || userData.numHackathons || '0'}</li>
                            <li>Desired Teammate Qualities:</li>
                        </ul>
                        
                        <div className="skills-container qualities-container">
                            {qualities && qualities.length > 0 ? (
                                qualities.map((quality, idx) => (
                                    <span key={`quality-${idx}`} className="skill-tag quality-tag">{quality}</span>
                                ))
                            ) : (
                                <span>None specified</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;