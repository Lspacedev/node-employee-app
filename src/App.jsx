import "./App.css";
import DisplayEmployees from "./components/displayEmployees";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [session, setSession] = useState();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
