// import Navbar from "./components/Navbar"
// import { Outlet } from "react-router-dom"

// const Layout = () => {
//   return (
//     <div>
//       <Navbar />
//       <main style={{ paddingTop: "70px" }}>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ paddingTop: "70px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
