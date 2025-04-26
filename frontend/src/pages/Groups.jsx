import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/Groups.css';

const Groups = () => {
    const token = localStorage.getItem('token'); 
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const userRes = await axios.get('/api/users/me', {
                    headers: { Authorization: `Bearer ${token}`}
                });
                
                if (!isMounted) return;
                const currentUserId = userRes.data._id;
                setUserId(currentUserId);
                console.log('Set user ID to:', currentUserId);

                const groupsRes = await axios.get('/api/groups/my_groups', {
                    headers: { Authorization: `Bearer ${token}`}
                });
                
                const groupPromises = groupsRes.data.map(group => 
                    axios.get(`/api/groups/${group._id}/group_details`, {
                        headers: { Authorization: `Bearer ${token}`}
                    })
                );
                
                const detailedGroups = await Promise.all(groupPromises);
                const groupsData = detailedGroups.map(res => res.data);
                
                if (!isMounted) return;
                console.log('Setting groups with current user ID:', currentUserId);
                console.log('Groups data:', groupsData);
                setGroups(groupsData);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                if (!isMounted) return;
                setGroups([]);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleLeaveGroup = async (groupId) => {
        try {
            const memberId = userId;
            const token = localStorage.getItem('token');
            await axios.delete(`/api/groups/${groupId}/remove_member`, {
                headers: { Authorization: `Bearer ${token}`},
                data: {memberId}
            });
            setGroups(groups.filter(g => g._id !== groupId));
        } catch (err) {
            console.error('Failed to leave group:', err);
        }
    };

    if (loading) return <div className="groups-page"><p>Loading groups...</p></div>;

    return (
        <div className="groups-page">
            <h5>Your Groups</h5>
            <div className="groups-container">
                {groups.length === 0 ? (
                    <p>You're not in any groups yet.</p>
                ) : (
                    <div className="groups-list">
                        {groups.map(group => {
                            const isOwner = group.owner?._id === userId;
                            console.log(`Group "${group.name}":`, {
                                ownerId: group.owner?._id,
                                userId: userId,
                                isOwner: isOwner
                            });

                            return (
                                <div key={group._id} className="group-row">
                                    <div className="group-name">{group.name}</div>
                                    <div className="group-actions">
                                        <Link 
                                            to={`/group/${group._id}`} 
                                            className="view-button"
                                        >
                                            View
                                        </Link>
                                        {isOwner && (
                                            <Link 
                                                to={`/manage_group/${group._id}`}
                                                className="manage-button"
                                            >
                                                Manage
                                            </Link>
                                        )}
                                        <button 
                                            className="leave-button"
                                            onClick={() => handleLeaveGroup(group._id)}
                                        >
                                            Leave
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Groups; 