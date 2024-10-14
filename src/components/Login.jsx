import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Cookies from "js-cookie";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    await fetch("http://localhost:8000/", {
      method: "GET",
      credentials: "include",
    });
  }
  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        return user.getIdToken().then((idToken) => {
          return fetch("http://localhost:8000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ idToken }),
          });
        });
      })
      .then(async (res) => {
        const data = await res.json();

        if (data.status === "success") {
          localStorage.setItem("auth", true);
        }
        // A page redirect would suffice as the persistence is set to NONE.
        return auth.signOut();
      })
      .then(() => {
        alert("Log in successfully");
        navigation("/home");
        //window.location.assign("/profile");
      });
  }

  return (
    <div className="Login">
      <div className="login-form-container">
        <h2>Employee Manager | Admin</h2>
        <p>Log in to your admin account.</p>
        <div className="form">
          <div className="email">
            <label htmlFor="email">Email: </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password: </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button className="submit-btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
      {/* <div className="showcase">
        <h2>An easy way to manage employees.</h2>
        <img src="./images/6861232.jpg" />
      </div> */}
    </div>
  );
}

export default AdminLogin;
