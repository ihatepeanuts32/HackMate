import React, { useState } from 'react';
import '../styles/ContactUs.css';
import earlImg from '../assets/earl.png';
import dhakshinImg from '../assets/dhakshin.png';
import rajitImg from '../assets/rajit.png';
import hriImg from '../assets/hri.png';
import irfImg from '../assets/irf.png';
import naoImg from '../assets/nao.png';
import saiImg from '../assets/sai.png';
import vaiImg from  '../assets/vai.png';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const teamMembers = [
        {
            name: "Earl",
            role: "Sophomore in Software Engineering at UT Dallas",
            imageUrl: earlImg
        },
        {
            name: "Dhakshin",
            role: "Sophomore in Computer Science at UT Dallas",
            imageUrl: dhakshinImg
        },
        {
            name: "Rajit",
            role: "Junior in Computer Science at UT Dallas",
            imageUrl: rajitImg
        },
        {
            name: "Ifrah",
            role: "Sophomore in Computer Science at UT Dallas",
            imageUrl: irfImg
        },
        {
            name: "Naomi",
            role: "Sophomore in Computer Science at UT Dallas",
            imageUrl: naoImg
        },
        {
            name: "Saivishaal",
            role: "Sophomore in Computer Science at UT Dallas",
            imageUrl: saiImg
        },
        {
            name: "Hrishikesh",
            role: "Sophomore in Computer Science at UT Dallas",
            imageUrl: hriImg
        },
        {
            name: "Vaishali",
            role: "Sophomore in Software Engineering at UT Dallas",
            imageUrl: vaiImg
        }
        // Add more team members as needed
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ email, message });
    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            
            <div className="contact-container">
                <div className="contact-form-section">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="contact-input"
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            className="contact-input message-input"
                            rows="5"
                        />
                        <button type="submit" className="contact-button">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member-card">
                                <div className="contact-member-avatar">
                                    <img 
                                        src={member.imageUrl} 
                                        alt={member.name} 
                                        className="member-image"
                                    />
                                </div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs; 