import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';
import settingsIcon from '../assets/settings_icon.png';
import toggleOn from '../assets/toggle_on.png';
import toggleOff from '../assets/toggle_off.png';
import chevronRight from '../assets/chevron_right.png';


const Settings = () => {
    // Initialize dark mode from localStorage or default to true
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : true;
    });

    const [notifications, setNotifications] = useState(true);

    // Apply the theme on component mount
    useEffect(() => {
        const theme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        const theme = newMode ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <img src={settingsIcon} alt="Settings" className="settings-icon" />
                <h1>Settings</h1>
            </div>

            <div className="settings-section">
                <Link to="/account" className="settings-link">
                    <div className="settings-item">
                        <h2>Your Account</h2>
                        <img src={chevronRight} alt=">" className="chevron-icon" />
                    </div>
                </Link>

                {/* <Link to="/privacy" className="settings-link">
                    <div className="settings-item">
                        <h2>Privacy Settings</h2>
                        <img src={chevronRight} alt=">" className="chevron-icon" />
                    </div>
                </Link> */}

                {/* <div className="settings-item">
                    <h2>Enable Notifications</h2>
                    <img
                        src={notifications ? toggleOn : toggleOff}
                        alt="toggle"
                        className="toggle-icon"
                        onClick={() => setNotifications(!notifications)}
                    />
                </div> */}

                <div className="settings-item">
                    <h2>Dark Mode</h2>
                    <img
                        src={darkMode ? toggleOn : toggleOff}
                        alt="toggle"
                        className="toggle-icon"
                        onClick={toggleDarkMode}
                    />
                </div>

                <Link to="/reset-password" className="settings-link">
                    <div className="settings-item">
                        <h2>Reset Password</h2>
                        <img src={chevronRight} alt=">" className="chevron-icon" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Settings;

/*
const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    return (
        <div className="settings-container">
            <div className="settings-header">
                <img src={settingsIcon} alt="Settings" className="settings-icon" />
                <h1>Settings</h1>
            </div>

            <div className="settings-section">
                <Link to="/account" className="settings-link">
                    <div className="settings-item">
                        <h2>Your Account</h2>
                        <img src={chevronRight} alt=">" className="chevron-icon" />
                    </div>
                </Link>

                <Link to="/privacy" className="settings-link">
                    <div className="settings-item">
                        <h2>Privacy Settings</h2>
                        <img src={chevronRight} alt=">" className="chevron-icon" />
                    </div>
                </Link>

                <div className="settings-item">
                    <h2>Enable Notifications</h2>
                    <img
                        src={notifications ? toggleOn : toggleOff}
                        alt="toggle"
                        className="toggle-icon"
                        onClick={() => setNotifications(!notifications)}
                    />
                </div>

                <div className="settings-item">
                    <h2>Dark Mode</h2>
                    <img
                        src={darkMode ? toggleOn : toggleOff}
                        alt="toggle"
                        className="toggle-icon"
                        onClick={() => {
                            const newMode = !darkMode;
                            setDarkMode(newMode);

                            const theme = newMode ? 'dark' : 'light';
                            document.documentElement.setAttribute('data-theme', theme);
                            localStorage.setItem('theme', theme);
                        }}
                    />
                </div>

                <Link to="/reset-password" className="settings-link">
                    <div className="settings-item">
                        <h2>Reset Password</h2>
                        <img src={chevronRight} alt=">" className="chevron-icon" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Settings; 
*/