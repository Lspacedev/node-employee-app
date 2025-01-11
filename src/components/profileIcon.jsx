import { useNavigate } from "react-router-dom";

import { RiAdminLine } from "react-icons/ri";

function ProfileIcon() {
  const navigation = useNavigate();

  function navigateAdmin() {
    navigation("/admin");
  }
  return (
    <div className="ProfileIcon">
      <p onClick={navigateAdmin}>
        <RiAdminLine className="icon" /> | <i>Admin</i>
      </p>
    </div>
  );
}

export default ProfileIcon;
