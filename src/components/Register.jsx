import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

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
      setErr(error);
    }
  }
  function goLogin() {
    navigation("/");
  }

  return (
    <div className="Register">
      <div className="register-form-container">
        <img src="./images/icon.png" />
        <h2>Create an account</h2>

        <p>
          Already have an account{" "}
          <span className="login-link" onClick={goLogin}>
            login
          </span>
        </p>
        {err !== "" && <p className="err-msg">{err}</p>}
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
          <br />
          <button className="submit-btn" onClick={register}>
            Register
          </button>
        </div>
      </div>
      <div className="showcase">
        <h2>An easy way to manage employees.</h2>
        <img src="./images/6861232.jpg" />
      </div>
    </div>
  );
}

export default Register;
