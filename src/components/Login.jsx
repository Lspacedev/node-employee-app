import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        return user.getIdToken().then((idToken) => {
          return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ idToken }),
          });
        });
      })
      .then(() => {
        // A page redirect would suffice as the persistence is set to NONE.
        return firebase.auth().signOut();
      })
      .then(() => {
        alert("Log in successfully");
        // navigation("/home");
        //window.location.assign("/profile");
      });
  }

  return (
    <div className="Login">
      <div className="login-img">
        {/* <img src="images/login-register.jpg" alt="login" /> */}
      </div>
      <div className="login-form-container">
        <h2>Employee Manager | Admin</h2>
        <p>Log in to your admin account.</p>
        <div className="form">
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button className="submit-btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
