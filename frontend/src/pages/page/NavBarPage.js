import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const NavBarPage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavBarPage;
