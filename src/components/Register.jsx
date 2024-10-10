import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    await fetch("http://localhost:8000/csrf", {
      method: "GET",
      credentials: "include",
    });
  }
  async function register() {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  }
  function goLogin() {
    navigation("/");
  }

  return (
    <div className="Register">
      <div className="register-form-container">
        <h2>Employee Manager | Admin</h2>
        <p>Register your admin account.</p>
        <p>
          Already have an account{" "}
          <span className="login-link" onClick={goLogin}>
            login
          </span>
        </p>
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

          <button className="submit-btn" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
