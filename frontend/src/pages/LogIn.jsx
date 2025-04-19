import hackmateLogo from "../assets/hackmateLogo.png"
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    //Naomi - collecting user info to send to database and verify user info
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {

            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            });

            setToken(res.data.token);
            setMessage('Sign up successful.')

            localStorage.setItem('token', res.data.token);
            window.location.href = "/home";

        } catch (error) {
            setMessage('Login failed');
            console.error(error)
        }
    }
    return (
        <div className="login-page">
            <div>
                <div>
                    <img src={hackmateLogo} className="logo" alt="hackmate logo" />
                </div>
                <h2 className="hackmate-text">HackMate</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="email" 
                        value={email} 
                        placeholder = "Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            placeholder = "Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="forgot-password">
                        <Link to="/reset-password">Forgot Password?</Link>
                    </div>
                    <div className="split-row">
                        <button type="submit" className="submit-button">Log In</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default Login;