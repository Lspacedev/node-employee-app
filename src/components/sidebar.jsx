import { IoPersonOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";

import SidebarLinks from "./sidebarLinks";

function Sidebar() {
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
          <CiLogout className="icon" />
          <p className="text">Logout</p>
        </SidebarLinks>
      </div>
    </div>
  );
}

export default Sidebar;
