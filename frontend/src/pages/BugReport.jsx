import React from 'react';
import '../styles/BugReport.css';

//Created by Hrishikesh Srirangam
const BugReport = () => {
    return (
        <div className="bug-report-container">
            <form className="bug-report-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            className="form-input"
                            name="fullName"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-input"
                            name="email"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Subject</label>
                    <input 
                        type="text" 
                        className="form-input"
                        name="subject"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        className="form-input description-input"
                        name="description"
                        rows="6"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default BugReport;