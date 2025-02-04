import { useNavigate } from "react-router-dom";
function Nav() {
  const navigation = useNavigate();
  function goRegister() {
    navigation("/register");
  }
  function goLogin() {
    navigation("/login");
  }
  return (
    <div className="Nav">
      <div className="nav-logo">
        <img src="./images/icon.png" />
        <div>
          Employee<i>Manager</i>
        </div>
      </div>
      <div className="register-login">
        <button className="login-btn" onClick={goLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Nav;
