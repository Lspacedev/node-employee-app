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
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
