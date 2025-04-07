// Ifrah
// Description: Page allowing users to register with a Hackmate account
const Register = () => {
    return (
        <div>
            <h3>Register with HackMate</h3>
        <form>
            {/* form to input new user credentials and info */}
        <div className="split-row">
        <div>
          <input type="text" name="firstName" placeholder = "First Name"/>
        </div>
        <div>
          <input type="text" name="lastName" placeholder = "Last Name"/>
        </div>
        </div>
        <div>
          <input type="text" name="username" placeholder = "Username"/>
        </div>
        <div>
          <input type="email" name="email" placeholder = "Email"/>
        </div>
        <div>
          <input type="password" name="password" placeholder = "Password"/>
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