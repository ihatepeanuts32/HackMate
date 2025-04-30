import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../styles/AccountDetails.css';

//Hrishikesh Srirangam
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
                        <h3>Guest</h3>
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
                </div> */}
            </div>
        </div>
    )
}

export default AccountSettings