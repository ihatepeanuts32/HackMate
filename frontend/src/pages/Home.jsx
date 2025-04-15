// Ifrah
// Description: User Homepage
import hackmateLogo from "../assets/hackmateLogo.png"
import CardCarousel from '../components/CardCarousel';
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [hackathons, setHackathons] = useState([]);

    //Naomi - Mounting hackathon data being fetched from backend
    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/eventBriteHackathons");
                console.log("Response data:", response.data);
                setHackathons(response.data[0]?.hackathons || []);
              } catch (error) {
                console.error("Error fetching hackathons:", error);
              }
        }
    
        fetchHackathons();
    }, []);

    return (
        <div>
            <div>
                <h3>Welcome Vaishali!</h3>
            </div>
            <div>
                <h3>Upcoming Hackathons Near You</h3>
                <div>
                    <CardCarousel data={hackathons} />
                </div>
                <h3>Ready to Find your Perfect Hackathon Group?</h3>
                <div className="split-row">
                    <button type="submit" className="submit-button">Find Fellow Hackers</button>
                    <button type="submit" className="submit-button">Find Groups to Join</button>
                </div>
            </div>
        </div>
    )
}

export default Home;