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
            await axios.put(`/api/groups/${groupId}/request_manage`, {
                action,
                requestId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error(`Failed to ${action} request:`, err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-small" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2>Join Requests</h2>
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
                                        <p className="user-name">{request.user.username || 'Unknown User'}</p>
                                        <p className="request-status">Status: {request.status}</p>
                                        <p className="request-message">Message: {request.message || 'No message'}</p>
                                    </div>
                                    {request.status === 'pending' && (
                                        <div className="request-actions">
                                            <button className="accept-button" onClick={() => handleRequest(request._id, 'approve')}>
                                                Accept
                                            </button>
                                            <button className="reject-button" onClick={() => handleRequest(request._id, 'reject')}>
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                        <div className="request-actions">
                                            <button className="delete-button" onClick={() => handleRequest(request._id, 'delete')}>
                                                Delete
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