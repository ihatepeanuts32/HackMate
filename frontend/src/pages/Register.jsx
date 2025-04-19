import { useState } from "react";
import axios from "axios"

// Ifrah
// Description: Page allowing users to register with a Hackmate account
const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  //Naomi - collecting user info to send to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {

      const res = await axios.post('http://localhost:3000/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password
      });

      setToken(res.data.token);
      setMessage('Sign up successful.')

      localStorage.setItem('token', res.data.token);
      window.location.href = "/home";

    } catch (error) {
      setMessage('Failed to log in user.');
      console.error(error)
    }
  }



    return (
        <div>
            <h3>Register with HackMate</h3>
        <form onSubmit={handleSubmit}>
            {/* form to input new user credentials and info */}
        <div className="split-row">
        </div>
        <div>
          <input 
            type="text" 
            value={username} 
            placeholder = "Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            />
        </div>
        <div>
          <input 
            type="email" 
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
        {/* <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword"/>
        </div> */}
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      </div>
    )
}

export default Register;