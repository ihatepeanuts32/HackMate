import hackmateLogo from "../assets/hackmateLogo.png"

const Login = () => {
    return (
        <div>
        <div>
            <div>
                <img src={hackmateLogo} className="logo" alt="hackmate logo" />
            </div>
            <h2>HackMate</h2>
        </div>
        <div>
            <form>
                <div>
                    <input type="text" name="username" placeholder = "Username"/>
                </div>
                <div>
                    <input type="password" name="password" placeholder = "Password"/>
                </div>
            </form> 
            <div className="split-row">
                <button type="submit" className="submit-button">Sign Up</button>
                <button type="submit" className="submit-button">Log In</button>
            </div>
        </div>
      </div>
    )
}

export default Login;