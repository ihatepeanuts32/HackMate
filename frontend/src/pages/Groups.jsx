import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Groups.css';

const Groups = () => {
    const userGroups = [
        { id: 1, name: "Group 1" },
        { id: 2, name: "Group 2" },
        { id: 3, name: "Group 3" },
        { id: 4, name: "Group 4" },
        { id: 5, name: "Group 5" }
    ];

    return (
        <div className="groups-page">
            <h1>Your Groups</h1>
            <div className="groups-container">
                <div className="groups-list">
                    {userGroups.map(group => (
                        <div key={group.id} className="group-row">
                            <div className="group-name">{group.name}</div>
                            <div className="group-actions">
                                <Link 
                                    to={`/groupViewExample/${group.id}`} 
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
            </div>
        </div>
    );
};

export default Groups; 