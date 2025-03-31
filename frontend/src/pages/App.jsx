import { useState } from 'react'
//import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import hackmateLogo from "../assets/hackmateLogo.png";
import '../styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <div>
          <img src={hackmateLogo} className="logo" alt="hackmate logo" />
      </div>
      <h1>HackMate</h1>
      <div className="card">
      </div>
      {/* <p className="subtitle">
        Find Your Perfect Hackathon Team
      </p> */}
    </>
  )
}

export default App
