import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../styles/AccountDetails.css';

//Hrishikesh Srirangam
const AccountSettings = () => {
    const [user, setUser] = useState('');

    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token ? "Token exists" : "No token found");
                
                if (token) {
                    console.log("Making request to:", "/api/auth/userProfile");
                    const response = await axios.get("/api/auth/userProfile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
            }
        }
        fetchUserProfile();
    }, []);

    return (
        <div>
            <h2>Your Account</h2>
            <div className="row-wrapper" style={{ color: 'white', borderRadius:25, background:"#9157ee", minWidth: 800}}>
                <div className="vertical-line" />

                <div className="split-row">
                    <div className="left-side">
                        <h3>Email Address</h3>
                    </div>
                    <div className="right-side">
                        <h3>{user.email || "Guest"}</h3>
                    </div>
                </div>

                <div className="split-row">
                    <div className="left-side">
                        <h3>Username</h3>
                    </div>
                    <div className="right-side">
                        <h3>{user.username || "Guest"}</h3>
                    </div>
                </div>

                {/* <div className="split-row">
                    <div className="left-side">
                        <h3>Account Created</h3>
                    </div>
                    <div className="right-side">
                        <h3>3/31/2025</h3>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default AccountSettings