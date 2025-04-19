import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add password reset logic here
        // For now, just console log the values
        console.log({ username, newPassword, confirmPassword });
    };

    return (
        <div className="reset-password-container">
            <h1>Reset Password</h1>
            
            <form onSubmit={handleSubmit} className="reset-password-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="reset-input"
                />
                
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="reset-input"
                />
                
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="reset-input"
                />
                
                <button type="submit" className="reset-button">
                    Reset Password
                </button>
                
                <Link to="/login" className="back-to-login">
                    Back to Login
                </Link>
            </form>
        </div>
    );
};

export default ResetPassword; 