// Ifrah
// Description: User Homepage
import hackmateLogo from "../assets/hackmateLogo.png"
import hackmateLanding from "../assets/hackmate landing.png"
import CardCarousel from '../components/CardCarousel';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import banner from "../assets/friends.png"


const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    const [user, setUser] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.getAttribute('data-theme') === 'dark');

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    //Naomi - Mounting hackathon data being fetched from backend
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

        const fetchHackathons = async () => {
            try {
                const response = await axios.get("/api/hackathons/get"); 
                console.log("Fetched hackathons:", response.data);
                setHackathons(response.data); 
            } catch (error) {
                console.error("Error fetching hackathons:", error);
            }
        };
        
        
        fetchUserProfile();
        fetchHackathons();
    }, []);

    return (
        <div>
            <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0px' , paddingBottom: '0px'}}>Welcome {user.firstName || "Guest"}!</h3>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px', marginBottom: '20px', paddingLeft: '70px', paddingTop: '0px'}}>
                    <img src={hackmateLanding} alt="Hackmate Landing" style={{ maxWidth: '55%', height: 'auto', borderRadius: '30px'}} />
                </div>
            </div>
            <div>
                <h4>Upcoming Hackathons:</h4>
                <div style={{ paddingBottom: '30px' }}>
                    <CardCarousel data={hackathons} isDarkMode={isDarkMode} />
                </div>
                <h4 style={{ padding:15}}>Ready to Find your Perfect Hackathon Group?</h4>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="split-row">
                    <Link to="/explore">
                        <button className="link-button">Find Fellow Hackers</button>
                    </Link>
                    <Link to="/exploreGroup">
                    <button className="link-button">Find Groups to Join</button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home;