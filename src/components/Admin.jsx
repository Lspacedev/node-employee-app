import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const [csrf, setCsrf] = useState("");

  const navigation = useNavigate();
  useEffect(() => {
    fetchAdmins();
  }, []);
  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      setCsrf(data.csrfToken);
    } catch (err) {
      console.log(err);
    }
  }
  async function fetchAdmins() {
    try {
      const response = await fetch("http://localhost:8000/admins", {
        method: "GET",
        credentials: "include",
        headers: {
          "CSRF-Token": csrf,
        },
      });

      if (response.redirected === true) {
        navigation("/");
        localStorage.clear();
        return;
      }
      if (response.ok) {
        let data = await response.json();
        setAdmins(data);
        //setLoading(false);
      } else {
        // Handle error
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
          "CSRF-Token": csrf,
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
      <div className="admin-header">
        <div className="back-arrow" onClick={() => navigation("/home")}>
          <IoArrowBack />
        </div>
        <div className="logo">
          <img src="./images/icon.png" />
          <div>
            Employee<i>Manager</i>
          </div>
        </div>
      </div>
      <div className="admin-content">
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
          <h3>Admins:</h3>
          <ul>
            {admins && admins.map((admin, i) => <li key={i}>{admin.email}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;
