import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/GroupView.css';
import hackmateLogo from '../assets/hackmateLogo2.png';
import exampleBanner from '../assets/examplebanner.jpg';
import banner from '../assets/banner.jpeg';
import personAddAlt1 from '../assets/person_add_alt_1.png';
import messageIcon from '../assets/message.png';
import planeIcon from '../assets/planeIcon.png';
import profileIcon from '../assets/Profile icon.png';
import ContactGroup from '../components/ContactGroup';
import JoinRequestModal from '../components/JoinRequestModal';

const GroupView = () => {
    const navigate = useNavigate();

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroup = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`/api/groups/${id}/group_details`, null, {headers: { Authorization: `Bearer ${token}` }});
                setGroup(res.data);
            } catch (err) {
                console.error('Failed to fetch group:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();
    }, [id]);
    
    const handleMessageUser = (user) => {
        const chatUser = {
            id: user._id,
            name: user.username
        };
        navigate('/chatInbox', { state: { selectedUser: chatUser } });
    };

    const handleJoinRequest = async () => {
        try {
            const token = localStorage.getItem('token'); 
            console.log('Token:', token);
            const res = await axios.post(`/api/groups/${id}/request_join`, null, {headers: { Authorization: `Bearer ${token}`}});
            console.log('Join request made successfully', res.data);
            setShowJoinConfirmation(true);

        } catch (err) {
            console.error('Error joining the group:', err);
        }
    };

    if (loading) return <div className="groups-page"><p>Loading group page...</p></div>;

    return (
        <div className="group-view">
            {/* Hero Section with Banner */}
            <div className="hero-section">
                <div className="banner-overlay"></div>
                <img src={banner} alt="group banner" className="banner-image" />
                
                <div className="group-header">
                    <div className="group-info">
                        <img src={hackmateLogo} alt="group logo" className="group-logo" />
                        <h1>{group.name}</h1>
                    </div>
                    <div className="group-actions">
                        <button 
                            className="btn-request"
                            onClick={() => setIsJoinModalOpen(true)}
                        >
                            <img src={personAddAlt1} alt="join" />
                            Request to Join
                        </button>
                        <button 
                            className="btn-contact"
                            onClick={() => setIsContactModalOpen(true)}
                        >
                            <img src={planeIcon} alt="message" />
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
                        {group.description}
                    </p>
                    
                    <div className="skills-container">
                    {group.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    </div>
                </div>

                <div className="members-section">
                    <h2>Members</h2>
                    <div className="members-list">
                    {group.owner && (
                        <div className="member-card">
                            <div className="member-left">
                            <img src={profileIcon} alt="profile" className="member-avatar" />
                            <div className="member-info">
                                <h3>{group.owner.username}</h3>
                                <span className="member-role">Leader</span>
                            </div>
                            </div>
                            <button className="message-btn" onClick={() => handleMessageUser(group.owner)}>
                                <img src={messageIcon} alt="message" />
                            </button>
                        </div>
                    )}
                    {group.members.filter(m => m._id !== group.owner._id).map((member, index) => (
                    <div key={index} className="member-card">
                        <div className="member-left">
                        <img src={profileIcon} alt="profile" className="member-avatar" />
                        <div className="member-info">
                            <h3>{member.username}</h3>
                            <span className="member-role">Member</span>
                        </div>
                        </div>
                        <button className="message-btn" onClick={() => handleMessageUser(member)}>
                            <img src={messageIcon} alt="message" />
                        </button>
                    </div>
                    ))}                   
                    </div>
                </div>
            </div>

            <ContactGroup 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                groupName={group.name}
                groupId={id}
            />

            <JoinRequestModal 
                isOpen={isJoinModalOpen}
                onClose={() => {
                    setIsJoinModalOpen(false);
                    setShowJoinConfirmation(false);
                }}
                onConfirm={handleJoinRequest}
                groupName={group.name}
                showConfirmation={showJoinConfirmation}
            />
        </div>
    );
};

export default GroupView; 