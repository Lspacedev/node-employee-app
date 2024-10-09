import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const auth = localStorage.getItem("auth");
  return auth != null ? <Outlet /> : <Navigate to="/" />;
}
