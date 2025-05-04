import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../styles/AccountDetails.css';

//Dhakshin P
const AccountSettings = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEmail(res.data.email);
                setUsername(res.data.username);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    if (loading) return <div>Loading account info...</div>;

    return (
        <div>
            <h2>Your Account</h2>
            <div className="row-wrapper" style={{ color: 'white', borderRadius:25, minWidth: 1000}}>
                <div className="vertical-line" />

                <div className="split-row">
                    <div className="left-side">
                        <h3>Email Address</h3>
                    </div>
                    <div className="right-side">
                        <h3>{email}</h3>
                    </div>
                </div>

                <div className="split-row">
                    <div className="left-side">
                        <h3>Username</h3>
                    </div>
                    <div className="right-side">
                        <h3>{username}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;

//Hrishikesh Srirangam + Dhakshin Parimalakumar
/*
const AccountSettings = () => {
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
                        <h3>currentUserId</h3>
                    </div>
                </div>

                <div className="split-row">
                    <div className="left-side">
                        <h3>Username</h3>
                    </div>
                    <div className="right-side">
                        <h3>Guest</h3>
                    </div>
                </div>

                {/* <div className="split-row">
                    <div className="left-side">
                        <h3>Account Created</h3>
                    </div>
                    <div className="right-side">
                        <h3>3/31/2025</h3>
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default AccountSettings
*/
