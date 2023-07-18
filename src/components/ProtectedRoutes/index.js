import { Navigate, Outlet } from "react-router-dom";

export function ProtectedAdmin({ children }) {
  const userFound = localStorage.getItem("usuario");

  if (!userFound || userFound != "admin") {
    return <Navigate to="/authentication/sign-in" />;
  }

  return children ? children : <Outlet />;
}
