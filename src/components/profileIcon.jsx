import { useNavigate, Link } from "react-router-dom";

function ProfileIcon() {
  const navigation = useNavigate();

  function navigateAdmin() {
    navigation("/admin");
  }
  return (
    <div className="ProfileIcon">
      {/* <img src="/images/profile.png" alt="profile" /> */}
      <p onClick={navigateAdmin}>Admin</p>
    </div>
  );
}

export default ProfileIcon;
