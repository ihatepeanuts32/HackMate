import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const JoinRequestsModal = ({ isOpen, onClose, groupId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`/api/groups/${groupId}/requests`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRequests(res.data);
            } catch (err) {
                console.error('Failed to fetch join requests:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchRequests();
        }
    }, [isOpen, groupId]);

    const handleRequest = async (requestId, action) => {
        try {
            await axios.post(`/api/groups/${groupId}/requests/${requestId}/${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Remove the request from the list
            setRequests(requests.filter(req => req._id !== requestId));
        } catch (err) {
            console.error(`Failed to ${action} request:`, err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Join Requests</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body">
                    {loading ? (
                        <p>Loading requests...</p>
                    ) : requests.length === 0 ? (
                        <p>No pending join requests</p>
                    ) : (
                        <div className="requests-list">
                            {requests.map(request => (
                                <div key={request._id} className="request-item">
                                    <div className="request-info">
                                        <p className="user-name">{request.user.name}</p>
                                        <p className="request-date">
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="request-actions">
                                        <button
                                            className="accept-button"
                                            onClick={() => handleRequest(request._id, 'accept')}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="reject-button"
                                            onClick={() => handleRequest(request._id, 'reject')}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JoinRequestsModal; 