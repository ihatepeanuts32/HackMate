import React, { useState } from "react";
import '../styles/AccountDetails.css';

//Hrishikesh Srirangam
const AccountSettings = () => {
    return (
        <div>
            <h2 style={{ color: "white" }}>Your Account</h2>
            <div className="row-wrapper" style={{ color: 'white', borderRadius:25, background:"#1C0049", minWidth: 800}}>
                <div className="vertical-line" />

                <div className="split-row">
                    <div className="left-side">
                        <h3>Email Address</h3>
                    </div>
                    <div className="right-side">
                        <h3>user@example.com</h3>
                    </div>
                </div>

                <div className="split-row">
                    <div className="left-side">
                        <h3>Username</h3>
                    </div>
                    <div className="right-side">
                        <h3>User123</h3>
                    </div>
                </div>

                <div className="split-row">
                    <div className="left-side">
                        <h3>Account Created</h3>
                    </div>
                    <div className="right-side">
                        <h3>3/31/2025</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings