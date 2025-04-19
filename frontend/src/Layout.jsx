import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: "70px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;