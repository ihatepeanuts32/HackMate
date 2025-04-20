import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ManageGroup.css';
import JoinRequestsModal from '../components/JoinRequestsModal';
import GroupMessagesModal from '../components/GroupMessagesModal';
import UpdateGroupModal from '../components/UpdateGroupModal';

const ManageGroup = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [group, setGroup] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showJoinRequests, setShowJoinRequests] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showUpdateInfo, setShowUpdateInfo] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get('/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const currentUserId = userRes.data._id;
                setUserId(currentUserId);

                const groupRes = await axios.get(`/api/groups/${id}/group_details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const groupData = groupRes.data;
                
                if (groupData.owner._id !== currentUserId) {
                    console.log('Not the owner, redirecting...', {
                        ownerId: groupData.owner._id,
                        currentUserId: currentUserId
                    });
                    navigate('/groups');
                    return;
                }

                setGroup(groupData);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                navigate('/groups');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleUpdateInfo = async (updatedData) => {
        try {
            await axios.put(`/api/groups/${id}/update`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const res = await axios.get(`/api/groups/${id}/group_details`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGroup(res.data);
            setShowUpdateInfo(false);
        } catch (err) {
            console.error('Failed to update group:', err);
        }
    };

    const handleDeleteGroup = async () => {
        if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
            try {
                await axios.delete(`/api/groups/${id}/delete_group`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                navigate('/groups');
            } catch (err) {
                console.error('Failed to delete group:', err);
            }
        }
    };

    const handleRemoveUser = async (username) => {
        try {
            const userRes = await axios.get(`/api/users/by-username/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const memberId = userRes.data._id;

            await axios.delete(`/api/groups/${id}/remove_member`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { memberId }
            });
            const res = await axios.get(`/api/groups/${id}/group_details`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGroup(res.data);
        } catch (err) {
            console.error('Failed to remove user:', err);
            alert('Failed to remove user. Please make sure the username is correct.');
        }
    };

    const handleTransferOwnership = async (username) => {
        try {
            const userRes = await axios.get(`/api/users/by-username/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const targetId = userRes.data._id;

            await axios.put(`/api/groups/${id}/transfer_ownership`, {
                targetId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/groups');
        } catch (err) {
            console.error('Failed to transfer ownership:', err);
            alert('Failed to transfer ownership. Please make sure the username is correct and the user is a member of the group.');
        }
    };

    const handleClearMessages = async () => {
        if (window.confirm('Are you sure you want to clear all messages? This action cannot be undone.')) {
            try {
                await axios.delete(`/api/groups/${id}/clear_messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const res = await axios.get(`/api/groups/${id}/group_details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setGroup(res.data);
            } catch (err) {
                console.error('Failed to clear messages:', err);
            }
        }
    };

    if (loading) return <div className="manage-group-page">Loading...</div>;
    if (!group) return null;

    return (
        <div className="manage-group-page">
            <h1>Manage {group.name}</h1>
            
            <div className="management-options">
                <div className="option-section">
                    <h2>Group Settings</h2>
                    <button onClick={() => setShowUpdateInfo(true)} className="manage-button">
                        Update Info
                    </button>
                    <button onClick={handleDeleteGroup} className="manage-button delete">
                        Delete Group
                    </button>
                </div>

                <div className="option-section">
                    <h2>Member Management</h2>
                    <button onClick={() => setShowJoinRequests(true)} className="manage-button">
                        Manage Join Requests
                    </button>
                    <button onClick={() => {
                        const username = prompt('Enter the username of the member you want to remove:');
                        if (username) handleRemoveUser(username);
                    }} className="manage-button">
                        Remove User
                    </button>
                    <button onClick={() => {
                        const username = prompt('Enter the username of the member you want to transfer ownership to:');
                        if (username) handleTransferOwnership(username);
                    }} className="manage-button">
                        Transfer Ownership
                    </button>
                </div>

                <div className="option-section">
                    <h2>Communication</h2>
                    <button onClick={() => setShowMessages(true)} className="manage-button">
                        View Messages
                    </button>
                    <button onClick={handleClearMessages} className="manage-button warning">
                        Clear All Messages
                    </button>
                </div>
            </div>

            <UpdateGroupModal
                isOpen={showUpdateInfo}
                onClose={() => setShowUpdateInfo(false)}
                group={group}
                onUpdate={handleUpdateInfo}
            />

            <JoinRequestsModal 
                isOpen={showJoinRequests}
                onClose={() => setShowJoinRequests(false)}
                groupId={id}
            />

            <GroupMessagesModal 
                isOpen={showMessages}
                onClose={() => setShowMessages(false)}
                groupId={id}
            />
        </div>
    );
};

export default ManageGroup; 