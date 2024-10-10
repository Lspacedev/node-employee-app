import { IoPersonOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import SidebarLinks from "./sidebarLinks";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

function Sidebar() {
  const navigation = useNavigate();
  function logout() {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        navigation("/");
      });
  }
  return (
    <div className="Sidebar">
      <div className="logo">Employee App</div>
      <SidebarLinks>
        <RiDashboardLine />
        <p>Dashboard</p>
      </SidebarLinks>
      <SidebarLinks>
        <IoPersonOutline />
        <p>Employees</p>
      </SidebarLinks>
      <SidebarLinks>
        <p onClick={logout}>Logout</p>
      </SidebarLinks>
    </div>
  );
}

export default Sidebar;
