import React, { useState, useEffect } from "react";
import profileImage from "../assets/profile.png";
import axios from "axios";
import '../styles/Modal.css';


const EditProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState(profileImage);
    const [photoFile, setPhotoFile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        preferredRole: "",
        hackathonsAttended: "",
        college: "",
        year: "",
        // technicalSkills: "",
        technicalSkills: [],
        desiredTeammateQualities: []
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [skillInput, setSkillInput] = useState('');
    const [qualityInput, setQualityInput] = useState('');



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhotoFile(file);
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("You must be logged in to save profile");
                setLoading(false);
                return;
            }

            const submitData = new FormData();
            
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });
            
            if (photoFile) {
                submitData.append("profilePhoto", photoFile);
            }

            const response = await axios.post(
                '/api/auth/onboardUser',
                submitData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setMessage("Profile saved successfully!");
            window.location.href = "/home";
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage(error.response?.data?.message || "Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuality = (e) => {
        e.preventDefault();
        if (qualityInput.trim() && !formData.desiredTeammateQualities.includes(qualityInput.trim())) {
            setFormData(prev => ({
                ...prev,
                desiredTeammateQualities: [...prev.desiredTeammateQualities, qualityInput.trim()]
            }));
            setQualityInput('');
        }
    };

    const handleRemoveQuality = (qualityToRemove) => {
        setFormData(prev => ({
            ...prev,
            desiredTeammateQualities: prev.desiredTeammateQualities.filter(quality => quality !== qualityToRemove)
        }));
    };
    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skillInput.trim() && !formData.technicalSkills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                technicalSkills: [...prev.technicalSkills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            technicalSkills: prev.technicalSkills.filter(skill => skill !== skillToRemove)
        }));
    };

    return (
        <div>
            <h3>Edit Profile</h3>
            {message && <div className={message.includes("success") ? "success-message" : "error-message"}>{message}</div>}
            
            {/* <div className="profile-photo-container">            
                <img src={profilePhoto} id="profile-photo" alt="Profile" />
            </div>
            
            <label htmlFor="input-file" className="file-upload-label">Update Profile Photo</label>
            <input 
                type="file" 
                accept="image/jpg, image/jpeg, image/png" 
                id="input-file" 
                className="photo-selector" 
                onChange={handleFileChange} 
            /> */}
            
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="split-row">
                        <div>
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder="First Name" 
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="lastName" 
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="split-row">
                       
                         <div>
                            <input 
                                type="text" 
                                name="college" 
                                placeholder="College"
                                value={formData.college}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    </div>
                    <div className="split-row">
                         <div>
                          <select
                            name="preferredRole"
                            value={formData.preferredRole}
                            onChange={handleInputChange}
                            className="select-dropdown"

                          >
                            <option value="">Select Role</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Fullstack">Fullstack</option>
                          </select>
                        </div>
                        <div>
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="select-dropdown"
                          >
                            <option value="">Select Year</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                          </select>
                        </div>
                        <div>
                            <select
                                name="hackathonsAttended"
                                value={formData.hackathonsAttended}
                                onChange={handleInputChange}
                                className="select-dropdown"

                            >
                                <option value="">Hackathons Attended</option>
                                {[...Array(16).keys()].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                                ))}
                            </select>
                            </div>
                    </div>
                   
                        {/* <div>
                            <input 
                                type="text" 
                                name="year" 
                                placeholder="Year"
                                value={formData.year}
                                onChange={handleInputChange}
                            />
                        </div> */}
                       
                    <div>
                    <div className="form-group">
                            <label htmlFor="skills">Technical Skills:</label>
                            <div className="skills-input-container">
                                <input style={{ minWidth: 200 }}
                                    type="text"
                                    id="technicalSkills"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    placeholder="Enter a skill"
                                />
                                <button 
                                    type="button" 
                                    onClick={handleAddSkill}
                                    className="add-skill-button"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="skills-list">
                                {formData.technicalSkills.map((skill, index) => (
                                    <div key={index} className="skill-tag">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="remove-skill"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Desired Teammate Qualities:</label>
                            <div className="skills-input-container">
                                <input style={{ minWidth: 200 }}
                                    type="text"
                                    id="desiredTeammateQualities"
                                    value={qualityInput}
                                    onChange={(e) => setQualityInput(e.target.value)}
                                    placeholder="Enter a desired teammate quality"
                                />
                                <button 
                                    type="button" 
                                    onClick={handleAddQuality}
                                    className="add-skill-button"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="skills-list">
                                {formData.desiredTeammateQualities.map((quality, index) => (
                                    <div key={index} className="skill-tag">
                                        {quality}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveQuality(quality)}
                                            className="remove-skill"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;