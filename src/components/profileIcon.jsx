import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";

function ProfileIcon() {
  const navigation = useNavigate();

  function navigateAdmin() {
    navigation("/admin");
  }
  return (
    <div className="ProfileIcon">
      <p onClick={navigateAdmin}>
        <RiAdminFill className="icon" /> | <i>Admin</i>
      </p>
    </div>
  );
}

export default ProfileIcon;
