import { IoPersonOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";

import SidebarLinks from "./sidebarLinks";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";

function Sidebar() {
  const navigation = useNavigate();
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      setCsrf(data.csrfToken);
    } catch (err) {
      console.log(err);
    }
  }
  function logout() {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": csrf,
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
      <div className="logo">
        {" "}
        <img src="./images/icon.png" />
        <div>
          Employee<i>Manager</i>
        </div>
      </div>
      <SidebarLinks>
        <RiDashboardLine />
        <p>Dashboard</p>
      </SidebarLinks>
      <SidebarLinks>
        <IoPersonOutline />
        <p>Employees</p>
      </SidebarLinks>
      <SidebarLinks className="logout">
        <CiLogout />
        <p onClick={logout}>Logout</p>
      </SidebarLinks>
    </div>
  );
}

export default Sidebar;
