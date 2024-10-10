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
      console.log(response);
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
      <h3>Admins</h3>
      <h4>Add Admin</h4>
      <div className="admin-form">
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
        <button onClick={addAdmin}>add</button>
      </div>
    </div>
  );
}

export default Admin;
