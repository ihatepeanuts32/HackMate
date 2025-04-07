import React from 'react';
import '../styles/BugReport.css';

//Created by Hrishikesh Srirangam
const BugReport = () => {

    return (
        <div>
            <header classname="header">
                <h1 style={{fontSize: 60 }}>Report Bugs</h1>
            </header>

            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: '1rem', backgroundColor: '#2D0075' }}>
                    <header classname="prompts">
                        <h2 style={{ textAlign: 'left', fontSize: 40 }}>First Name</h2> {/* Allow users to enter their first name */}
                    </header>
                    <input type="text" className="inputs" name="firstName" placeholder="" />
                </div>

                <div style={{ flex: 1, padding: '1rem', backgroundColor: '#2D0075' }}>
                    <header classname="prompts">
                        <h2 style={{ textAlign: 'left', fontSize: 40 }}>Last Name</h2> {/* Allow users to enter their last name */}
                    </header>
                    <input type="text" className="inputs" name="lastName" placeholder="" />
                </div>
            </div>

            <div>
                <header classname="prompts">
                    <h2 style={{ textAlign: 'left', fontSize: 40 }}>Subject</h2> {/* Allow users to enter the subject of their report */}
                </header>
                <input type="text" className="inputs" name="firstName" placeholder="" />
            </div>

            <header classname="prompts">
                <h2 style={{ textAlign: 'left', fontSize: 40 }}>Description</h2> {/* Allow users to enter their report */}
            </header>
            <textarea wrap="soft" className="multilineInputs" placeholder="Type your bug report here..."
            />

            <button className="submitButton">Submit Report</button> {/* Sends the report to developers */}
        </div>
    )
}

export default BugReport;