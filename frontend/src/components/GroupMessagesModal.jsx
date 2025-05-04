import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const GroupMessagesModal = ({ isOpen, onClose, groupId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/groups/${groupId}/messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(res.data);
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchMessages();
        }
    }, [isOpen, groupId]);

    const handleDeleteMessage = async () => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await axios.delete(`/api/groups/${groupId}/clear_messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (err) {
                console.error('Failed to delete message:', err);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-small" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2>Group Messages</h2>
                </div>
                
                <div className="modal-body">
                    {loading ? (
                        <p>Loading messages...</p>
                    ) : messages.length === 0 ? (
                        <p>No messages yet</p>
                    ) : (
                        <div className="messages-list">
                            {messages.map((message,index) => (
                                <div key={index} className="message-item">
                                    <div className="message-header">
                                        <div className="message-info">
                                            <p className="sender-name">{message.senderName}</p>
                                        </div>
                                    </div>
                                    <div className="message-content">
                                        <p className="description">{message}</p>
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

export default GroupMessagesModal; 