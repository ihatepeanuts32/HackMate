import React from 'react';
import '../styles/JoinRequestModal.css';

const JoinRequestModal = ({ isOpen, onClose, onConfirm, groupName, showConfirmation }) => {
    if (!isOpen) return null;

    if (showConfirmation) {
        return (
            <div className="modal-overlay">
                <div className="modal-content confirmation-sent">
                    <h2>Request Sent!</h2>
                    <p>Your request to join {groupName} has been sent.</p>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Join Request</h2>
                <p>Are you sure you want to send a request to join {groupName}?</p>
                <div className="button-group">
                    <button className="confirm-button" onClick={onConfirm}>
                        Yes, Send Request
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        No, Cancel
                    </button>
                </div>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default JoinRequestModal; 