import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    checkSession();
  }, []);
  async function checkSession() {
    try {
      const response = await fetch("http://localhost:8000/checkSession", {
        method: "GET",
        credentials: "include",
        headers: {
          "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
      });

      if (response.redirected === true) {
        navigation("/");
        localStorage.clear();
        return;
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  }
  async function addAdmin(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/admins", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.redirected === true) {
        navigation("/");
        localStorage.clear();
        return;
      }
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
  return (
    <div className="Admin">
      <div className="back-arrow" onClick={() => navigation("/home")}>
        back
      </div>
      <div className="admin-form">
        <h4>Add Admin</h4>
        Email:{" "}
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={addAdmin}>Add</button>
      </div>
      <div className="admins">
        <h3>Admins</h3>
        <p>admin@doe.com</p>
      </div>
    </div>
  );
}

export default Admin;
