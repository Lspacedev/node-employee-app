import { IoPersonOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import SidebarLinks from "./sidebarLinks";

function Sidebar() {
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
    </div>
  );
}

export default Sidebar;
