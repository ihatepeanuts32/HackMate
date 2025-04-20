import React, { useState, useRef, useEffect } from 'react';
import '../styles/ContactGroup.css';
import axios from 'axios';

const ContactGroup = ({ isOpen, onClose, groupName, groupId }) => {
    const [message, setMessage] = useState('');
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const res = await axios.post(`/api/groups/${groupId}/message`, {message}, {headers: { Authorization: `Bearer ${token}`}});
        
        console.log('Message sent:', message);
        setMessage('');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Contact {groupName}</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="message-input"
                        rows="5"
                    />
                    <button type="submit" className="send-button">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactGroup; 