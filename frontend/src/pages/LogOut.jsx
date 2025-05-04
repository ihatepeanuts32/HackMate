import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");

        navigate("/register");
    }, [navigate]);

    return (
        <div className="logout-page">
            <h2>Logging Out...</h2>
        </div>
    );
};

export default LogOut;