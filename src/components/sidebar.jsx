import { IoPersonOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";

import SidebarLinks from "./sidebarLinks";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const navigation = useNavigate();
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    try {
      const response = await fetch(`${process.env.PROD_URL}/`, {
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
    fetch(`${process.env.PROD_URL}/logout`, {
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
        <img src="./images/icon.png" />
        <div>
          Employee<i>Manager</i>
        </div>
      </div>
      <div className="links">
        <SidebarLinks>
          <RiDashboardLine className="icon" />
          <p className="text">Dashboard</p>
        </SidebarLinks>
        <SidebarLinks>
          <IoPersonOutline className="icon" />
          <p className="text">Employees</p>
        </SidebarLinks>
        <SidebarLinks className="logout icon">
          <CiLogout className="icon" onClick={logout} />
          <p className="text" onClick={logout}>
            Logout
          </p>
        </SidebarLinks>
      </div>
    </div>
  );
}

export default Sidebar;
