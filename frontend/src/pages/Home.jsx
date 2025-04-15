// Ifrah
// Description: User Homepage
import hackmateLogo from "../assets/hackmateLogo.png"
import CardCarousel from '../components/CardCarousel';

const Home = () => {
    return (
        <div>
            <div>
                <h3>Welcome Vaishali!</h3>
            </div>
            <div>
                <h3>Upcoming Hackathons Near You</h3>
                <div>
                    <CardCarousel />
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