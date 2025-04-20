import React, { useState } from "react";
import '../styles/PrivacySettings.css';

//Hrishikesh Srirangam
const PrivacySettings = () => {
    const [profilePublic, setProfilePublic] = useState(true);
    const [recieveMessages, setRecieveMessages] = useState(true);
    const [picVisible, setPicVisible] = useState(true);

    return (
        <div style={{borderRadius:25, background:"#1C0049"}}>
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