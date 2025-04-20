import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/Groups.css';

const Groups = () => {
    const token = localStorage.getItem('token'); 
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
        try {
            const res = await axios.get('/api/groups/my_groups', {headers: { Authorization: `Bearer ${token}`}});
            setGroups(Array.isArray(res.data)? res.data :[]);
        } catch (err) {
            console.error('Failed to fetch groups:', err);
            setGroups([]);
        } finally {
            setLoading(false);
        }
        };
        fetchGroups();
    }, []);

    if (loading) return <div className="groups-page"><p>Loading groups...</p></div>;

    return (
        <div className="groups-page">
            <h1>Your Groups</h1>
            <div className="groups-container">
                {groups.length === 0 ? (
                    <p>You’re not in any groups yet.</p>
                ) : (
                    <div className="groups-list">
                        {groups.map(group => (
                            <div key={group._id} className="group-row">
                                <div className="group-name">{group.name}</div>
                                <div className="group-actions">
                                    <Link 
                                        to={`/group/${group._id}`} 
                                        className="view-button"
                                    >
                                        View
                                    </Link>
                                    <button className="leave-button">
                                        Leave
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Groups; 