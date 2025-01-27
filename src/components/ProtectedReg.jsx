import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedReg() {
  const auth = localStorage.getItem("auth");
  return auth !== null && auth !== "" ? <Navigate to="/home" /> : <Outlet />;
}
