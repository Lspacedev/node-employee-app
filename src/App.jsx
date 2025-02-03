import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedReg from "./components/ProtectedReg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<ProtectedReg />}>
            <Route exact path="/" element={<Landing />} />

            <Route exact path="/login" element={<Login />} />
          </Route>

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
