import React from 'react';
import '../styles/JoinRequestModal.css';

const JoinRequestModal = ({ isOpen, onClose, onConfirm, groupName, showConfirmation, isOwner }) => {
    if (!isOpen) return null;

    if (isOwner) {
        return (
            <div className="modal-overlay">
                <div className="modal-content-short">
                    <h2>Unable to Request</h2>
                    <p>You are the owner of {groupName}. You cannot send a request to join your own group.</p>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
            </div>
        );
    }

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
            <div className="modal-content-short">
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