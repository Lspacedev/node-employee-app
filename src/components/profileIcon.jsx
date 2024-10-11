import { useNavigate } from "react-router-dom";

function ProfileIcon() {
  const navigation = useNavigate();

  function navigateAdmin() {
    navigation("/admin");
  }
  return (
    <div className="ProfileIcon">
      <p onClick={navigateAdmin}>Admin</p>
    </div>
  );
}

export default ProfileIcon;
