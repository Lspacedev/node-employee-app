import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin";
import Register from "./components/Register";
import Landing from "./components/Landing";
import { useEffect, useState } from "react";

function App() {
  const [csrf, setCsrf] = useState("");
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
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
