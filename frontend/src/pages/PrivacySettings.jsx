//import React, { useState } from "react";
//import '../styles/PrivacySettings.css';

import React, { useState, useEffect } from "react";
import '../styles/PrivacySettings.css';

//Hrishikesh Srirangam + Dhakshin P
const PrivacySettings = () => {
    const [profilePublic, setProfilePublic] = useState(() => {
        // Retrieve from localStorage or default to true
        const savedProfilePublic = localStorage.getItem('profilePublic');
        return savedProfilePublic !== null ? JSON.parse(savedProfilePublic) : true;
    });

    const [recieveMessages, setRecieveMessages] = useState(() => {
        const savedReceiveMessages = localStorage.getItem('recieveMessages');
        return savedReceiveMessages !== null ? JSON.parse(savedReceiveMessages) : true;
    });

    const [picVisible, setPicVisible] = useState(() => {
        const savedPicVisible = localStorage.getItem('picVisible');
        return savedPicVisible !== null ? JSON.parse(savedPicVisible) : true;
    });

    useEffect(() => {
        // Save state to localStorage whenever a setting changes
        localStorage.setItem('profilePublic', JSON.stringify(profilePublic));
        localStorage.setItem('recieveMessages', JSON.stringify(recieveMessages));
        localStorage.setItem('picVisible', JSON.stringify(picVisible));
    }, [profilePublic, recieveMessages, picVisible]);

    return (
        <div style={{borderRadius:25, background:"#9157ee"}}>
            <h1 style={{ color: "white" }}>Privacy</h1>
            <div className="split-row">
                <h3 style={{color:"white"}}>Profile is Public</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={profilePublic}
                        onChange={() => setProfilePublic(!profilePublic)}
                    />
                    <span className="slider" />
                </label>
            </div>
            <div className="split-row">
                <h3 style={{color:"white"}}>Receive Messages</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={recieveMessages}
                        onChange={() => setRecieveMessages(!recieveMessages)}
                    />
                    <span className="slider" />
                </label>
            </div>
            <div className="split-row">
                <h3 style={{color:"white"}}>Profile Picture Visible</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={picVisible}
                        onChange={() => setPicVisible(!picVisible)}
                    />
                    <span className="slider" />
                </label>
            </div>
        </div>
    );
}

export default PrivacySettings;

/*
//Hrishikesh Srirangam
const PrivacySettings = () => {
    const [profilePublic, setProfilePublic] = useState(true);
    const [recieveMessages, setRecieveMessages] = useState(true);
    const [picVisible, setPicVisible] = useState(true);

    return (
        <div style={{borderRadius:25, background:"#9157ee"}}>
            <h1 style={{ color: "white" }}>Privacy</h1>
            <div className="split-row">
                <h3 style={{color:"white"}}>Profile is Public</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={profilePublic}
                        onChange={() => setProfilePublic(!profilePublic)}
                    />
                    <span className="slider" />
                </label>
            </div>
            <div className="split-row">
                <h3 style={{color:"white"}}>Recieve Messages</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={recieveMessages}
                        onChange={() => setRecieveMessages(!recieveMessages)}
                    />
                    <span className="slider" />
                </label>
            </div>
            <div className="split-row">
                <h3 style={{color:"white"}}>Profile Picture Visible</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={picVisible}
                        onChange={() => setPicVisible(!picVisible)}
                    />
                    <span className="slider" />
                </label>
            </div>
        </div>
    )
}

export default PrivacySettings;
*/