import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const UpdateGroupModal = ({ isOpen, onClose, group, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: group?.name || '',
        description: group?.description || '',
        skills: group?.skills || [],
        isPublic: group?.isPublic || false,
        groupType: group?.groupType || 'open',
        maxCapacity: group?.maxCapacity || 5,
        hackathon: group?.hackathon || ''  
    });
    const [skillInput, setSkillInput] = useState('');
    const [hackathons, setHackathons] = useState([]);

    useEffect(() => {
        if (group) {
            setFormData({
                name: group.name || '',
                description: group.description || '',
                skills: group.skills || [],
                isPublic: group.isPublic ?? false,
                groupType: group.groupType || 'open',
                isOpen: group.isOpen ?? false,
                hackathon: group.hackathon || ''
            });
        }
    }, [group]);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const response = await axios.get('/api/hackathons/get');
                setHackathons(response.data);
            } catch (error) {
                console.error('Error fetching hackathons:', error);
            }
        };

        fetchHackathons();
    }, []);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const handleClickOutside = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Update Group Information</h2>
                
                <form onSubmit={handleSubmit} className="update-form">
                    <div className="form-group">
                        <label htmlFor="name">Group Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>Public Group</label>
                        <input
                            type="checkbox"
                            name="isPublic"
                            checked={formData.isPublic}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Group Type:</label>
                            <select value={formData.groupType} onChange={(e) => setFormData(prev => ({ ...prev, groupType: e.target.value }))}>
                                <option value="open">Open to Anyone</option>
                                <option value="invite-only">Invite Only</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Hackathon:</label>
                            <select
                                name="hackathon"
                                value={formData.hackathon}
                                onChange={handleChange}
                                required
                            >
                                {hackathons.length > 0 ? (
                                    hackathons.map((hackathon) => (
                                        <option key={hackathon.id} value={hackathon.id}>
                                            {hackathon.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hackathons available</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Skills/Tags:</label>
                        <div className="skills-input-container">
                            <input style={{minWidth:200}}
                                type="text"
                                id="skills"
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
                            {formData.skills.map((skill, index) => (
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
                    <button type="submit" className="submit-button">
                        Update Group
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateGroupModal; 