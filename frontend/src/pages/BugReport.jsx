import React, { useState } from 'react';
import '../styles/BugReport.css';
import axios from 'axios';

const BugReport = ({ closePopup }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        description: ''
    });
    const [submitStatus, setSubmitStatus] = useState({ message: '', isError: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ message: '', isError: false });

        try {
            const response = await axios.post('http://localhost:3000/api/reports/bug', formData);
            
            if (response.status === 201) {
                setSubmitStatus({ 
                    message: 'Bug report submitted successfully!', 
                    isError: false 
                });
                // Clear form
                setFormData({
                    fullName: '',
                    email: '',
                    subject: '',
                    description: ''
                });

                // Optionally close popup after successful submission
                if (closePopup) {
                    setTimeout(() => closePopup(), 1500);
                }
            }
        } catch (error) {
            setSubmitStatus({ 
                message: error.response?.data?.message || 'Error submitting bug report', 
                isError: true 
            });
        }
    };

    return (
        <div className="bug-report-modal">
            <div className="bug-report-container">
                <button className="close-button" onClick={closePopup}>×</button>

                <form className="bug-report-form" onSubmit={handleSubmit}>
                    {submitStatus.message && (
                        <div className={`status-message ${submitStatus.isError ? 'error' : 'success'}`}>
                            {submitStatus.message}
                        </div>
                    )}
                    <h5 style = {{padding:0}}>Have an Issue?</h5>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                className="form-input"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <input 
                            type="text" 
                            className="form-input"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            className="form-input description-input"
                            name="description"
                            rows="6"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BugReport;
